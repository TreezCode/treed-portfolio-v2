import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: 'analytics.spec.ts',
  timeout: 60000,
  workers: 1,
  retries: 0,
  reporter: 'list',
  outputDir: '../output/playwright/launch-analytics-tests',
  use: {
    baseURL: 'https://buildwithtreez.com',
    channel: 'chrome',
    viewport: { width: 1440, height: 1000 },
    trace: 'retain-on-failure',
  },
})
