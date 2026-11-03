import {
  ANALYTICS_CONSENT_KEY,
  campaignParameters,
  canCollectAnalytics,
  createAnalyticsSession,
  readAnalyticsConsent,
  type AnalyticsConsent,
  type AnalyticsEvent,
  type AnalyticsParameters,
} from './analytics-policy'

export { ANALYTICS_CONSENT_KEY, readAnalyticsConsent }
export type { AnalyticsConsent }
type Session = ReturnType<typeof createAnalyticsSession>
type AnalyticsWindow = Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void } & Record<`ga-disable-${string}`, boolean>
let session: Session | null = null
let scriptStarted = false
export const ANALYTICS_PREFERENCES_EVENT = 'treez:analytics-preferences'

function clearAnalyticsCookies() {
  for (const item of document.cookie.split(';')) {
    const name = item.trim().split('=')[0]
    if (name !== '_ga' && !name.startsWith('_ga_')) continue
    for (const domain of ['', '; domain=buildwithtreez.com', '; domain=.buildwithtreez.com']) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax; Secure`
    }
  }
}

export function initializeAnalytics(projectIds: string[]) {
  if (session) return session
  const id = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''
  const enabled = canCollectAnalytics(id, process.env.NEXT_PUBLIC_ANALYTICS_CONTEXT ?? '', location.hostname)
  const browser = window as unknown as AnalyticsWindow
  session = createAnalyticsSession({
    id, enabled, projectIds,
    campaign: campaignParameters(location.search),
    referrer: document.referrer,
    start(configuration) {
      browser[`ga-disable-${id}`] = false
      browser.dataLayer ??= []
      browser.gtag ??= function () {
        // Google tags consume argument objects in the dataLayer command queue.
        // eslint-disable-next-line prefer-rest-params
        browser.dataLayer!.push(arguments)
      }
      browser.gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' })
      browser.gtag('js', new Date())
      browser.gtag('config', id, configuration)
      if (!scriptStarted) {
        scriptStarted = true
        const script = document.createElement('script')
        script.id = 'portfolio-google-analytics'
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`
        document.head.appendChild(script)
      }
    },
    send(command) { browser.gtag?.(...command) },
    stop() {
      // The official opt-out flag also stops the loaded tag's automatic engagement events.
      browser[`ga-disable-${id}`] = true
      if (browser.dataLayer) browser.dataLayer.length = 0
      clearAnalyticsCookies()
    },
  })
  return session
}

export function trackAnalytics(name: AnalyticsEvent, parameters: AnalyticsParameters = {}) {
  return session?.event(name, parameters) ?? false
}

export function savedAnalyticsConsent(): AnalyticsConsent {
  try { return readAnalyticsConsent(localStorage.getItem(ANALYTICS_CONSENT_KEY)) }
  catch { return null }
}

export function saveAnalyticsConsent(value: Exclude<AnalyticsConsent, null>) {
  try { localStorage.setItem(ANALYTICS_CONSENT_KEY, value) } catch { /* This tab's choice still works. */ }
  session?.consent(value)
}
