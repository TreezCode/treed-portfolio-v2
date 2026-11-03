import type { BenchConfig } from './bench-config'

type Point = [number, number, number]

export type BenchGeometry = {
  primary: Float32Array
  secondary: Float32Array
  surfaces: Float32Array
  nodes: Float32Array
}

const TAU = Math.PI * 2
const STEPS = 96

/** A bounded, repeatable sculpture. No renderer or browser state enters this function. */
export function buildBenchGeometry(config: BenchConfig): BenchGeometry {
  const primary: number[] = []
  const secondary: number[] = []
  const surfaces: number[] = []
  const nodes: number[] = []
  const spread = config.spread / 100
  const twist = (config.twist * Math.PI) / 180
  const seedPhase = ((Math.imul(config.seed, 1597334677) >>> 0) / 4294967296) * TAU
  const segment = (target: number[], a: Point, b: Point) => target.push(...a, ...b)
  const loop = (target: number[], sample: (t: number) => Point, steps = STEPS) => {
    for (let step = 0; step < steps; step++) {
      segment(target, sample((step / steps) * TAU), sample(((step + 1) / steps) * TAU))
    }
  }
  const triangle = (a: Point, b: Point, c: Point) => surfaces.push(...a, ...b, ...c)

  if (config.shape === 'bloom') {
    for (let layer = 0; layer < config.layers; layer++) {
      const depth = layer / (config.layers - 1)
      const radius = 0.44 + depth * (0.38 + spread * 0.2)
      const offset = radius * (0.52 + spread * 0.48)
      const z = (depth - 0.5) * (0.25 + spread * 0.7)
      const turn = twist * depth + seedPhase * 0.06
      const line = layer === config.layers - 1 || layer === 0 ? primary : secondary
      for (let petal = 0; petal < config.symmetry; petal++) {
        const angle = (petal / config.symmetry) * TAU + turn
        const sample = (t: number): Point => [
          Math.cos(angle) * offset + Math.cos(t + angle) * radius,
          Math.sin(angle) * offset + Math.sin(t + angle) * radius,
          z + Math.sin(t) * Math.sin(twist + seedPhase * 0.05) * radius * 0.55,
        ]
        loop(line, sample)
        if (layer === config.layers - 1) {
          nodes.push(...sample(0))
          const inner: Point = [Math.cos(angle) * 0.18, Math.sin(angle) * 0.18, z - 0.12]
          triangle(inner, sample(-0.28), sample(0.28))
        }
      }
      loop(secondary, (t) => [Math.cos(t) * radius, Math.sin(t) * radius, z])
    }
    const middle = 0.3 + spread * 0.12
    loop(primary, (t) => [Math.cos(t) * middle, Math.sin(t) * middle, -0.14])
    loop(secondary, (t) => [Math.cos(t) * middle * 0.6, Math.sin(t) * middle * 0.6, 0.17])
    nodes.push(0, 0, 0.2)
  } else if (config.shape === 'orbit') {
    for (let layer = 0; layer < config.layers; layer++) {
      const depth = layer / (config.layers - 1)
      const radius = 0.57 + depth * (0.57 + spread * 0.4)
      const inclination = 0.35 + spread * 0.55 + twist * depth * 0.3
      for (let orbit = 0; orbit < config.symmetry; orbit++) {
        const angle = (orbit / config.symmetry) * Math.PI + twist * depth + seedPhase * 0.045
        const sample = (t: number): Point => [
          radius *
            (Math.cos(t) * Math.cos(angle) - Math.sin(t) * Math.sin(angle) * Math.cos(inclination)),
          radius *
            (Math.cos(t) * Math.sin(angle) + Math.sin(t) * Math.cos(angle) * Math.cos(inclination)),
          radius * Math.sin(t) * Math.sin(inclination),
        ]
        loop(layer === config.layers - 1 || layer === 0 ? primary : secondary, sample)
        if (layer === config.layers - 1) {
          nodes.push(
            ...sample(seedPhase + orbit * 0.3),
            ...sample(seedPhase + orbit * 0.3 + Math.PI)
          )
        }
      }
    }
    const radius = 0.38 + spread * 0.16
    for (let side = 0; side < config.symmetry; side++) {
      const a = (side / config.symmetry) * TAU
      const b = ((side + 1) / config.symmetry) * TAU
      const p: Point = [Math.cos(a) * radius, Math.sin(a) * radius, 0]
      const q: Point = [Math.cos(b) * radius, Math.sin(b) * radius, 0]
      for (const tip of [-0.48, 0.48]) {
        segment(primary, p, [0, 0, tip])
        triangle(p, q, [0, 0, tip])
      }
      segment(primary, p, q)
    }
    nodes.push(0, 0, -0.48, 0, 0, 0.48)
  } else {
    const rings: Point[][] = []
    for (let layer = 0; layer < config.layers; layer++) {
      const depth = layer / (config.layers - 1)
      const radius = 1.35 - depth * (0.35 + spread * 0.4)
      const z = (depth - 0.5) * (0.7 + spread * 1.25)
      const turn = twist * depth + seedPhase * 0.025
      const ring: Point[] = []
      for (let side = 0; side < config.symmetry; side++) {
        const angle = (side / config.symmetry) * TAU + turn + Math.PI / 2
        ring.push([Math.cos(angle) * radius, Math.sin(angle) * radius, z])
      }
      rings.push(ring)
      ring.forEach((point, side) => {
        segment(primary, point, ring[(side + 1) % config.symmetry])
        nodes.push(...point)
      })
      // A second, closely spaced aperture makes every frame feel machined.
      for (let side = 0; side < config.symmetry; side++) {
        const a = ring[side]
        const b = ring[(side + 1) % config.symmetry]
        segment(
          secondary,
          [a[0] * 0.96, a[1] * 0.96, a[2] + 0.025],
          [b[0] * 0.96, b[1] * 0.96, b[2] + 0.025]
        )
      }
    }
    for (let layer = 1; layer < rings.length; layer++) {
      for (let side = 0; side < config.symmetry; side++) {
        const current = rings[layer][side]
        const previous = rings[layer - 1][side]
        const next = rings[layer - 1][(side + 1) % config.symmetry]
        segment(secondary, previous, current)
        if (side % 2 === 0) triangle(previous, current, next)
      }
    }
  }

  // A sphere bound, rather than only an XY bound, keeps every turned pose inside its stage.
  let radius = 0
  for (const points of [primary, secondary, surfaces, nodes]) {
    for (let i = 0; i < points.length; i += 3) {
      radius = Math.max(radius, Math.hypot(points[i], points[i + 1], points[i + 2]))
    }
  }
  const scale = radius > 0 ? 1.7 / radius : 1
  const normalized = (values: number[]) => Float32Array.from(values, (value) => value * scale)
  return {
    primary: normalized(primary),
    secondary: normalized(secondary),
    surfaces: normalized(surfaces),
    nodes: normalized(nodes),
  }
}
