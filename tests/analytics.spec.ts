import { test, expect, type Page, type BrowserContext } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const local = process.env.PORTFOLIO_URL ?? 'http://127.0.0.1:4340'
const consentKey = 'treez-analytics-consent:v1'
const measurementId = 'G-S67R6WEVXS'

async function isolate(context: BrowserContext, actualSdk = false) {
  const state = { tagRequests: 0, blockedExternal: [] as string[], contactSuccess: false, collectionPayloads: [] as string[] }
  await context.route('**/*', async route => {
    const url = new URL(route.request().url())
    if (url.hostname === 'www.googletagmanager.com') {
      state.tagRequests += 1
      if (actualSdk && url.pathname === '/gtag/js') {
        // Only the public SDK is downloaded. Every collection endpoint stays intercepted below.
        const response = await route.fetch({ maxRedirects: 0 })
        await route.fulfill({ response })
      } else await route.fulfill({ contentType: 'application/javascript', body: '/* Intentionally intercepted: no Google SDK or real events in QA. */' })
    } else if (url.hostname.endsWith('.google-analytics.com') || url.hostname === 'google-analytics.com') {
      state.collectionPayloads.push(`${url.search}\n${route.request().postData() ?? ''}`)
      await route.fulfill({ status: 204, body: '' })
    } else if (url.hostname === 'buildwithtreez.com') {
      if (url.pathname === '/api/contact') {
        await route.fulfill({ status: state.contactSuccess ? 200 : 502, contentType: 'application/json', body: JSON.stringify({ success: state.contactSuccess }) })
      } else {
        try {
          const response = await route.fetch({ url: `${local}${url.pathname}${url.search}`, maxRedirects: 0 })
          await route.fulfill({ response })
        } catch (error) {
          // A navigation/reload can cancel an old dynamic import while its local proxy resolves.
          if (!/Route is already handled|Target page, context or browser has been closed/.test(String(error))) throw error
        }
      }
    } else if (url.origin === new URL(local).origin) await route.continue()
    else {
      state.blockedExternal.push(url.origin)
      await route.abort()
    }
  })
  return state
}

async function commands(page: Page) {
  return page.evaluate(() => {
    const browser = window as unknown as { dataLayer?: ArrayLike<unknown>[] }
    return (browser.dataLayer ?? []).map(item => Array.from(item))
  })
}

async function events(page: Page, name: string) {
  return (await commands(page)).filter(item => item[0] === 'event' && item[1] === name)
}

async function accepted(context: BrowserContext) {
  await context.addInitScript(key => localStorage.setItem(key, 'accepted'), consentKey)
}

test.afterEach(async ({ context }) => {
  // Remove all live tag contexts while interception is still active, including unload events.
  await Promise.all(context.pages().map(page => page.goto('about:blank')))
  // Reload can cancel a dynamic import while a local proxy resolves. Pages are now blank,
  // so ignoring only those retired route callbacks cannot allow live tag traffic through.
  await context.unrouteAll({ behavior: 'ignoreErrors' })
})

test('consent gates the tag, cleans payloads, deduplicates routes and supports revocation', async ({ page, context }) => {
  const state = await isolate(context)
  await page.goto('/?utm_source=linkedin&utm_medium=social&utm_campaign=living_archive_launch&email=private@example.invalid#private-recipe')
  await expect(page.getByRole('button', { name: 'Allow analytics', exact: true })).toBeVisible()
  expect(state.tagRequests).toBe(0)
  expect(await commands(page)).toEqual([])
  await page.locator('header').first().getByRole('link', { name: 'Work', exact: true }).click()
  await expect(page).toHaveURL(/\/work$/)
  expect(state.tagRequests).toBe(0)
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await expect.poll(() => state.tagRequests).toBe(1)
  await expect.poll(async () => (await events(page, 'page_view')).length).toBe(1)
  expect((await events(page, 'page_view'))[0][2]).toMatchObject({ page_location: 'https://buildwithtreez.com/work' })
  await page.locator('header').first().getByRole('link', { name: 'About', exact: true }).click()
  await expect.poll(async () => (await events(page, 'page_view')).length).toBe(2)
  const payloads = JSON.stringify(await commands(page))
  expect(payloads).not.toContain('private@example')
  expect(payloads).not.toContain('private-recipe')
  expect(payloads).toContain('living_archive_launch')
  expect(payloads).toContain('"send_page_view":false')
  await context.addCookies([{ name: '_ga', value: 'qa-only', url: 'https://buildwithtreez.com' }, { name: '_ga_S67R6WEVXS', value: 'qa-only', url: 'https://buildwithtreez.com' }])
  const preferences = page.getByRole('button', { name: 'Analytics preferences', exact: true })
  await preferences.click()
  await expect(page.locator('.analytics-notice')).toBeFocused()
  await page.getByRole('button', { name: 'No analytics', exact: true }).click()
  await expect(preferences).toBeFocused()
  expect((await context.cookies()).filter(cookie => cookie.name.startsWith('_ga'))).toHaveLength(0)
  expect(await page.evaluate(id => (window as unknown as Record<string, unknown>)[`ga-disable-${id}`], measurementId)).toBe(true)
  await page.locator('header').first().getByRole('link', { name: 'Work', exact: true }).click()
  expect(await commands(page)).toEqual([])
  await page.reload()
  await expect(page.locator('.analytics-notice')).toHaveCount(0)
  expect(state.tagRequests).toBe(1)
  expect(state.blockedExternal).toEqual([])
})

test('only a confirmed inquiry converts, and link events use approved classifications', async ({ page, context }) => {
  const state = await isolate(context)
  await accepted(context)
  await page.goto('/contact')
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('QA visitor')
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('qa-visitor@example.invalid')
  await page.getByRole('textbox', { name: 'What would you like to discuss?' }).fill('A fictional verification message that must never enter analytics.')
  await page.getByRole('button', { name: 'Send inquiry', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Send inquiry', exact: true })).toBeEnabled()
  expect(await events(page, 'generate_lead')).toHaveLength(0)
  state.contactSuccess = true
  await page.getByRole('button', { name: 'Send inquiry', exact: true }).click()
  await expect.poll(async () => (await events(page, 'generate_lead')).length).toBe(1)
  expect(JSON.stringify(await commands(page))).not.toContain('fictional')
  expect(JSON.stringify(await commands(page))).not.toContain('qa-visitor')
  await page.goto('/work/presentsphere')
  const link = page.locator('a[data-project-id="presentsphere"]').first()
  await link.evaluate(element => element.addEventListener('click', event => event.preventDefault()))
  await link.click()
  expect((await events(page, 'project_link_click'))[0][2]).toMatchObject({ project_id: 'presentsphere', link_kind: 'site', destination_domain: 'presentsphere.com' })
  const resume = page.locator('a[href="/joey-kubalak-resume.pdf"]').first()
  await resume.evaluate(element => element.addEventListener('click', event => event.preventDefault()))
  await resume.click()
  expect(await events(page, 'resume_click')).toHaveLength(1)
  expect(state.blockedExternal).toEqual([])
})

test('game counts an explicit completion once and ignores restored completion', async ({ page, context }) => {
  const state = await isolate(context)
  await accepted(context)
  await page.goto('/play/portal-keeper')
  await expect(page.getByRole('button', { name: 'Turn Mirror A right', exact: true })).toBeEnabled()
  expect(await events(page, 'game_start')).toHaveLength(0)
  await page.getByRole('button', { name: 'A little nudge', exact: true }).click()
  expect(await events(page, 'game_start')).toHaveLength(1)
  expect(await events(page, 'game_hint')).toHaveLength(1)
  for (let i = 0; i < 4; i++) await page.getByRole('button', { name: 'Turn Mirror A right', exact: true }).click()
  await page.getByRole('button', { name: 'Mirror B Toward the portal', exact: true }).click()
  for (let i = 0; i < 2; i++) await page.getByRole('button', { name: 'Turn Mirror B left', exact: true }).click()
  await page.getByRole('button', { name: 'Pattern lens The final piece', exact: true }).click()
  await page.getByRole('button', { name: 'Place the lens', exact: true }).click()
  await page.getByRole('button', { name: 'Turn Pattern lens left', exact: true }).click()
  await page.getByRole('button', { name: 'Enter the portal', exact: true }).click()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'arrived')
  expect(await events(page, 'game_start')).toHaveLength(1)
  expect(await events(page, 'game_complete')).toHaveLength(1)
  await page.reload()
  await expect(page.locator('.portal-keeper')).toHaveAttribute('data-phase', 'arrived')
  expect(await events(page, 'game_complete')).toHaveLength(0)
  expect(await events(page, 'game_start')).toHaveLength(0)
  expect(state.blockedExternal).toEqual([])
})

test('bench resets to the same face-on image and reports coarse export actions', async ({ page, context }) => {
  const state = await isolate(context)
  await accepted(context)
  await page.goto('/playground/geometry-bench')
  await expect(page.locator('.bench-stage')).toHaveAttribute('data-renderer', 'webgl')
  await page.locator('#bench-symmetry').focus()
  await page.keyboard.press('End')
  await page.locator('#bench-layers').focus()
  await page.keyboard.press('Home')
  await page.locator('#bench-spread').focus()
  await page.keyboard.press('Home')
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(await events(page, 'bench_interaction')).toHaveLength(1)
  async function capture(name: string) {
    const pending = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Save PNG view', exact: true }).click()
    const download = await pending
    const path = test.info().outputPath(name)
    await download.saveAs(path)
    return readFile(path)
  }
  const first = await capture('face-on.png')
  await page.getByRole('button', { name: 'Turn sculpture right', exact: true }).click()
  const turned = await capture('turned.png')
  expect(first.equals(turned)).toBe(false)
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(first.equals(await capture('reset.png'))).toBe(true)
  await page.getByRole('button', { name: 'Play motion', exact: true }).click()
  await page.evaluate(() => new Promise<void>(resolve => { let frame = 0; const tick = () => ++frame > 20 ? resolve() : requestAnimationFrame(tick); requestAnimationFrame(tick) }))
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(first.equals(await capture('reset-after-motion.png'))).toBe(true)
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(first.equals(await capture('repeated-reset.png'))).toBe(true)
  expect(await events(page, 'bench_export')).toHaveLength(5)
  expect(await events(page, 'bench_interaction')).toHaveLength(1)
  expect(state.blockedExternal).toEqual([])
})

test('local traffic remains excluded and mobile preferences fit the viewport', async ({ page, context }) => {
  const state = await isolate(context)
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto(local)
  await expect(page.locator('.analytics-notice')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.screenshot({ path: test.info().outputPath('consent-320.png') })
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await page.goto(`${local}/contact`)
  expect(state.tagRequests).toBe(0)
  expect(await commands(page)).toEqual([])
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
  await page.getByRole('button', { name: 'No analytics', exact: true }).click()
  await page.goto(`${local}/playground/geometry-bench`)
  expect(state.tagRequests).toBe(0)
})

test('mobile bench retains a repeatable face-on view without horizontal overflow', async ({ page, context }) => {
  await isolate(context)
  await accepted(context)
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/playground/geometry-bench')
  await expect(page.locator('.bench-stage')).toHaveAttribute('data-renderer', 'webgl')
  for (const [id, key] of [['symmetry', 'End'], ['layers', 'Home'], ['spread', 'Home']]) {
    await page.locator(`#bench-${id}`).focus()
    await page.keyboard.press(key)
  }
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const save = async (name: string) => {
    const pending = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Save PNG view', exact: true }).click()
    const path = test.info().outputPath(name)
    await (await pending).saveAs(path)
    return readFile(path)
  }
  const faceOn = await save('face-on-mobile.png')
  await page.getByRole('button', { name: 'Turn sculpture right', exact: true }).click()
  await page.getByRole('button', { name: 'Reset viewing angle', exact: true }).click()
  expect(faceOn.equals(await save('reset-mobile.png'))).toBe(true)
  await page.locator('.bench-stage').evaluate(element => window.scrollTo({ top: window.scrollY + element.getBoundingClientRect().top - 138, behavior: 'instant' }))
  await page.screenshot({ path: test.info().outputPath('bench-mobile-390.png') })
})

test('the real Google SDK emits sanitized transport payloads only after consent', async ({ page, context }) => {
  const state = await isolate(context, true)
  const errors: string[] = []
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/?email=private@example.invalid#private-recipe')
  await expect(page.getByRole('button', { name: 'Allow analytics', exact: true })).toBeVisible()
  expect(state.tagRequests).toBe(0)
  expect(state.collectionPayloads).toEqual([])
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await expect.poll(() => state.collectionPayloads.length, { timeout: 15000 }).toBeGreaterThan(0)
  await page.locator('header').first().getByRole('link', { name: 'Work', exact: true }).click()
  await expect.poll(() => state.collectionPayloads.some(payload => decodeURIComponent(payload).includes('dl=https://buildwithtreez.com/work')), { timeout: 15000 }).toBe(true)
  const payload = decodeURIComponent(state.collectionPayloads.join('\n'))
  expect(payload).not.toContain('private@example')
  expect(payload).not.toContain('private-recipe')
  expect(payload).not.toContain('127.0.0.1')
  expect(payload).toContain(`tid=${measurementId}`)
  expect(payload.match(/en=page_view/g)).toHaveLength(2)
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
  await page.getByRole('button', { name: 'No analytics', exact: true }).click()
  const beforeRevokedNavigation = state.collectionPayloads.length
  await page.locator('header').first().getByRole('link', { name: 'About', exact: true }).click()
  await expect(page).toHaveURL(/\/about$/)
  expect(state.collectionPayloads).toHaveLength(beforeRevokedNavigation)
  expect(await page.evaluate(id => (window as unknown as Record<string, unknown>)[`ga-disable-${id}`], measurementId)).toBe(true)
  expect(errors.filter(error => /Content Security Policy|Refused to/i.test(error))).toEqual([])
  expect(state.blockedExternal).toEqual([])
})

test('consent changes synchronize between open tabs', async ({ page, context }) => {
  const state = await isolate(context)
  await page.goto('/work')
  const second = await context.newPage()
  await second.goto('/about')
  await expect(second.getByRole('button', { name: 'Allow analytics', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Allow analytics', exact: true }).click()
  await expect(second.locator('.analytics-notice')).toHaveCount(0)
  await expect.poll(() => state.tagRequests).toBe(2)
  await page.getByRole('button', { name: 'Analytics preferences', exact: true }).click()
  await page.getByRole('button', { name: 'No analytics', exact: true }).click()
  await expect.poll(() => second.evaluate(id => (window as unknown as Record<string, unknown>)[`ga-disable-${id}`], measurementId)).toBe(true)
  expect(await commands(second)).toEqual([])
})

test('a visitor can decline when browser storage is unavailable', async ({ page, context }) => {
  const state = await isolate(context)
  await context.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('Storage blocked for QA') } }))
  await page.goto('/work')
  await page.getByRole('button', { name: 'No analytics', exact: true }).click()
  await expect(page.locator('.analytics-notice')).toHaveCount(0)
  await page.locator('header').first().getByRole('link', { name: 'About', exact: true }).click()
  await expect(page.locator('.analytics-notice')).toHaveCount(0)
  expect(state.tagRequests).toBe(0)
})
