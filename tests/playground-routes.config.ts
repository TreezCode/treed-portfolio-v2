import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: 'playground-routes.spec.ts',
  timeout: 60000,
  workers: 1,
  retries: 0,
  reporter: 'list',
  outputDir: '../output/playwright/playground-route-tests',
  use: {
    baseURL: process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4318',
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
})
