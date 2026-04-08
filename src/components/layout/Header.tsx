'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

// Desktop nav — all sections
const desktopLinks = [
  { id: 'about', title: 'About', num: '01' },
  { id: 'experience', title: 'Experience', num: '02' },
  { id: 'tech', title: 'Tech', num: '03' },
  { id: 'work', title: 'Projects', num: '04' },
  { id: 'contact', title: 'Contact', num: '05' },
]

// Mobile nav — every section
const mobileLinks = [
  { id: 'about', title: 'About', num: '01' },
  { id: 'experience', title: 'Experience', num: '02' },
  { id: 'tech', title: 'Tech', num: '03' },
  { id: 'work', title: 'Projects', num: '04' },
  { id: 'contact', title: 'Contact', num: '05' },
]

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/TreezCode',
    color: '#915eff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joey-kubalak-425032180/',
    color: '#00d4ff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/yourusername',
    color: '#ff6b9d',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    color: '#915eff',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

// Flower of Life SVG — sacred geometry background for mobile menu
function FlowerOfLifeBg() {
  const r = 40
  const cx = 200
  const cy = 200
  // Center + 6 petals + 6 outer petals = 13 circles (Fruit of Life core)
  const centers: [number, number][] = [[cx, cy]]
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    centers.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)])
  }
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i - Math.PI / 2
    centers.push([cx + r * 2 * Math.cos(angle), cy + r * 2 * Math.sin(angle)])
  }
  // Extra ring for fuller pattern
  for (let i = 0; i < 6; i++) {
    const a1 = (Math.PI / 3) * i - Math.PI / 2
    const a2 = (Math.PI / 3) * (i + 1) - Math.PI / 2
    centers.push([
      cx + r * (Math.cos(a1) + Math.cos(a2)),
      cy + r * (Math.sin(a1) + Math.sin(a2)),
    ])
  }

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 30 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <motion.svg
        viewBox="0 0 400 400"
        className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <linearGradient id="flowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#915eff" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#ff6b9d" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="flowerFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="fadeMask">
            <rect width="400" height="400" fill="url(#flowerFade)" />
          </mask>
        </defs>
        <g mask="url(#fadeMask)">
          {centers.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={r}
              fill="none"
              stroke="url(#flowerGrad)"
              strokeWidth="0.5"
            />
          ))}
          {/* Outer bounding circle */}
          <circle cx={cx} cy={cy} r={r * 3} fill="none" stroke="url(#flowerGrad)" strokeWidth="0.3" />
        </g>
      </motion.svg>
    </motion.div>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  // PERF TESTING: minimal-ui removes backdrop-blur from fixed header
  const { minimalUI } = usePerfFlags()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'experience', 'tech', 'work', 'contact']
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id === 'hero' ? '' : id)
          }
        },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : 'auto'
      return next
    })
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    document.body.style.overflow = 'auto'
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-60 transition-all duration-500',
          mobileMenuOpen
            ? 'bg-[#0a0a0f]'
            : scrolled
              ? `bg-[#0a0a0f]/95${minimalUI ? '' : ' backdrop-blur-xl'}`
              : 'bg-transparent'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Bottom border gradient — visible on scroll */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500',
            scrolled && !mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.5) 25%, rgba(0, 212, 255, 0.5) 75%, transparent)',
          }}
        />

        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href="#"
              className="relative z-60 text-xl sm:text-2xl font-bold bg-linear-to-r from-[#915eff] to-[#00d4ff] bg-clip-text text-transparent hover:from-[#00d4ff] hover:to-[#ff6b9d] transition-all duration-300"
              onClick={(e) => {
                e.preventDefault()
                closeMobileMenu()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              JK
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-0.5">
              {desktopLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className={cn(
                        'group relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                        isActive
                          ? 'text-white'
                          : 'text-gray-400 hover:text-white'
                      )}
                    >
                      {/* Number */}
                      <span
                        className={cn(
                          'text-[10px] font-mono transition-colors duration-300',
                          isActive ? 'text-[#00d4ff]' : 'text-gray-600 group-hover:text-gray-400'
                        )}
                      >
                        {link.num}
                      </span>
                      {link.title}
                      {/* Active underline indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute -bottom-px left-3 right-3 h-0.5 rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, #915eff, #00d4ff)',
                          }}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                )
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden relative z-60 p-2 rounded-lg border border-white/10 hover:border-[#915eff]/50 bg-white/5 hover:bg-[#915eff]/10 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} className="text-[#ff6b9d]" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} className="text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu — rendered outside header to avoid transform stacking context */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-55 pt-16 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#0a0a0f]" />

            {/* Sacred Geometry Background — Flower of Life */}
            <FlowerOfLifeBg />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-between h-full py-8">
              {/* Section Links */}
              <nav className="flex flex-col items-center gap-5 mt-4">
                {mobileLinks.map((link, index) => {
                  const isActive = activeSection === link.id
                  return (
                    <motion.a
                      key={link.id}
                      href={`#${link.id}`}
                      className="group flex items-center gap-4"
                      onClick={(e) => {
                        e.preventDefault()
                        closeMobileMenu()
                        setTimeout(() => {
                          document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                        }, 100)
                      }}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
                    >
                      {/* Number */}
                      <span
                        className={cn(
                          'text-xs font-mono w-6 text-right transition-colors duration-300',
                          isActive ? 'text-[#00d4ff]' : 'text-gray-600 group-hover:text-gray-400'
                        )}
                      >
                        {link.num}
                      </span>
                      {/* Dot separator */}
                      <span
                        className={cn(
                          'w-1.5 h-1.5 rounded-full transition-all duration-300',
                          isActive
                            ? 'bg-[#915eff] shadow-[0_0_8px_rgba(145,94,255,0.6)]'
                            : 'bg-gray-700 group-hover:bg-gray-500'
                        )}
                      />
                      {/* Title */}
                      <span
                        className={cn(
                          'text-2xl sm:text-3xl font-semibold transition-all duration-300',
                          isActive
                            ? 'bg-linear-to-r from-[#915eff] to-[#00d4ff] bg-clip-text text-transparent'
                            : 'text-gray-300 group-hover:text-white'
                        )}
                      >
                        {link.title}
                      </span>
                    </motion.a>
                  )
                })}
              </nav>

              {/* Bottom area: separator + socials + CTA */}
              <div className="flex flex-col items-center gap-6">
                {/* Gradient separator */}
                <motion.div
                  className="w-24 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.5), rgba(0, 212, 255, 0.5), transparent)',
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                />

                {/* Social Links */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-2.5 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:scale-110"
                      aria-label={link.name}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = `${link.color}80`
                        el.style.backgroundColor = `${link.color}1a`
                        el.style.boxShadow = `0 0 20px ${link.color}30`
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget
                        el.style.borderColor = ''
                        el.style.backgroundColor = ''
                        el.style.boxShadow = ''
                      }}
                    >
                      <span
                        className="block text-white/60 transition-colors duration-300"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = link.color
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = ''
                        }}
                      >
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    closeMobileMenu()
                    setTimeout(() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }}
                  className="group relative px-8 py-3 rounded-xl font-semibold text-white text-sm bg-linear-to-r from-[#915eff] to-[#ff6b9d] hover:shadow-lg hover:shadow-[#915eff]/30 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-linear-to-r from-[#ff6b9d] to-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
