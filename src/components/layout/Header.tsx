'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import { Logo } from '@/components/ui/Logo'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navigation = [
  { id: 'work', title: 'Work', number: '01' },
  { id: 'approach', title: 'Approach', number: '02' },
  { id: 'experience', title: 'Experience', number: '03' },
  { id: 'contact', title: 'Contact', number: '04' },
] as const

const professionalLinks = [
  { label: 'GitHub', href: 'https://github.com/TreezCode' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/joey-kubalak' },
  { label: 'Email', href: 'mailto:jkubalak.dev@gmail.com' },
] as const

const desktopNavigationQuery = '(min-width: 50rem)'
const easeOutExpo = [0.16, 1, 0.3, 1] as const

const flowerCenters: [number, number][] = [[200, 200]]

for (let index = 0; index < 6; index += 1) {
  const angle = (Math.PI / 3) * index - Math.PI / 2
  flowerCenters.push([200 + 40 * Math.cos(angle), 200 + 40 * Math.sin(angle)])
}

for (let index = 0; index < 6; index += 1) {
  const angle = (Math.PI / 3) * index - Math.PI / 2
  flowerCenters.push([200 + 80 * Math.cos(angle), 200 + 80 * Math.sin(angle)])
}

for (let index = 0; index < 6; index += 1) {
  const firstAngle = (Math.PI / 3) * index - Math.PI / 2
  const secondAngle = (Math.PI / 3) * (index + 1) - Math.PI / 2
  flowerCenters.push([
    200 + 40 * (Math.cos(firstAngle) + Math.cos(secondAngle)),
    200 + 40 * (Math.sin(firstAngle) + Math.sin(secondAngle)),
  ])
}

function NavigationGeometry() {
  return (
    <div className="mobile-navigation__geometry-wrap" aria-hidden="true">
      <svg className="mobile-navigation__geometry" viewBox="0 0 400 400" role="presentation">
        <defs>
          <radialGradient id="mobile-navigation-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.62" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="mobile-navigation-mask">
            <rect width="400" height="400" fill="url(#mobile-navigation-fade)" />
          </mask>
        </defs>
        <g fill="none" stroke="currentColor" mask="url(#mobile-navigation-mask)">
          {flowerCenters.map(([x, y], index) => (
            <circle key={`${x}-${y}-${index}`} cx={x} cy={y} r="40" strokeWidth="0.62" />
          ))}
          <circle cx="200" cy="200" r="120" strokeWidth="0.42" />
          <path d="m200 80 104 180H96L200 80Z" strokeWidth="0.5" />
          <path d="m200 320 104-180H96l104 180Z" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  )
}

function MenuGlyph() {
  return (
    <span className="site-header__menu-glyph" aria-hidden="true">
      <span className="site-header__menu-glyph-line site-header__menu-glyph-line--upper" />
      <span className="site-header__menu-glyph-point" />
      <span className="site-header__menu-glyph-line site-header__menu-glyph-line--lower" />
    </span>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const headerRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { minimalUI } = usePerfFlags()

  const closeMenuAndRestoreFocus = useCallback(() => {
    if (headerRef.current) headerRef.current.inert = false
    if (menuRef.current) menuRef.current.inert = true
    setMenuOpen(false)
    window.requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (typeof window.IntersectionObserver === 'undefined') {
      return
    }

    const observers: IntersectionObserver[] = []

    for (const section of [{ id: 'hero' }, ...navigation]) {
      const element = document.getElementById(section.id)
      if (!element) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id === 'hero' ? '' : section.id)
          }
        },
        { rootMargin: '-34% 0px -58% 0px' }
      )
      observer.observe(element)
      observers.push(observer)
    }

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    if (headerRef.current) headerRef.current.inert = menuOpen
    if (menuRef.current) menuRef.current.inert = !menuOpen

    const backgroundElements = [
      document.getElementById('skip-to-content'),
      document.getElementById('main-content'),
      document.getElementById('portfolio-footer-shell'),
    ].filter((element): element is HTMLElement => element instanceof HTMLElement)

    backgroundElements.forEach((element) => {
      element.inert = menuOpen
    })

    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

    closeButtonRef.current?.focus({ preventScroll: true })
    const focusCloseButton = window.requestAnimationFrame(() => {
      if (!menuRef.current?.contains(document.activeElement)) {
        closeButtonRef.current?.focus({ preventScroll: true })
      }
    })
    const focusFallback = window.setTimeout(() => {
      if (!menuRef.current?.contains(document.activeElement)) {
        closeButtonRef.current?.focus({ preventScroll: true })
      }
    }, 80)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeMenuAndRestoreFocus()
        return
      }

      if (event.key !== 'Tab' || !menuRef.current) return

      const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(focusableSelector))
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    const onFocusIn = (event: FocusEvent) => {
      if (menuRef.current?.contains(event.target as Node)) return
      closeButtonRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('focusin', onFocusIn)

    return () => {
      window.cancelAnimationFrame(focusCloseButton)
      window.clearTimeout(focusFallback)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('focusin', onFocusIn)
      document.body.style.overflow = previousOverflow
      backgroundElements.forEach((element) => {
        element.inert = false
      })
    }
  }, [closeMenuAndRestoreFocus, menuOpen])

  useEffect(() => {
    const desktopQuery = window.matchMedia(desktopNavigationQuery)
    const closeAtDesktop = (event: MediaQueryListEvent) => {
      if (!event.matches) return

      if (headerRef.current) headerRef.current.inert = false
      setMenuOpen(false)
    }

    desktopQuery.addEventListener('change', closeAtDesktop)
    return () => desktopQuery.removeEventListener('change', closeAtDesktop)
  }, [])

  return (
    <>
      <header
        ref={headerRef}
        aria-hidden={menuOpen ? true : undefined}
        className={`site-header${scrolled ? ' site-header--solid' : ''}${
          minimalUI ? ' site-header--minimal' : ''
        }`}
      >
        <nav className="portfolio-container site-header__nav" aria-label="Primary navigation">
          <a className="site-header__brand" href="#hero" aria-label="Joey Kubalak portfolio home">
            <Logo variant="icon" size={26} priority />
            <span>Joey Kubalak</span>
          </a>

          <ul className="site-header__links">
            {navigation.map((link) => {
              const isActive = activeSection === link.id

              return (
                <li key={link.id}>
                  <a href={`#${link.id}`} aria-current={isActive ? 'location' : undefined}>
                    <span aria-hidden="true">{link.number}</span>
                    {link.title}
                    {isActive && (
                      <motion.i
                        className="site-header__active-indicator"
                        layoutId="primary-navigation-active"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.34, ease: easeOutExpo }
                        }
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="site-header__actions">
            <a className="site-header__resume" href="/joey-kubalak-resume.pdf" download>
              Resume
            </a>
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              className="site-header__menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <MenuGlyph />
            </button>
          </div>
        </nav>
      </header>

      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`mobile-navigation${menuOpen ? ' mobile-navigation--open' : ''}`}
        role="dialog"
        aria-modal={menuOpen ? true : undefined}
        aria-hidden={!menuOpen}
        aria-label="Navigation menu"
      >
        <div className="mobile-navigation__topbar">
          <a
            className="site-header__brand mobile-navigation__brand"
            href="#hero"
            onClick={closeMenuAndRestoreFocus}
            aria-label="Joey Kubalak portfolio home"
          >
            <Logo variant="icon" size={26} />
            <span>Joey Kubalak</span>
          </a>

          <div className="mobile-navigation__topbar-actions">
            <ThemeToggle />
            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-navigation__close"
              onClick={closeMenuAndRestoreFocus}
              aria-label="Close navigation menu"
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </div>

        <NavigationGeometry />

        <div className="portfolio-container mobile-navigation__body">
          <nav aria-label="Mobile navigation">
            <ul>
              {navigation.map((link, index) => {
                const isActive = activeSection === link.id

                return (
                  <motion.li
                    key={link.id}
                    initial={false}
                    animate={menuOpen ? 'open' : 'closed'}
                    variants={{
                      open: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.52,
                          delay: prefersReducedMotion ? 0 : 0.08 + index * 0.06,
                          ease: easeOutExpo,
                        },
                      },
                      closed: {
                        opacity: 0,
                        x: 14,
                        transition: {
                          duration: prefersReducedMotion ? 0 : 0.2,
                          delay: prefersReducedMotion ? 0 : (navigation.length - index - 1) * 0.025,
                          ease: easeOutExpo,
                        },
                      },
                    }}
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={closeMenuAndRestoreFocus}
                      aria-current={isActive ? 'location' : undefined}
                    >
                      <span className="mobile-navigation__number" aria-hidden="true">
                        {link.number}
                      </span>
                      <span className="mobile-navigation__marker" aria-hidden="true" />
                      <span className="mobile-navigation__title">{link.title}</span>
                    </a>
                  </motion.li>
                )
              })}
            </ul>
          </nav>

          <motion.div
            className="mobile-navigation__footer"
            initial={false}
            animate={menuOpen ? 'open' : 'closed'}
            variants={{
              open: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.46,
                  delay: prefersReducedMotion ? 0 : 0.28,
                  ease: easeOutExpo,
                },
              },
              closed: {
                opacity: 0,
                y: 10,
                transition: {
                  duration: prefersReducedMotion ? 0 : 0.18,
                  ease: easeOutExpo,
                },
              },
            }}
          >
            <a
              className="mobile-navigation__resume"
              href="/joey-kubalak-resume.pdf"
              download
              onClick={closeMenuAndRestoreFocus}
            >
              Download resume
            </a>
            <div className="mobile-navigation__professional-links">
              {professionalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                  onClick={closeMenuAndRestoreFocus}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
