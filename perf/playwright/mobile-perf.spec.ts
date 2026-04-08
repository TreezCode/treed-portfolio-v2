/**
 * PERF TESTING: Playwright mobile performance harness.
 * Tests baseline and all perf modes across 3 mobile device profiles.
 * Usage: npm run perf:playwright
 *
 * Requires: npm run dev (or npm start) to be running first.
 * Set PERF_URL env var to test against a deployed URL.
 */

import { test, expect, devices } from '@playwright/test'
import { mkdirSync } from 'fs'
import path from 'path'

const BASE_URL = process.env.PERF_URL ?? 'http://localhost:3000'
const RESULTS_DIR = path.join(process.cwd(), 'perf', 'playwright', 'results')
mkdirSync(RESULTS_DIR, { recursive: true })

const PERF_MODES = [
  { mode: 'baseline', query: '' },
  { mode: 'minimal-ui', query: '?perf=minimal-ui' },
  { mode: 'reduced-motion', query: '?perf=reduced-motion' },
  { mode: 'reduced-3d', query: '?perf=reduced-3d' },
  { mode: 'compare-all', query: '?perf=compare-all' },
]

const MOBILE_PROFILES = [
  { name: 'iPhone-14', device: devices['iPhone 14'] },
  { name: 'Pixel-7', device: devices['Pixel 7'] },
  { name: 'Galaxy-S21', device: devices['Galaxy S8'] },
]

for (const profile of MOBILE_PROFILES) {
  test.describe(`Mobile: ${profile.name}`, () => {
    test.use({ ...profile.device })

    for (const { mode, query } of PERF_MODES) {
      test(`${mode} — loads and renders`, async ({ page }) => {
        const url = `${BASE_URL}/${query}`
        const consoleMessages: string[] = []
        const consoleErrors: string[] = []

        page.on('console', (msg) => {
          const text = msg.text()
          if (msg.type() === 'error') consoleErrors.push(text)
          // Capture FPS tracker logs
          if (text.startsWith('[perf:')) consoleMessages.push(text)
        })

        page.on('pageerror', (err) => consoleErrors.push(err.message))

        // Start tracing for this test
        await page.context().tracing.start({ screenshots: true, snapshots: true })

        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })

        // Wait for hero canvas to appear
        await page.waitForSelector('canvas', { timeout: 10000 })

        // Wait 4s for FPS tracker to emit at least one log (it logs every 5s but we capture what we can)
        await page.waitForTimeout(4000)

        // Scroll through the page to trigger whileInView animations
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }))
        await page.waitForTimeout(1500)
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
        await page.waitForTimeout(1500)

        // Screenshot
        const screenshotPath = path.join(RESULTS_DIR, `${profile.name}-${mode}.png`)
        await page.screenshot({ path: screenshotPath, fullPage: false })

        // Save trace
        const tracePath = path.join(RESULTS_DIR, `${profile.name}-${mode}-trace.zip`)
        await page.context().tracing.stop({ path: tracePath })

        // Log captured perf output
        if (consoleMessages.length) {
          console.log(`\n[playwright] ${profile.name}/${mode} FPS logs:`)
          consoleMessages.forEach((m) => console.log('  ', m))
        }

        // Fail on JS errors
        if (consoleErrors.length) {
          console.warn(`\n[playwright] ${profile.name}/${mode} JS errors:`)
          consoleErrors.forEach((e) => console.warn('  ', e))
        }

        // Basic assertions — page should load without crashes
        await expect(page.locator('canvas').first()).toBeVisible()
        expect(consoleErrors.filter((e) => !e.includes('favicon'))).toHaveLength(0)
      })
    }
  })
}
