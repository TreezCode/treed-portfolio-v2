import { normalizeConfig, PALETTES, type BenchConfig } from './bench-config'

const TAU = Math.PI * 2
const decimal = (value: number) => value.toFixed(2)

function point(radius: number, angle: number) {
  return `${decimal(Math.cos(angle) * radius)},${decimal(Math.sin(angle) * radius)}`
}

/** An original flat print of the same parameters, rather than a screenshot of the 3D camera. */
export function buildPosterSvg(input: BenchConfig): string {
  const config = normalizeConfig(input)
  const palette = PALETTES[config.palette]
  const rotation = ((config.seed % 360) * Math.PI) / 180
  const twist = (config.twist * Math.PI) / 180
  const spread = config.spread / 100
  const lines: string[] = []
  const nodes: string[] = []

  if (config.shape === 'bloom') {
    for (let layer = 0; layer < config.layers; layer++) {
      const progress = layer / (config.layers - 1)
      const scale = 0.36 + progress * 0.64
      const radius = (155 + spread * 60) * scale
      const offset = (145 + spread * 60) * scale
      const phase = rotation + twist * progress
      const opacity = decimal(0.28 + progress * 0.48)
      for (let petal = 0; petal < config.symmetry; petal++) {
        const angle = phase + (petal * TAU) / config.symmetry
        const x = Math.cos(angle) * offset
        const y = Math.sin(angle) * offset
        lines.push(
          `<circle cx="${decimal(x)}" cy="${decimal(y)}" r="${decimal(radius)}" opacity="${opacity}"/>`
        )
        if (layer === config.layers - 1) {
          const nodeRadius = offset + radius
          nodes.push(
            `<circle cx="${decimal(Math.cos(angle) * nodeRadius)}" cy="${decimal(Math.sin(angle) * nodeRadius)}" r="4.2"/>`
          )
        }
      }
    }
    lines.push('<circle r="440" opacity=".16"/>', '<circle r="36" opacity=".8"/>')
  } else if (config.shape === 'orbit') {
    for (let layer = 0; layer < config.layers; layer++) {
      const progress = layer / (config.layers - 1)
      const radius = 150 + progress * 255
      const minor = radius * (0.25 + spread * 0.4)
      for (let orbit = 0; orbit < config.symmetry; orbit++) {
        const angle =
          ((rotation + twist * progress) * 180) / Math.PI + (orbit * 180) / config.symmetry
        lines.push(
          `<ellipse rx="${decimal(radius)}" ry="${decimal(minor)}" transform="rotate(${decimal(angle)})" opacity="${decimal(0.24 + progress * 0.49)}"/>`
        )
        if (layer === config.layers - 1) {
          const radians = (angle * Math.PI) / 180
          nodes.push(
            `<circle cx="${decimal(Math.cos(radians) * radius)}" cy="${decimal(Math.sin(radians) * radius)}" r="4.4"/>`
          )
        }
      }
    }
    lines.push('<circle r="44" opacity=".8"/>', '<circle r="428" opacity=".12"/>')
  } else {
    const outer: { x: number; y: number }[] = []
    const inner: { x: number; y: number }[] = []
    for (let layer = 0; layer < config.layers; layer++) {
      const progress = layer / (config.layers - 1)
      const radius = 80 + (1 - progress) * (260 + spread * 85)
      const phase = rotation + twist * progress - Math.PI / 2
      const vertices: string[] = []
      for (let vertex = 0; vertex < config.symmetry; vertex++) {
        const angle = phase + (vertex * TAU) / config.symmetry
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        vertices.push(point(radius, angle))
        if (layer === 0) outer.push({ x, y })
        if (layer === config.layers - 1) inner.push({ x, y })
        nodes.push(
          `<circle cx="${decimal(x)}" cy="${decimal(y)}" r="${layer === 0 ? '4.8' : '2.4'}"/>`
        )
      }
      lines.push(
        `<polygon points="${vertices.join(' ')}" opacity="${decimal(0.9 - progress * 0.5)}"/>`
      )
      // A second edge gives each aperture a precise, drawn thickness.
      lines.push(`<polygon points="${vertices.join(' ')}" transform="scale(.98)" opacity=".15"/>`)
    }
    outer.forEach((vertex, index) => {
      lines.push(
        `<path d="M${decimal(vertex.x)} ${decimal(vertex.y)}L${decimal(inner[index].x)} ${decimal(inner[index].y)}" opacity=".2"/>`
      )
    })
  }

  const family = { bloom: 'BLOOM', orbit: 'ORBIT', portal: 'PORTAL' }[config.shape]
  // All interpolated values come from bounded numbers or fixed local labels/colors.
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200" role="img" aria-labelledby="title desc">
<title id="title">Geometry Bench: ${family.toLowerCase()} study</title>
<desc id="desc">An original geometric print with ${config.symmetry}-fold symmetry, ${config.layers} layers and the ${palette.label} palette. Seed ${config.seed}.</desc>
<defs><radialGradient id="light"><stop stop-color="${palette.secondary}" stop-opacity=".12"/><stop offset="1" stop-color="${palette.bg}" stop-opacity="0"/></radialGradient><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="${palette.ink}" opacity=".1"/></pattern></defs>
<rect width="1200" height="1200" fill="${palette.bg}"/>
<rect x="40" y="40" width="1120" height="1120" fill="none" stroke="${palette.ink}" stroke-opacity=".15"/>
<rect x="80" y="130" width="1040" height="900" fill="url(#grid)"/>
<circle cx="600" cy="565" r="490" fill="url(#light)"/>
<g transform="translate(600 565) rotate(-8)" fill="none" stroke="${palette.line}" stroke-width="1.7">${lines.join('')}</g>
<g transform="translate(600 565) rotate(-8)" fill="${palette.node}">${nodes.join('')}<circle r="5"/></g>
<g fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif"><text x="80" y="98" font-size="18" letter-spacing="3">GEOMETRY BENCH</text><text x="1120" y="98" text-anchor="end" font-size="14" letter-spacing="2">${family} / ${String(config.seed).padStart(6, '0')}</text><text x="80" y="1090" font-size="34" letter-spacing="-1">Keep making interesting things.</text><text x="80" y="1125" font-size="15" fill-opacity=".65">${config.symmetry} folds · ${config.layers} layers · ${palette.label}</text><text x="1120" y="1125" text-anchor="end" font-size="15" fill-opacity=".65">buildwithtreez.</text></g>
</svg>`
}
