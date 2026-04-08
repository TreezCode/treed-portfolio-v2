import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './perf/playwright',
  timeout: 60000,
  retries: 0,
  workers: 1, // serial — avoid GPU contention during perf tests
  reporter: [
    ['list'],
    ['html', { outputFolder: 'perf/playwright/report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.PERF_URL ?? 'http://localhost:3000',
    trace: 'off', // managed manually per-test in the spec
    video: 'off',
  },
})
