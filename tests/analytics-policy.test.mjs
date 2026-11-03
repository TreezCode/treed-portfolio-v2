import test from 'node:test'
import assert from 'node:assert/strict'
import { canCollectAnalytics, campaignParameters, createAnalyticsSession, sanitizeAnalyticsEvent, readAnalyticsConsent } from '../src/lib/analytics-policy.ts'

function fixture(overrides = {}) {
  const commands = []
  const starts = []
  let stops = 0
  const session = createAnalyticsSession({
    enabled: true, id: 'G-TEST123', projectIds: ['presentsphere'],
    referrer: 'https://example.org/private/message?email=person@example.org',
    send: command => commands.push(command), start: configuration => starts.push(configuration), stop: () => { stops += 1 }, ...overrides,
  })
  return { session, commands, starts, get stops() { return stops } }
}

test('only the intended production host and context can collect', () => {
  assert.equal(canCollectAnalytics('G-TEST123', 'production', 'buildwithtreez.com'), true)
  for (const host of ['localhost', '127.0.0.1', 'preview.netlify.app', 'www.buildwithtreez.com', 'buildwithtreez.com.evil.example']) assert.equal(canCollectAnalytics('G-TEST123', 'production', host), false)
  for (const context of ['local', 'deploy-preview', 'branch-deploy', 'development', '']) assert.equal(canCollectAnalytics('G-TEST123', context, 'buildwithtreez.com'), false)
  assert.equal(canCollectAnalytics('', 'production', 'buildwithtreez.com'), false)
  assert.equal(readAnalyticsConsent('true'), null)
  assert.equal(readAnalyticsConsent('accepted'), 'accepted')
})

test('unknown or declined consent loads nothing and does not replay past browsing', () => {
  const f = fixture()
  f.session.visit('/', 'Home')
  f.session.visit('/contact', 'Contact')
  assert.equal(f.session.event('generate_lead'), false)
  f.session.consent('declined')
  assert.equal(f.starts.length, 0)
  assert.equal(f.commands.length, 0)
  f.session.consent('accepted')
  assert.equal(f.starts.length, 1)
  assert.equal(f.commands.filter(c => c[1] === 'page_view').length, 1)
  assert.equal(f.commands.at(-1)[2].page_location, 'https://buildwithtreez.com/contact')
  assert.equal(f.starts[0].send_page_view, false)
  assert.equal(f.starts[0].allow_google_signals, false)
  assert.equal(f.starts[0].page_referrer, 'https://example.org')
})

test('one pageview per route change, including real back navigation', () => {
  const f = fixture()
  f.session.consent('accepted')
  f.session.visit('/work', 'Work')
  f.session.visit('/work', 'Work')
  f.session.consent('accepted')
  f.session.visit('/work/presentsphere', 'PresentSphere')
  f.session.visit('/work', 'Work')
  const views = f.commands.filter(c => c[1] === 'page_view')
  assert.equal(views.length, 3)
  assert.equal(views[1][2].page_referrer, 'https://buildwithtreez.com/work')
  assert.equal(views[2][2].page_referrer, 'https://buildwithtreez.com/work/presentsphere')
})

test('revocation stops collection, excluded pages stop automatic collection too', () => {
  const f = fixture()
  f.session.visit('/', 'Home')
  f.session.consent('accepted')
  f.session.consent('declined')
  assert.equal(f.stops, 1)
  const count = f.commands.length
  f.session.visit('/work', 'Work')
  assert.equal(f.session.event('resume_click'), false)
  assert.equal(f.commands.length, count)
  f.session.consent('accepted')
  f.session.visit('/work/private-user-input', 'Private path')
  assert.equal(f.stops, 2)
  assert.equal(f.session.event('email_click'), false)
  assert.equal(JSON.stringify(f.commands).includes('private-user-input'), false)
})

test('payloads cannot carry message contents, full URLs, arbitrary events or parameters', () => {
  const f = fixture()
  f.session.consent('accepted')
  f.session.visit('/contact', 'Contact')
  f.session.event('generate_lead', { email: 'person@example.com', message: 'private', value: 999 })
  const event = f.commands.at(-1)
  assert.deepEqual(event[2], { send_to: 'G-TEST123', page_location: 'https://buildwithtreez.com/contact', method: 'contact_form' })
  assert.equal(sanitizeAnalyticsEvent('arbitrary', {}, []), null)
  assert.equal(sanitizeAnalyticsEvent('project_link_click', { project_id: 'unknown', destination_domain: 'example.com', link_kind: 'site' }, ['presentsphere']), null)
  assert.equal(sanitizeAnalyticsEvent('project_link_click', { project_id: 'presentsphere', destination_domain: 'https://example.com/private?a=b', link_kind: 'site' }, ['presentsphere']), null)
  assert.deepEqual(sanitizeAnalyticsEvent('project_link_click', { project_id: 'presentsphere', destination_domain: 'github.com', link_kind: 'source' }, ['presentsphere']), { project_id: 'presentsphere', destination_domain: 'github.com', link_kind: 'source' })
  assert.deepEqual(sanitizeAnalyticsEvent('game_hint', { hint_level: 2, save: 'private' }, []), { game: 'portal_keeper', room: 'observatory', hint_level: 2 })
  assert.equal(sanitizeAnalyticsEvent('game_hint', { hint_level: 4 }, []), null)
})

test('safe campaign labels work without carrying other query strings or recipes', () => {
  assert.deepEqual(campaignParameters('?utm_source=linkedin&utm_medium=social&utm_campaign=living_archive_launch&email=person@example.com&recipe=private'), { campaign_source: 'linkedin', campaign_medium: 'social', campaign_name: 'living_archive_launch' })
  assert.deepEqual(campaignParameters('?utm_source=person%40example.com&utm_campaign=private%20message&utm_content=%3Cscript%3E'), {})
  const f = fixture()
  f.session.consent('accepted')
  f.session.visit('/playground/geometry-bench#bench=private', 'Bench')
  f.session.visit('/contact?email=person@example.com', 'Contact')
  assert.equal(f.starts.length, 0)
})

test('disabled deployments never load or send even with stored consent', () => {
  const f = fixture({ enabled: false })
  f.session.consent('accepted')
  f.session.visit('/', 'Home')
  f.session.event('generate_lead')
  assert.equal(f.starts.length, 0)
  assert.equal(f.commands.length, 0)
})
