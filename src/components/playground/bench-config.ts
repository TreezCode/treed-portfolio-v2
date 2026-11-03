export type BenchShape = 'bloom' | 'orbit' | 'portal'
export type BenchPalette = 'lichen' | 'cosmic' | 'ember'

export type BenchConfig = {
  shape: BenchShape
  symmetry: number
  layers: number
  spread: number
  twist: number
  speed: number
  seed: number
  palette: BenchPalette
}

export const PALETTES = {
  lichen: {
    label: 'Lichen',
    bg: '#191c1b',
    ink: '#f4f1e7',
    line: '#d5ed9b',
    secondary: '#80b7a8',
    node: '#f3f6db',
  },
  cosmic: {
    label: 'Cosmic',
    bg: '#191c1b',
    ink: '#f4f1e7',
    line: '#c8b2ef',
    secondary: '#7aace8',
    node: '#f5e6ff',
  },
  ember: {
    label: 'Ember',
    bg: '#191c1b',
    ink: '#f4f1e7',
    line: '#f0bd85',
    secondary: '#df8581',
    node: '#fff0d0',
  },
} as const

export const DEFAULT_CONFIG: BenchConfig = {
  shape: 'bloom',
  symmetry: 6,
  layers: 5,
  spread: 62,
  twist: 18,
  speed: 28,
  seed: 314159,
  palette: 'lichen',
}

export const PRESETS: {
  id: string
  name: string
  description: string
  config: BenchConfig
}[] = [
  {
    id: 'seed-of-wonder',
    name: 'Seed of Wonder',
    description: 'A little order. A lot of possibility.',
    config: { ...DEFAULT_CONFIG },
  },
  {
    id: 'after-hours',
    name: 'After Hours',
    description: 'For thoughts that take the scenic route.',
    config: {
      shape: 'orbit',
      symmetry: 7,
      layers: 4,
      spread: 72,
      twist: 37,
      speed: 36,
      seed: 271828,
      palette: 'cosmic',
    },
  },
  {
    id: 'little-doorway',
    name: 'Little Doorway',
    description: 'There might be something on the other side.',
    config: {
      shape: 'portal',
      symmetry: 6,
      layers: 7,
      spread: 58,
      twist: 44,
      speed: 20,
      seed: 161803,
      palette: 'ember',
    },
  },
]

const SHAPES: BenchShape[] = ['bloom', 'orbit', 'portal']
const PALETTE_KEYS: BenchPalette[] = ['lichen', 'cosmic', 'ember']

function boundedInteger(value: unknown, minimum: number, maximum: number, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(minimum, Math.min(maximum, Math.round(value)))
    : fallback
}

/** Owns every numeric limit, including values restored from untrusted URL fragments. */
export function normalizeConfig(config: Partial<BenchConfig>): BenchConfig {
  return {
    shape: SHAPES.includes(config.shape as BenchShape) ? config.shape! : DEFAULT_CONFIG.shape,
    symmetry: boundedInteger(config.symmetry, 3, 12, DEFAULT_CONFIG.symmetry),
    layers: boundedInteger(config.layers, 2, 8, DEFAULT_CONFIG.layers),
    spread: boundedInteger(config.spread, 0, 100, DEFAULT_CONFIG.spread),
    twist: boundedInteger(config.twist, -90, 90, DEFAULT_CONFIG.twist),
    speed: boundedInteger(config.speed, 0, 100, DEFAULT_CONFIG.speed),
    seed: boundedInteger(config.seed, 1, 999999, DEFAULT_CONFIG.seed),
    palette: PALETTE_KEYS.includes(config.palette as BenchPalette)
      ? config.palette!
      : DEFAULT_CONFIG.palette,
  }
}

/** Fixed-order, versioned values only. Hashes never include visitor text or arbitrary keys. */
export function configToHash(config: BenchConfig): string {
  const value = normalizeConfig(config)
  return `#bench=${[
    'v1',
    value.shape,
    value.symmetry,
    value.layers,
    value.spread,
    value.twist,
    value.speed,
    value.seed,
    value.palette,
  ].join('.')}`
}

/** Reject unknown syntax/version/labels; clamp syntactically valid whole numbers. */
export function configFromHash(hash: string): BenchConfig | null {
  if (hash.length > 160 || !hash.startsWith('#bench=')) return null
  const parts = hash.slice(7).split('.')
  if (parts.length !== 9 || parts[0] !== 'v1') return null
  const [, shape, symmetry, layers, spread, twist, speed, seed, palette] = parts
  if (!SHAPES.includes(shape as BenchShape) || !PALETTE_KEYS.includes(palette as BenchPalette)) {
    return null
  }
  const values = [symmetry, layers, spread, twist, speed, seed]
  if (!values.every((value) => /^-?\d{1,7}$/.test(value))) return null
  return normalizeConfig({
    shape: shape as BenchShape,
    symmetry: Number(symmetry),
    layers: Number(layers),
    spread: Number(spread),
    twist: Number(twist),
    speed: Number(speed),
    seed: Number(seed),
    palette: palette as BenchPalette,
  })
}

/** A reproducible next variation. It keeps the visitor's chosen family and palette. */
export function makeVariation(config: BenchConfig): BenchConfig {
  const value = normalizeConfig(config)
  let state = value.seed >>> 0
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0
    return state / 4294967296
  }
  return {
    ...value,
    seed: 1 + Math.floor(random() * 999999),
    symmetry: 3 + Math.floor(random() * 10),
    layers: 2 + Math.floor(random() * 7),
    spread: 20 + Math.floor(random() * 76),
    twist: -75 + Math.floor(random() * 151),
    speed: 15 + Math.floor(random() * 41),
  }
}
