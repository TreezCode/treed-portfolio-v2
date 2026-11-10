'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export function TieredHeader({ children }: { children: ReactNode }) {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const header = headerRef.current
    const shell = header?.closest<HTMLElement>('.folio')
    const upper = header?.querySelector<HTMLElement>('.folio-header__identity')
    const primary = header?.querySelector<HTMLElement>('.folio-header__primary')
    if (!header || !shell || !upper || !primary) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const scrollPosition = () =>
      Math.max(
        0,
        Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight)
      )
    let lastY = scrollPosition()
    let travel = 0
    let frame = 0
    let fullHeight = header.offsetHeight
    let pressed = false

    function resetTravel() {
      lastY = scrollPosition()
      travel = 0
    }

    const measure = () => {
      fullHeight = header.offsetHeight
      shell.style.setProperty('--folio-upper-height', `${upper.offsetHeight}px`)
      shell.style.setProperty('--folio-primary-height', `${primary.offsetHeight}px`)
      resetTravel()
    }

    const restore = () => {
      measure()
      header.toggleAttribute('data-compact', !reduced.matches && lastY > fullHeight + 24)
    }

    const update = () => {
      frame = 0
      const y = scrollPosition()
      const delta = y - lastY
      lastY = y
      if (reduced.matches || y <= 12) {
        header.removeAttribute('data-compact')
        travel = 0
        return
      }
      if (pressed || header.querySelector(':focus-visible')) {
        travel = 0
        return
      }
      if (!delta) return
      // Restart the distance count on reversal so trackpad corrections do not flicker.
      travel = Math.sign(delta) === Math.sign(travel) ? travel + delta : delta
      if (travel >= 24 && y > fullHeight + 24) header.setAttribute('data-compact', '')
      if (travel <= -10) header.removeAttribute('data-compact')
    }

    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const focus = (event: FocusEvent) => {
      if (upper.contains(event.target as Node) && header.hasAttribute('data-compact')) {
        header.removeAttribute('data-compact')
        // Focusing an offscreen link can start a native smooth scroll. The
        // sticky row is now visible, so keep the reading position it had before focus.
        window.scrollTo({ top: lastY, behavior: 'instant' })
      }
      resetTravel()
    }
    const hold = () => {
      pressed = true
    }
    const release = () => {
      pressed = false
    }
    const observer = new ResizeObserver(measure)
    observer.observe(upper)
    observer.observe(primary)
    restore()
    window.addEventListener('scroll', scroll, { passive: true })
    window.addEventListener('pageshow', restore)
    reduced.addEventListener('change', restore)
    header.addEventListener('focusin', focus)
    header.addEventListener('pointerdown', hold)
    window.addEventListener('pointerup', release)
    window.addEventListener('pointercancel', release)
    window.addEventListener('blur', release)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scroll)
      window.removeEventListener('pageshow', restore)
      reduced.removeEventListener('change', restore)
      header.removeEventListener('focusin', focus)
      header.removeEventListener('pointerdown', hold)
      window.removeEventListener('pointerup', release)
      window.removeEventListener('pointercancel', release)
      window.removeEventListener('blur', release)
      shell.style.removeProperty('--folio-upper-height')
      shell.style.removeProperty('--folio-primary-height')
    }
  }, [])

  return (
    <header ref={headerRef} className="folio-header">
      {children}
    </header>
  )
}
