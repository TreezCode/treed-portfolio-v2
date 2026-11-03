import { test, expect, type Page } from '@playwright/test'

const route = '/play/portal-keeper'
const saveKey = 'portal-keeper:observatory:v1'
// Consent UI has its own suite. Keep this journey focused on the puzzle's
// native keyboard scrolling instead of placing the first-visit notice over it.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('treez-analytics-consent:v1', 'declined'))
})
async function routeLight(page: Page) {
  for (let i = 0; i < 4; i++)
    await page.getByRole('button', { name: 'Turn Mirror A right', exact: true }).click()
  await page.getByRole('button', { name: 'Mirror B Toward the portal', exact: true }).click()
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Turn Mirror B left', exact: true }).click()
}
async function placeLens(page: Page) {
  await page.getByRole('button', { name: 'Pattern lens The final piece', exact: true }).click()
  await page.getByRole('button', { name: 'Place the lens', exact: true }).click()
}

test('complete room, wrong pattern, restoration, undo and reversible reset', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto(route)
  await expect(page.getByRole('button', { name: 'Turn Mirror A right', exact: true })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'Enter the portal', exact: true })).toBeDisabled()
  await routeLight(page)
  await expect(page.locator('.keeper-state')).toContainText('Place the patterned lens')
  await page.reload()
  await expect(page.locator('.keeper-progress > span').first()).toHaveAttribute(
    'data-complete',
    'true'
  )
  await placeLens(page)
  await expect(page.getByRole('button', { name: 'Enter the portal', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Turn Pattern lens left', exact: true }).click()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'awake')
  await page.getByRole('button', { name: 'Enter the portal', exact: true }).click()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'arrived')
  await expect(page.getByRole('heading', { name: /Some worlds just need/ })).toBeVisible()
  await page.getByRole('button', { name: 'Undo', exact: true }).click()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'awake')
  await page.getByRole('button', { name: 'Turn Pattern lens right', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Enter the portal', exact: true })).toBeDisabled()
  await page.getByRole('button', { name: 'Reset', exact: true }).click()
  await page.getByRole('button', { name: 'Undo', exact: true }).click()
  const saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).state, saveKey)
  expect(saved).toMatchObject({ mirrorA: 6, mirrorB: 6, lensPlaced: true, lensStep: 0 })
  await page.getByRole('button', { name: 'Pattern lens The final piece', exact: true }).click()
  await page.getByRole('button', { name: 'Turn Pattern lens left', exact: true }).click()
  await page.getByRole('button', { name: 'Enter the portal', exact: true }).click()
  await page.reload()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'arrived')
  expect(errors).toEqual([])
})

test('phone layout, keyboard controls and reduced motion retain complete play', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto(route)
  const turn = page.getByRole('button', { name: 'Turn Mirror A right', exact: true })
  await expect(turn).toBeEnabled()
  await turn.focus()
  await expect
    .poll(async () =>
      turn.evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return element.contains(
          document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
        )
      })
    )
    .toBe(true)
  for (let i = 0; i < 4; i++) await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Mirror B', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Turn Mirror B left', exact: true }).focus()
  for (let i = 0; i < 2; i++) await page.keyboard.press('Space')
  await page.getByRole('button', { name: 'Pattern lens', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Place the lens', exact: true }).focus()
  await page.keyboard.press('Enter')
  await page.getByRole('button', { name: 'Turn Pattern lens left', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Enter the portal', exact: true })).toBeEnabled()
  const layout = await page.evaluate(() => {
    const stage = document.querySelector('.keeper-stage')!.getBoundingClientRect()
    const controls = document.querySelector('.keeper-instrument-controls')!.getBoundingClientRect()
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      stageBottom: stage.bottom,
      controlsTop: controls.top,
    }
  })
  expect(layout.overflow).toBe(false)
  expect(layout.controlsTop).toBeGreaterThanOrEqual(layout.stageBottom)
  await page.getByRole('button', { name: 'Enter the portal', exact: true }).focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'arrived')
  await expect
    .poll(async () =>
      page.locator('.keeper-completion h2').evaluate((element) => {
        const rect = element.getBoundingClientRect()
        return element.contains(
          document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2)
        )
      })
    )
    .toBe(true)
  await page.setViewportSize({ width: 320, height: 740 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('unavailable WebGL uses a playable diagram; corrupt progress is recoverable', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      kind: string,
      ...args: unknown[]
    ) {
      if (kind === 'webgl' || kind === 'webgl2' || kind === 'experimental-webgl') return null
      return Reflect.apply(original, this, [kind, ...args])
    } as typeof original
  })
  await page.goto(route)
  await expect(page.getByText('3D is unavailable. The flat puzzle still works.')).toBeVisible()
  await expect(page.locator('.keeper-diagram')).toBeVisible()
  await routeLight(page)
  await placeLens(page)
  await page.getByRole('button', { name: 'Turn Pattern lens left', exact: true }).click()
  await page.getByRole('button', { name: 'Enter the portal', exact: true }).click()
  await expect(page.locator('.keeper-garden-diagram')).toBeVisible()
  await page.evaluate(
    (key) => localStorage.setItem(key, '{"version":1,"state":{"entered":true}}'),
    saveKey
  )
  await page.reload()
  await expect(page.locator('.keeper-state')).toContainText('could not be opened')
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'sleeping')
})
