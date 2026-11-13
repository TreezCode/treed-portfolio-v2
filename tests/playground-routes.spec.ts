import { test, expect } from '@playwright/test'

const hub = '/playground'
const bench = '/playground/geometry-bench'
const game = '/play/portal-keeper'
const story = '/work/portal-keeper'
const afterHours = '#bench=v1.orbit.7.4.72.37.36.271828.cosmic'

test('hub offers all three experiences; dedicated bench keeps its canonical and explanatory anchor', async ({
  page,
}) => {
  await page.goto(hub, { waitUntil: 'networkidle' })
  await expect(page.locator(`a[href="${bench}"]`).first()).toBeVisible()
  await expect(page.locator(`a[href="${game}"]`).first()).toBeVisible()
  const atlas = page
    .locator('article')
    .filter({ has: page.getByRole('heading', { name: 'Still Atlas.' }) })
  for (const name of ['Open Still Atlas', 'Explore the gallery']) {
    await expect(atlas.getByRole('link', { name, exact: true })).toHaveAttribute(
      'href',
      'https://still-atlas-playground.pages.dev/'
    )
  }
  await expect(page.locator('canvas')).toHaveCount(0)

  await page.locator(`a[href="${bench}"]`).first().click()
  await expect(page).toHaveURL((url) => url.pathname === bench)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Geometry')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/playground\/geometry-bench$/
  )
  await page.getByRole('link', { name: 'How it works', exact: true }).click()
  await expect(page).toHaveURL((url) => url.pathname === bench && url.hash === '#how-it-works')
  await expect(page.locator('#how-it-works')).toBeInViewport()
  await page.getByRole('link', { name: 'Back to the Playground', exact: true }).click()
  await expect(page).toHaveURL((url) => url.pathname === hub && url.hash === '')
  await page.reload({ waitUntil: 'networkidle' })
  await expect(page).toHaveURL((url) => url.pathname === hub && url.hash === '')
  await expect(page.locator('canvas')).toHaveCount(0)
})

test('legacy recipe preserves query and settings, then copies the new route', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const query = '?from=old-share&theme=after-hours'
  await page.goto(`${hub}${query}${afterHours}`, { waitUntil: 'networkidle' })
  await expect(page).toHaveURL(
    (url) => url.pathname === bench && url.search === query && url.hash === afterHours
  )
  await expect(page.getByRole('button', { name: /^After Hours/ })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  await expect(page.getByRole('combobox', { name: 'Form', exact: true })).toHaveValue('orbit')
  await expect(page.locator('#bench-symmetry')).toHaveValue('7')
  await expect(page.locator('#bench-layers')).toHaveValue('4')
  await expect(page.getByRole('button', { name: 'Cosmic', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  await expect(page.locator('.bench-stage-caption')).toContainText('Seed 271828')
  await expect(page.locator('.bench-status')).toContainText('Shared recipe loaded')

  await page.getByRole('button', { name: 'Copy recipe link', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Link copied', exact: true })).toBeVisible()
  const copied = new URL(await page.evaluate(() => navigator.clipboard.readText()))
  expect(copied.pathname).toBe(bench)
  expect(copied.search).toBe(query)
  expect(copied.hash).toBe(afterHours)

  await page.getByRole('link', { name: 'Back to the Playground', exact: true }).click()
  await expect(page).toHaveURL((url) => url.pathname === hub && url.hash === '')
  await page.evaluate((hash) => {
    window.location.hash = hash
  }, afterHours)
  await expect(page).toHaveURL((url) => url.pathname === bench && url.hash === afterHours)
  await expect(page.getByRole('button', { name: /^After Hours/ })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  await page.goBack({ waitUntil: 'networkidle' })
  await expect(page).toHaveURL((url) => url.pathname === hub && url.hash === '')
  await expect(page.locator('canvas')).toHaveCount(0)
})

test('invalid recipes retain recovery and legacy explanatory bookmarks still resolve', async ({
  page,
}) => {
  await page.goto(`${hub}?from=invalid#bench=v2.bad`, { waitUntil: 'networkidle' })
  await expect(page).toHaveURL(
    (url) =>
      url.pathname === bench && url.search === '?from=invalid' && url.hash === '#bench=v2.bad'
  )
  await expect(page.locator('.bench-status')).toContainText('That recipe could not be opened')
  await expect(page.getByRole('combobox', { name: 'Form', exact: true })).toHaveValue('bloom')

  await page.goto(`${hub}#how-it-works`, { waitUntil: 'networkidle' })
  await expect(page).toHaveURL((url) => url.pathname === bench && url.hash === '#how-it-works')
  await expect(page.locator('#how-it-works')).toBeInViewport()

  await page.goto(`${hub}#unrelated-bookmark`, { waitUntil: 'networkidle' })
  await expect(page).toHaveURL((url) => url.pathname === hub && url.hash === '#unrelated-bookmark')
  await expect(page.locator(`a[href="${bench}"]`).first()).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)
})

test('clipboard denial exposes a selectable recipe on the new route', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      configurable: true,
      value: async () => {
        throw new DOMException('Clipboard write denied for this check', 'NotAllowedError')
      },
    })
  })
  await page.goto(`${bench}${afterHours}`, { waitUntil: 'networkidle' })
  await expect(page.getByRole('button', { name: /^After Hours/ })).toHaveAttribute(
    'aria-pressed',
    'true'
  )
  await page.getByRole('button', { name: 'Copy recipe link', exact: true }).click()
  const fallback = page.getByRole('textbox', { name: 'Recipe link', exact: true })
  await expect(fallback).toBeVisible()
  const url = new URL(await fallback.inputValue())
  expect(url.pathname).toBe(bench)
  expect(url.hash).toBe(afterHours)
  await expect(page.locator('.bench-status')).toContainText('Copy this recipe link')
})

test('Portal Keeper story survives direct refresh and its light-path states match the puzzle', async ({
  page,
}) => {
  await page.goto(story, { waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('The Portal Keeper.')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    /\/work\/portal-keeper$/
  )
  await expect(page.locator(`a[href="${game}"]`).first()).toBeVisible()
  await expect(page.locator('canvas')).toHaveCount(0)

  const demo = page.locator('.keeper-path-demo')
  const states = [
    {
      label: 'Misaligned',
      stage: 'misaligned',
      receiver: 'Waiting',
      pattern: 'Lens not placed',
      portal: 'Sleeping',
    },
    {
      label: 'Routed',
      stage: 'routed',
      receiver: 'Lit',
      pattern: 'Lens not placed',
      portal: 'Sleeping',
    },
    { label: 'Awake', stage: 'awake', receiver: 'Lit', pattern: 'Matched', portal: 'Awake' },
  ]
  for (const state of states) {
    const button = page.getByRole('button', { name: state.label, exact: true })
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(demo).toHaveAttribute('data-path-stage', state.stage)
    const values = demo.locator('.keeper-path-facts dd')
    await expect(values).toHaveText([state.receiver, state.pattern, state.portal])
  }
  await page.getByRole('button', { name: 'Misaligned', exact: true }).click()
  await expect(demo).toHaveAttribute('data-path-stage', 'misaligned')
  await expect(demo.locator('.keeper-path-facts dd')).toHaveText([
    'Waiting',
    'Lens not placed',
    'Sleeping',
  ])
})
