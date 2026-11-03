export const ANALYTICS_CONSENT_KEY = 'treez-analytics-consent:v1'
export type AnalyticsConsent = 'accepted' | 'declined' | null
export type AnalyticsEvent =
  | 'generate_lead'
  | 'resume_click'
  | 'email_click'
  | 'project_link_click'
  | 'bench_interaction'
  | 'bench_export'
  | 'bench_share'
  | 'game_start'
  | 'game_hint'
  | 'game_complete'

export type AnalyticsParameters = Record<string, string | number>
export type AnalyticsCommand = unknown[]
const ORIGIN = 'https://buildwithtreez.com'
const corePaths = ['/', '/work', '/about', '/contact', '/privacy', '/playground', '/playground/geometry-bench', '/play/portal-keeper', '/work/portal-keeper']

export function canCollectAnalytics(id: string, context: string, hostname: string) {
  return /^G-[A-Z0-9]+$/.test(id) && context === 'production' && hostname === 'buildwithtreez.com'
}

export function readAnalyticsConsent(value: string | null): AnalyticsConsent {
  return value === 'accepted' || value === 'declined' ? value : null
}

// Only campaign labels intended for public links are accepted. Arbitrary query values never
// enter page_location; labels with email-like text, spaces, encoding or long values are dropped.
export function campaignParameters(search: string): AnalyticsParameters {
  const params = new URLSearchParams(search)
  const result: AnalyticsParameters = {}
  for (const [input, output] of [['utm_source', 'campaign_source'], ['utm_medium', 'campaign_medium'], ['utm_campaign', 'campaign_name'], ['utm_content', 'campaign_content']] as const) {
    const value = params.get(input)
    if (value && /^[a-z0-9][a-z0-9_-]{0,63}$/i.test(value)) result[output] = value
  }
  return result
}

export function sanitizeAnalyticsEvent(name: AnalyticsEvent, values: AnalyticsParameters, projectIds: string[]): AnalyticsParameters | null {
  if (name === 'generate_lead') return { method: 'contact_form' }
  if (name === 'resume_click' || name === 'email_click') return {}
  if (name === 'project_link_click') {
    if (!projectIds.includes(String(values.project_id))) return null
    const domain = String(values.destination_domain ?? '')
    if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,24}$/.test(domain)) return null
    if (!['site', 'source', 'video', 'product', 'case_study', 'archive'].includes(String(values.link_kind))) return null
    return { project_id: String(values.project_id), destination_domain: domain, link_kind: String(values.link_kind) }
  }
  if (name === 'bench_interaction') return { experiment: 'geometry_bench' }
  if (name === 'bench_export' && (values.format === 'svg' || values.format === 'png')) return { experiment: 'geometry_bench', format: values.format }
  if (name === 'bench_share') return { experiment: 'geometry_bench', method: 'copy_link' }
  if (name === 'game_start' || name === 'game_complete') return { game: 'portal_keeper', room: 'observatory' }
  if (name === 'game_hint' && [1, 2, 3].includes(Number(values.hint_level))) return { game: 'portal_keeper', room: 'observatory', hint_level: Number(values.hint_level) }
  return null
}

type AnalyticsSessionOptions = {
  enabled: boolean
  id: string
  projectIds: string[]
  campaign?: AnalyticsParameters
  referrer?: string
  start: (configuration: Record<string, unknown>) => void
  send: (command: AnalyticsCommand) => void
  stop: () => void
}

export function createAnalyticsSession(options: AnalyticsSessionOptions) {
  const paths = new Set([...corePaths, ...options.projectIds.map(id => `/work/${id}`)])
  let accepted = false
  let current: { path: string; title: string } | null = null
  let lastPath: string | null = null
  let previousLocation = ''
  let started = false
  let initialReferrer = ''
  try {
    const referrer = new URL(options.referrer ?? '')
    if (referrer.protocol === 'https:' || referrer.protocol === 'http:') initialReferrer = referrer.origin
  } catch { /* Direct visit. */ }

  function pageview() {
    if (!options.enabled || !accepted || !current || lastPath === current.path) return
    const location = `${ORIGIN}${current.path}`
    if (!started) {
      options.start({
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
        page_location: location,
        page_referrer: initialReferrer,
        ...options.campaign,
      })
      started = true
    }
    // Updating these defaults keeps automatically collected engagement/session events on the
    // sanitized current route, even though pageviews themselves have exactly one owner.
    options.send(['config', options.id, { send_page_view: false, page_location: location, page_referrer: previousLocation || initialReferrer, page_title: current.title }])
    options.send(['event', 'page_view', { send_to: options.id, page_location: location, page_referrer: previousLocation || initialReferrer, page_title: current.title }])
    lastPath = current.path
    previousLocation = location
  }

  return {
    consent(value: AnalyticsConsent) {
      const next = value === 'accepted'
      if (next === accepted) return
      accepted = next
      if (!accepted) {
        if (started) options.stop()
        started = false
        lastPath = null
        previousLocation = ''
      } else pageview()
    },
    visit(path: string, title: string) {
      // Unknown routes, query strings, hashes and historical review pages are excluded.
      current = paths.has(path) ? { path, title: title.slice(0, 150) } : null
      if (!current && started) {
        options.stop()
        started = false
        lastPath = null
      }
      pageview()
    },
    event(name: AnalyticsEvent, values: AnalyticsParameters = {}) {
      if (!options.enabled || !accepted || !current || !started) return false
      const parameters = sanitizeAnalyticsEvent(name, values, options.projectIds)
      if (!parameters) return false
      options.send(['event', name, { send_to: options.id, page_location: `${ORIGIN}${current.path}`, ...parameters }])
      return true
    },
  }
}
