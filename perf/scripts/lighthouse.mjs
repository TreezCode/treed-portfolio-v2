/**
 * PERF TESTING: Lighthouse mobile audit script.
 * Usage: node perf/scripts/lighthouse.mjs [mode]
 * Modes: baseline | minimal-ui | reduced-motion | reduced-3d
 *
 * Requires: npm run dev (or npm start) to be running first.
 * Results saved to perf/lighthouse-results/<mode>-<timestamp>.json + .html
 */

import lighthouse from 'lighthouse'
import * as chromeLauncher from 'chrome-launcher'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const RESULTS_DIR = join(__dirname, '..', 'lighthouse-results')

const BASE_URL = process.env.PERF_URL ?? 'http://localhost:3000'
const mode = process.argv[2] ?? 'baseline'
const queryParam = mode !== 'baseline' ? `?perf=${mode}` : ''
const url = `${BASE_URL}/${queryParam}`

console.log(`\n[lighthouse] mode=${mode} url=${url}\n`)

mkdirSync(RESULTS_DIR, { recursive: true })

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless', '--disable-gpu'] })

const flags = { port: chrome.port, output: ['json', 'html'] }

// Mobile emulation config
const config = {
  extends: 'lighthouse:default',
  settings: {
    formFactor: 'mobile',
    screenEmulation: {
      mobile: true,
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      disabled: false,
    },
    throttling: {
      rttMs: 150,
      throughputKbps: 1638.4,
      cpuSlowdownMultiplier: 4,
      requestLatencyMs: 562.5,
      downloadThroughputKbps: 1474.56,
      uploadThroughputKbps: 675,
    },
    throttlingMethod: 'simulate',
  },
}

const result = await lighthouse(url, flags, config)

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
const baseName = join(RESULTS_DIR, `${mode}-${timestamp}`)

writeFileSync(`${baseName}.json`, result.report[0])
writeFileSync(`${baseName}.html`, result.report[1])

const { performance, accessibility, 'best-practices': bestPractices, seo } = result.lhr.categories
console.log(`\n[lighthouse] Results for mode=${mode}`)
console.log(`  Performance:    ${Math.round(performance.score * 100)}`)
console.log(`  Accessibility:  ${Math.round(accessibility.score * 100)}`)
console.log(`  Best Practices: ${Math.round(bestPractices.score * 100)}`)
console.log(`  SEO:            ${Math.round(seo.score * 100)}`)
console.log(`\n  Saved: ${baseName}.html\n`)

await chrome.kill()
