'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import {
  ANALYTICS_CONSENT_KEY,
  ANALYTICS_PREFERENCES_EVENT,
  initializeAnalytics,
  saveAnalyticsConsent,
  savedAnalyticsConsent,
  trackAnalytics,
  type AnalyticsConsent,
} from '@/lib/analytics'
import './analytics.css'

const CHOICE_EVENT = 'treez:analytics-choice'
const subscribeConsent = (callback: () => void) => {
  window.addEventListener(CHOICE_EVENT, callback)
  window.addEventListener('storage', callback)
  return () => {
    window.removeEventListener(CHOICE_EVENT, callback)
    window.removeEventListener('storage', callback)
  }
}
let currentTabChoice: AnalyticsConsent = null
const consentSnapshot = () => currentTabChoice ?? savedAnalyticsConsent()
const serverConsent = () => null

export function AnalyticsPreferencesButton() {
  return <button className="analytics-preferences-button" type="button" onClick={() => window.dispatchEvent(new Event(ANALYTICS_PREFERENCES_EVENT))}>Analytics preferences</button>
}

export function PortfolioAnalytics({ projectIds }: { projectIds: string[] }) {
  const pathname = usePathname()
  const consent = useSyncExternalStore(subscribeConsent, consentSnapshot, serverConsent)
  const [preferencesOpen, setPreferencesOpen] = useState(false)
  const panel = useRef<HTMLElement>(null)
  const returnFocus = useRef<HTMLElement | null>(null)
  const configured = /^G-[A-Z0-9]+$/.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? '')

  useEffect(() => {
    const analytics = initializeAnalytics(projectIds)
    analytics.consent(consent)
    analytics.visit(pathname, document.title)
  }, [pathname, projectIds, consent])

  useEffect(() => {
    const open = () => {
      returnFocus.current = document.activeElement as HTMLElement | null
      setPreferencesOpen(true)
      requestAnimationFrame(() => panel.current?.focus())
    }
    const storage = (event: StorageEvent) => {
      if (event.key === ANALYTICS_CONSENT_KEY || event.key === null) {
        currentTabChoice = null
        initializeAnalytics(projectIds).consent(savedAnalyticsConsent())
        window.dispatchEvent(new Event(CHOICE_EVENT))
      }
    }
    window.addEventListener(ANALYTICS_PREFERENCES_EVENT, open)
    window.addEventListener('storage', storage)
    return () => {
      window.removeEventListener(ANALYTICS_PREFERENCES_EVENT, open)
      window.removeEventListener('storage', storage)
    }
  }, [projectIds])

  useEffect(() => {
    const click = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!link) return
      if (link.pathname === '/joey-kubalak-resume.pdf' && link.origin === location.origin) trackAnalytics('resume_click')
      else if (link.protocol === 'mailto:') trackAnalytics('email_click')
      else if (link.dataset.analyticsEvent === 'project_link_click') {
        trackAnalytics('project_link_click', { project_id: link.dataset.projectId ?? '', destination_domain: link.hostname, link_kind: link.dataset.linkKind ?? '' })
      }
    }
    document.addEventListener('click', click)
    return () => document.removeEventListener('click', click)
  }, [])

  function choose(value: 'accepted' | 'declined') {
    currentTabChoice = value
    saveAnalyticsConsent(value)
    window.dispatchEvent(new Event(CHOICE_EVENT))
    setPreferencesOpen(false)
    returnFocus.current?.focus()
    returnFocus.current = null
  }

  if (!preferencesOpen && (consent !== null || !configured)) return null

  return (
    <section className="analytics-notice" aria-labelledby="analytics-notice-title" ref={panel} tabIndex={-1}>
      <div>
        <h2 id="analytics-notice-title">A little insight, with your permission.</h2>
        <p>Optional analytics help me understand which projects and experiments people explore. Your choice won’t affect the experience. <Link href="/privacy">Privacy details</Link></p>
      </div>
      <div className="analytics-notice-actions">
        <button type="button" onClick={() => choose('declined')}>No analytics</button>
        <button type="button" onClick={() => choose('accepted')}>Allow analytics</button>
      </div>
    </section>
  )
}
