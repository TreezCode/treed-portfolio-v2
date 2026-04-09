'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { useTyped } from '@/hooks/useTyped'
import { heroContent } from '@/data/hero'
import { SacredGeometry } from '@/components/backgrounds/SacredGeometry'
import { About, Experience, Tech, Projects, Contact } from '@/components/sections'
import { usePerfFlags } from '@/components/perf/PerfProvider'

// Dynamically import 3D scene to avoid SSR issues
// Loading placeholder prevents layout shift and improves perceived performance
const SacredGeometryScene = dynamic(
  () => import('@/components/three/SacredGeometryScene').then((mod) => mod.SacredGeometryScene),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-transparent" aria-label="Loading 3D scene">
        {/* Subtle loading indicator - sacred geometry themed */}
        <div className="flex items-center justify-center w-full h-full">
          <div className="w-16 h-16 border-2 border-[#915eff]/20 border-t-[#915eff] rounded-full animate-spin" />
        </div>
      </div>
    )
  }
)

export default function Home() {
  const { headTextRef, subTextRef } = useTyped(heroContent)
  // PERF TESTING: read active perf mode flags from query param
  const perf = usePerfFlags()
  // PERF TESTING: minimal-ui strips backdrop-blur and mix-blend-mode over WebGL
  // PERF TESTING: reduced-motion near-zeros Framer Motion durations
  const motionDuration = perf.reducedMotion ? 0.01 : undefined

  return (
    <div className="relative">
      {/* Hero Section */}
      <section id="hero" aria-label="Hero" className="relative w-full h-screen overflow-hidden">
        {/* Sacred Geometry Background */}
        {/* PERF TESTING: minimal-ui disables mix-blend-mode canvas (forces compositor layer) */}
        <div className="absolute inset-0 bg-linear-to-b from-background-primary via-background-secondary to-background-primary">
          {!perf.minimalUI && <SacredGeometry />}
        </div>

        {/* 3D Sacred Geometry Scene */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: motionDuration ?? 1.5, delay: perf.reducedMotion ? 0 : 0.5 }}
          className="absolute inset-0 z-10"
        >
          {/* PERF TESTING: pass active perf flags to Hero canvas */}
        <SacredGeometryScene perfFlags={perf} className="w-full h-full" />
        </motion.div>

        {/* Hero Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 top-[120px] sm:top-[150px] max-w-7xl mx-auto px-6 sm:px-16 flex flex-row items-start gap-5 z-10 pointer-events-none"
        >
          {/* Decorative Line */}
          <div className="flex flex-col justify-center items-center mt-2">
            <div className="w-5 h-5 rounded-full bg-accent-primary" />
            <div className="w-1 sm:h-80 h-40 bg-linear-to-b from-accent-primary to-transparent" />
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3 max-w-2xl">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#915eff]/20 to-[#00d4ff]/20 border border-[#915eff]/30 w-fit self-start${perf.minimalUI ? '' : ' backdrop-blur-sm'}`}
            >
              <div className="relative">
                <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2 h-2 bg-[#00d4ff] rounded-full animate-ping" />
              </div>
              <span className="text-sm font-medium text-[#00d4ff]">Available for Hire</span>
            </motion.div>

            <div className="typed-container min-h-[60px] sm:min-h-[80px] z-10">
              <h1 className="text-5xl sm:text-7xl font-bold text-white leading-tight">
                <span ref={headTextRef} />
              </h1>
            </div>
            <div className="typed-container min-h-[128px] sm:min-h-[136px] z-10">
              <p className="text-lg sm:text-xl text-text-secondary mt-2 leading-relaxed">
                <span ref={subTextRef} />
              </p>
            </div>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4 mt-6 pointer-events-auto relative z-50"
            >
              {/* Primary CTA */}
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-[#915eff] to-[#ff6b9d] rounded-xl font-semibold text-white shadow-lg hover:shadow-[#915eff]/50 transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-linear-to-r from-[#ff6b9d] to-[#915eff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              {/* Secondary CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#00d4ff] rounded-xl font-semibold text-[#00d4ff] hover:bg-[#00d4ff]/10 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00d4ff]/30 bg-background-primary/80${perf.minimalUI ? '' : ' backdrop-blur-sm'}`}
              >
                Let&apos;s Connect
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="flex gap-4 mt-2 pointer-events-auto"
            >
              {/* GitHub */}
              <a
                href="https://github.com/TreezCode"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg border border-white/10 hover:border-[#915eff] bg-white/5 hover:bg-[#915eff]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#915eff]/30"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#915eff] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/joey-kubalak-425032180/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg border border-white/10 hover:border-[#00d4ff] bg-white/5 hover:bg-[#00d4ff]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00d4ff]/30"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#00d4ff] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a
                href="https://x.com/buildwithtreez"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-lg border border-white/10 hover:border-[#ff6b9d] bg-white/5 hover:bg-[#ff6b9d]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#ff6b9d]/30"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#ff6b9d] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* Email */}
              <a
                href="mailto:your.email@example.com"
                className="group p-3 rounded-lg border border-white/10 hover:border-[#915eff] bg-white/5 hover:bg-[#915eff]/10 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#915eff]/30"
                aria-label="Email"
              >
                <svg className="w-5 h-5 text-white/70 group-hover:text-[#915eff] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </motion.div>
          </div>
        </motion.div>

      </section>

      {/* About Section */}
      <About />

      {/* Experience Section */}
      <Experience />

      {/* Tech Section */}
      <Tech />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </div>
  )
}
