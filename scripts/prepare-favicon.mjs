import { readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

// Keep the browser fallback identical to the editable Living Archive vector.
const svg = await readFile(new URL('../src/app/icon.svg', import.meta.url))
const sizes = [16, 32, 48, 64, 128, 256]
const frames = await Promise.all(
  sizes.map((size) => sharp(svg, { density: 384 }).resize(size, size).png().toBuffer())
)
const header = Buffer.alloc(6 + 16 * sizes.length)
header.writeUInt16LE(1, 2) // ICO image type
header.writeUInt16LE(sizes.length, 4)
let offset = header.length
frames.forEach((frame, index) => {
  const entry = 6 + 16 * index
  header[entry] = sizes[index] === 256 ? 0 : sizes[index]
  header[entry + 1] = header[entry]
  header.writeUInt16LE(1, entry + 4)
  header.writeUInt16LE(32, entry + 6)
  header.writeUInt32LE(frame.length, entry + 8)
  header.writeUInt32LE(offset, entry + 12)
  offset += frame.length
})
await writeFile(new URL('../src/app/favicon.ico', import.meta.url), Buffer.concat([header, ...frames]))
console.log(`Generated Living Archive favicon: ${sizes.join(', ')}px`)
