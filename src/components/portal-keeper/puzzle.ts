export type Point = [number, number]
export type Mechanism = 'mirrorA' | 'mirrorB' | 'lens'

export type PuzzleState = {
  mirrorA: number
  mirrorB: number
  lensPlaced: boolean
  lensStep: number
  entered: boolean
}

export type PuzzleMove =
  | { type: 'rotate'; target: Mechanism; delta: 1 | -1 }
  | { type: 'place-lens' }
  | { type: 'enter' }

export type LightTrace = {
  segments: { from: Point; to: Point }[]
  hits: Mechanism[]
  receiverLit: boolean
  solved: boolean
}

export const INITIAL_STATE: PuzzleState = Object.freeze({
  mirrorA: 2,
  mirrorB: 0,
  lensPlaced: false,
  lensStep: 0,
  entered: false,
})

// Shared physical coordinates. The drawing and the puzzle use the same x/z plane.
export const POSITIONS: Record<'source' | 'receiver' | Mechanism, Point> = {
  source: [-3.9, 2],
  mirrorA: [-1.7, 2],
  mirrorB: [-1.7, -1.1],
  receiver: [2.1, -1.1],
  lens: [0.4, -1.1],
}

export const WORLD_BOUNDS = { minX: -4.8, maxX: 4.8, minZ: -3.6, maxZ: 3.5 }
export const MIRROR_HALF_LENGTH = 0.65
export const RECEIVER_RADIUS = 0.22
export const LENS_TARGET_STEP = 3
const MAX_REFLECTIONS = 8
const EPSILON = 0.00001
const MIRRORS = ['mirrorA', 'mirrorB'] as const

const cross = (a: Point, b: Point) => a[0] * b[1] - a[1] * b[0]
const dot = (a: Point, b: Point) => a[0] * b[0] + a[1] * b[1]
const along = (origin: Point, direction: Point, distance: number): Point => [
  origin[0] + direction[0] * distance,
  origin[1] + direction[1] * distance,
]

function distanceToBoundary(origin: Point, direction: Point): number {
  const distances = [
    direction[0] > EPSILON ? (WORLD_BOUNDS.maxX - origin[0]) / direction[0] : Infinity,
    direction[0] < -EPSILON ? (WORLD_BOUNDS.minX - origin[0]) / direction[0] : Infinity,
    direction[1] > EPSILON ? (WORLD_BOUNDS.maxZ - origin[1]) / direction[1] : Infinity,
    direction[1] < -EPSILON ? (WORLD_BOUNDS.minZ - origin[1]) / direction[1] : Infinity,
  ]
  return Math.min(...distances.filter((distance) => distance > EPSILON))
}

function distanceToMirror(origin: Point, direction: Point, position: Point, step: number) {
  const angle = (step * Math.PI) / 8
  const tangent: Point = [Math.cos(angle), Math.sin(angle)]
  const start: Point = [
    position[0] - tangent[0] * MIRROR_HALF_LENGTH,
    position[1] - tangent[1] * MIRROR_HALF_LENGTH,
  ]
  const segment: Point = [2 * MIRROR_HALF_LENGTH * tangent[0], 2 * MIRROR_HALF_LENGTH * tangent[1]]
  const denominator = cross(direction, segment)
  if (Math.abs(denominator) < EPSILON) return null
  const offset: Point = [start[0] - origin[0], start[1] - origin[1]]
  const distance = cross(offset, segment) / denominator
  const fraction = cross(offset, direction) / denominator
  if (distance <= EPSILON || fraction < -EPSILON || fraction > 1 + EPSILON) return null
  return { distance, tangent }
}

function distanceToReceiver(origin: Point, direction: Point): number | null {
  const offset: Point = [origin[0] - POSITIONS.receiver[0], origin[1] - POSITIONS.receiver[1]]
  const projection = dot(offset, direction)
  const discriminant = projection ** 2 - (dot(offset, offset) - RECEIVER_RADIUS ** 2)
  if (discriminant < 0) return null
  const distance = -projection - Math.sqrt(discriminant)
  return distance > EPSILON ? distance : null
}

function passesLens(origin: Point, direction: Point, length: number) {
  const offset: Point = [POSITIONS.lens[0] - origin[0], POSITIONS.lens[1] - origin[1]]
  const projection = dot(offset, direction)
  return projection > EPSILON && projection < length && Math.abs(cross(offset, direction)) < 0.18
}

/** Trace actual finite mirror segments, then derive the receiver and lens outcome. */
export function traceLight(state: PuzzleState): LightTrace {
  const segments: LightTrace['segments'] = []
  const hits: Mechanism[] = []
  let origin: Point = [...POSITIONS.source]
  let direction: Point = [1, 0]
  let receiverLit = false

  for (let reflection = 0; reflection <= MAX_REFLECTIONS; reflection++) {
    let distance = distanceToBoundary(origin, direction)
    let mirror: { id: (typeof MIRRORS)[number]; tangent: Point } | null = null
    if (reflection < MAX_REFLECTIONS) {
      for (const id of MIRRORS) {
        const intersection = distanceToMirror(origin, direction, POSITIONS[id], state[id])
        if (intersection && intersection.distance < distance) {
          distance = intersection.distance
          mirror = { id, tangent: intersection.tangent }
        }
      }
    }
    const receiverDistance = distanceToReceiver(origin, direction)
    if (receiverDistance !== null && receiverDistance < distance) {
      distance = receiverDistance
      receiverLit = true
      mirror = null
    }
    const endpoint = along(origin, direction, distance)
    segments.push({ from: origin, to: endpoint })
    if (state.lensPlaced && passesLens(origin, direction, distance)) hits.push('lens')
    if (!mirror) break
    hits.push(mirror.id)
    const projected = 2 * dot(direction, mirror.tangent)
    direction = [
      projected * mirror.tangent[0] - direction[0],
      projected * mirror.tangent[1] - direction[1],
    ]
    origin = endpoint
  }

  return {
    segments,
    hits,
    receiverLit,
    solved: receiverLit && hits.includes('lens') && state.lensStep === LENS_TARGET_STEP,
  }
}

function hasStateShape(value: unknown): value is PuzzleState {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const state = value as Record<string, unknown>
  return (
    Number.isInteger(state.mirrorA) &&
    (state.mirrorA as number) >= 0 &&
    (state.mirrorA as number) < 8 &&
    Number.isInteger(state.mirrorB) &&
    (state.mirrorB as number) >= 0 &&
    (state.mirrorB as number) < 8 &&
    Number.isInteger(state.lensStep) &&
    (state.lensStep as number) >= 0 &&
    (state.lensStep as number) < 4 &&
    typeof state.lensPlaced === 'boolean' &&
    typeof state.entered === 'boolean'
  )
}

export function isValidState(value: unknown): value is PuzzleState {
  return hasStateShape(value) && (!value.entered || traceLight(value).solved)
}

function cleanState(state: PuzzleState): PuzzleState {
  return {
    mirrorA: state.mirrorA,
    mirrorB: state.mirrorB,
    lensPlaced: state.lensPlaced,
    lensStep: state.lensStep,
    entered: state.entered,
  }
}

export function parseSavedState(serialized: string | null | undefined): PuzzleState | null {
  if (!serialized || serialized.length > 2048) return null
  try {
    const value: unknown = JSON.parse(serialized)
    if (!value || typeof value !== 'object' || !('version' in value) || value.version !== 1)
      return null
    if (!('state' in value) || !isValidState(value.state)) return null
    return cleanState(value.state)
  } catch {
    return null
  }
}

export function serializeState(state: PuzzleState): string {
  if (!isValidState(state)) throw new Error('Cannot save an invalid observatory state.')
  return JSON.stringify({ version: 1, state: cleanState(state) })
}

export function applyMove(state: PuzzleState, move: PuzzleMove): PuzzleState {
  if (move.type === 'enter') {
    return traceLight(state).solved ? { ...state, entered: true } : state
  }
  if (state.entered) return state
  if (move.type === 'place-lens') {
    return state.lensPlaced ? state : { ...state, lensPlaced: true }
  }
  if (move.target === 'lens') {
    return state.lensPlaced ? { ...state, lensStep: (state.lensStep + move.delta + 4) % 4 } : state
  }
  return { ...state, [move.target]: (state[move.target] + move.delta + 8) % 8 }
}

export function describeState(state: PuzzleState): string {
  if (state.entered) return 'You stepped into the garden. The observatory is awake.'
  const light = traceLight(state)
  if (light.solved) return 'The pattern matches. The portal is awake and ready to enter.'
  if (light.receiverLit && !state.lensPlaced)
    return 'Light reaches the receiver. Place the patterned lens in its holder.'
  if (light.receiverLit)
    return 'Light reaches the receiver. Turn the lens to match its notch with the engraved pattern.'
  if (light.hits.includes('mirrorB'))
    return 'The beam reaches the second mirror, then misses the receiver.'
  if (light.hits.includes('mirrorA'))
    return 'The first mirror catches the light. Its reflection misses the second mirror.'
  return 'The beam passes the first mirror. Turn it to catch the light.'
}

function nextTurn(current: number, target: number, total: number, label: string) {
  const forward = (target - current + total) % total
  const backwards = (current - target + total) % total
  const direction = forward <= backwards ? 'right' : 'left'
  const turns = Math.min(forward, backwards)
  return `Turn ${label} ${direction} ${turns} ${turns === 1 ? 'stop' : 'stops'}.`
}

export function getHint(state: PuzzleState, level: number): string {
  const light = traceLight(state)
  if (state.entered)
    return 'The garden is yours to enjoy. Replay whenever you want to wake it again.'
  if (light.solved) return 'The doorway is open. Enter the portal to see what you woke.'
  if (level <= 1) {
    if (!light.hits.includes('mirrorB'))
      return 'Follow the beam from the lamp. The first mirror needs to send it toward the second.'
    if (!light.receiverLit)
      return 'The second mirror catches the beam. Look for the engraved receiver on the other side of the table.'
    if (!state.lensPlaced)
      return 'The receiver has light, but no pattern. The lens beside the holder can give it one.'
    return 'Compare the single notch in the lens with the notch engraved on the receiver.'
  }
  if (level === 2) {
    if (!light.hits.includes('mirrorB'))
      return 'A diagonal mirror turns the beam through a right angle. Aim it across the table toward the second mirror.'
    if (!light.receiverLit)
      return 'Give the second mirror the same diagonal as the first. Its reflection should pass through the lens holder.'
    if (!state.lensPlaced)
      return 'Select the lens, then place it in the holder. Light must pass through its pattern before reaching the receiver.'
    return 'The matching lens has its notch at the left, the nine o’clock position. Turn it until both notches agree.'
  }
  if (state.mirrorA !== 6) return nextTurn(state.mirrorA, 6, 8, 'the first mirror')
  if (state.mirrorB !== 6) return nextTurn(state.mirrorB, 6, 8, 'the second mirror')
  if (!state.lensPlaced) return 'Select the patterned lens and choose Place lens.'
  return nextTurn(state.lensStep, LENS_TARGET_STEP, 4, 'the lens')
}
