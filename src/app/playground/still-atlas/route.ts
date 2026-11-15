import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const dynamic = 'force-static'

export async function GET() {
  const html = await readFile(join(process.cwd(), 'experiences/still-atlas/index.html'))
  return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
}
