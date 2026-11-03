import sharp from 'sharp'
import { mkdir, readFile, writeFile, stat, copyFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import path from 'node:path'

// Portfolio derivatives only. All production originals remain untouched.
const shop = 'C:/Dev/digital-product-shop'
const pilot = 'C:/Users/treez/Documents/Codex/effectcraft-pilot-2026-11-02'
const audio = 'C:/Users/treez/OneDrive/Documents/ChatGPT/Skills/projects/original-lofi-2026-10-29/full-track-r1'
const output = path.resolve('public/portfolio/2026')
const docs = path.resolve('docs/portfolio-refresh')
await mkdir(output, { recursive: true })
await mkdir(docs, { recursive: true })

const entries = [
  ['elsewhere', 'C:/Users/treez/OneDrive/Documents/ChatGPT/Skills/prototypes/atrium-hero-demo/output/playwright/visual-review/final-desktop.png'],
  ['fieldwork', 'C:/Users/treez/OneDrive/Documents/ChatGPT/Skills/prototypes/grovery-choreography-demo/docs/qa/final-candidate-5-heading/final-desktop-hero.png'],
  ['cosmic-zen', 'C:/Dev/BWTAssetGeneration/projects/cosmic-zen/video/assets/reference/cosmic-zen/cosmic_zen_comet_aura_identity_v1.png'],
  ['little-portal-studio', `${shop}/marketing/winterlight-scene/pack-r02/delivery/Glasshouse/Scenes/Glasshouse_Clean.png`],
  ['glasshouse', `${shop}/marketing/winterlight-scene/pack-r02/delivery/Glasshouse/Scenes/Glasshouse_Clean.png`],
  ['sugarplum-bakery', `${shop}/marketing/sugarplum-bakery/pack-r02/delivery/Sugarplum/Scenes/Sugarplum_Clean.jpg`],
  ['north-pole-dispatch', `${shop}/marketing/north-pole-dispatch/pack-r01/delivery/final/NorthPoleDispatch/Scenes/Dispatch_Clean.jpg`],
  ['observatory', `${shop}/marketing/launch-review/media/listing-01.jpg`],
  ['prism-tide', `${shop}/products/STINGER-002/marketing/media/listing-01.jpg`],
  ['signal-fold', `${shop}/products/STINGER-003/marketing/media/listing-01.jpg`],
  ['paper-garden', `${shop}/products/STINGER-004/review/final-r01/sage-apricot/hero.png`],
  ['winterlight-atelier', `${shop}/marketing/winterlight/pack-r02/marketing/media/listing-01.jpg`],
  ['merry-current', `${shop}/marketing/merry-current/pack-r01/marketing/media/listing-01.jpg`],
  ['tinsel-tonight', `${shop}/marketing/christmas-next/fidelity-r02/review/media/r03/studio.png`],
  ['artificial-influence', 'C:/Dev/artificial-influence/Instagram Uploads/09 - Round Nine/Covers/02 - Mara - A Little Movement.jpg'],
  ['romy-arden', 'C:/Dev/artificial-influence/Instagram Uploads/09 - Round Nine/Covers/01 - Romy - The Better Seat.jpg'],
  ['impulse', `${pilot}/output/impulse-effectcraft-1080p60.mp4`, 5.5],
]
const manifest = []
for (const [slug, source, frame] of entries) {
  const bytes = await readFile(source)
  const imageBytes = frame === undefined ? bytes : execFileSync('C:/ffmpeg/bin/ffmpeg.exe', ['-hide_banner', '-loglevel', 'error', '-ss', String(frame), '-i', source, '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1'], { maxBuffer: 12 * 1024 * 1024 })
  const destination = path.join(output, `${slug}.webp`)
  const meta = await sharp(imageBytes).resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toFile(destination)
  manifest.push({ slug, source, sourceSha256: createHash('sha256').update(bytes).digest('hex'), derivative: `/portfolio/2026/${slug}.webp`, frameSeconds: frame, width: meta.width, height: meta.height, bytes: meta.size, method: frame === undefined ? 'Resize and WebP encoding, full original composition' : 'Frame extracted from completed current film, resize and WebP encoding' })
}
const waveSource = `${audio}/renders/previews/atmospheric.mp3`
const wave = execFileSync('C:/ffmpeg/bin/ffmpeg.exe', ['-hide_banner', '-loglevel', 'error', '-i', waveSource, '-filter_complex', 'aformat=channel_layouts=mono,showwavespic=s=1600x900:colors=0xd7bc8e', '-frames:v', '1', '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1'], { maxBuffer: 12 * 1024 * 1024 })
const waveMeta = await sharp(wave).flatten({ background: '#172b31' }).webp({ quality: 86 }).toFile(path.join(output, 'original-lofi.webp'))
manifest.push({ slug: 'original-lofi', source: waveSource, sourceSha256: createHash('sha256').update(await readFile(waveSource)).digest('hex'), derivative: '/portfolio/2026/original-lofi.webp', width: waveMeta.width, height: waveMeta.height, bytes: waveMeta.size, method: 'Waveform visualization of the actual completed mix' })
await copyFile(waveSource, path.join(output, 'original-lofi.mp3'))
const filmSource = `${pilot}/output/impulse-effectcraft-1080p60.mp4`
const filmOutput = path.join(output, 'impulse-preview.mp4')
execFileSync('C:/ffmpeg/bin/ffmpeg.exe', ['-hide_banner', '-loglevel', 'error', '-y', '-i', filmSource, '-vf', 'scale=1280:720', '-c:v', 'libx264', '-preset', 'fast', '-crf', '24', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', filmOutput])
const media = []
for (const [source, destination, method] of [[waveSource, path.join(output, 'original-lofi.mp3'), 'Byte-identical delivered mix'], [filmSource, filmOutput, 'Full-length 720p H.264/AAC viewing derivative']]) {
  media.push({ source, sourceSha256: createHash('sha256').update(await readFile(source)).digest('hex'), derivative: `/portfolio/2026/${path.basename(destination)}`, derivativeSha256: createHash('sha256').update(await readFile(destination)).digest('hex'), bytes: (await stat(destination)).size, method })
}
await writeFile(path.join(docs, 'creative-assets.json'), JSON.stringify({ date: '2026-11-03', note: 'Owned project images and current production artwork; no source originals modified. Local review does not publish this portfolio.', entries: manifest, media }, null, 2) + '\n')
console.log(JSON.stringify({ images: manifest.length, imageBytes: manifest.reduce((n, item) => n + item.bytes, 0), audioBytes: (await stat(path.join(output, 'original-lofi.mp3'))).size }))
