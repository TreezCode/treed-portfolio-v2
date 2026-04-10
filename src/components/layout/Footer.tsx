'use client'

import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/TreezCode',
    hoverColor: '#915eff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joey-kubalak-425032180/',
    hoverColor: '#00d4ff',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Email',
    href: 'mailto:your.email@example.com',
    hoverColor: '#ff6b9d',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-background-primary theme-transition">
      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(145, 94, 255, 0.4) 25%, rgba(0, 212, 255, 0.4) 75%, transparent)',
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Mobile Layout - Centered Stack */}
        <div className="flex flex-col items-center gap-6 lg:hidden">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center gap-3">
            <Logo variant="full" size={200} />
            <p className="text-text-tertiary text-xs tracking-wide theme-transition">
              Where Sacred Geometry Meets Modern Technology
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg border border-border-primary bg-surface-primary transition-all duration-300 hover:scale-110 theme-transition"
                style={{
                  ['--hover-color' as string]: link.hoverColor,
                }}
                aria-label={link.name}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = `${link.hoverColor}80`
                  el.style.backgroundColor = `${link.hoverColor}1a`
                  el.style.boxShadow = `0 0 20px ${link.hoverColor}30`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = ''
                  el.style.backgroundColor = ''
                  el.style.boxShadow = ''
                }}
              >
                <span
                  className="block text-text-secondary transition-colors duration-300 theme-transition"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.hoverColor
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = ''
                  }}
                >
                  {link.icon}
                </span>
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-text-tertiary text-xs theme-transition">
            © {currentYear} Build With Treez. All rights reserved.
          </p>
        </div>

        {/* Desktop Layout - 3 Column Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12 lg:items-start">
          {/* Left Column - Logo and Brand */}
          <div className="flex flex-col gap-4">
            <Logo variant="full" size={180} />
            <p className="text-text-tertiary text-sm leading-relaxed theme-transition">
              Where Sacred Geometry Meets Modern Technology
            </p>
          </div>

          {/* Center Column - Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider theme-transition">
              Navigate
            </h3>
            <nav className="flex flex-col gap-2">
              {[
                { name: 'Home', id: 'hero' },
                { name: 'About', id: 'about' },
                { name: 'Projects', id: 'projects' },
                { name: 'Technologies', id: 'tech' },
                { name: 'Contact', id: 'contact' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group text-text-secondary hover:text-text-primary transition-all duration-300 text-sm font-medium theme-transition cursor-pointer inline-flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-text-tertiary group-hover:bg-[#00d4ff] transition-colors duration-300" />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column - Social and Copyright */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="text-text-primary font-semibold text-sm uppercase tracking-wider theme-transition">
                Connect
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2.5 rounded-lg border border-border-primary bg-surface-primary transition-all duration-300 hover:scale-110 theme-transition"
                    style={{
                      ['--hover-color' as string]: link.hoverColor,
                    }}
                    aria-label={link.name}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = `${link.hoverColor}80`
                      el.style.backgroundColor = `${link.hoverColor}1a`
                      el.style.boxShadow = `0 0 20px ${link.hoverColor}30`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.borderColor = ''
                      el.style.backgroundColor = ''
                      el.style.boxShadow = ''
                    }}
                  >
                    <span
                      className="block text-text-secondary transition-colors duration-300 theme-transition"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = link.hoverColor
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = ''
                      }}
                    >
                      {link.icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright - Bottom of right column */}
            <div className="mt-auto pt-4 border-t border-border-secondary">
              <p className="text-text-tertiary text-xs theme-transition">
                © {currentYear} Build With Treez.
                <br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
