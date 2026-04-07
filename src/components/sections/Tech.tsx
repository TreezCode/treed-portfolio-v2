'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { technologies } from '@/data'
import dynamic from 'next/dynamic'

// Dynamically import 3D scene to avoid SSR issues
const TechScene = dynamic(
  () => import('@/components/three/TechScene').then((mod) => mod.TechScene),
  { ssr: false }
)

export function Tech() {
  const [isCanvasActive, setIsCanvasActive] = useState(false)
  const canvasWrapperRef = useRef<HTMLDivElement>(null)

  const deactivateCanvas = useCallback(() => {
    setIsCanvasActive(false)
  }, [])

  useEffect(() => {
    if (!isCanvasActive) return

    const handleClickOutside = (e: MouseEvent) => {
      if (canvasWrapperRef.current && !canvasWrapperRef.current.contains(e.target as Node)) {
        deactivateCanvas()
      }
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') deactivateCanvas()
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isCanvasActive, deactivateCanvas])

  const categories = {
    frontend: { name: 'Frontend', color: '#915eff', shape: 'Tetrahedron' },
    backend: { name: 'Backend', color: '#00d4ff', shape: 'Cube' },
    database: { name: 'Database', color: '#ff6b9d', shape: 'Octahedron' },
    tools: { name: 'Tools', color: '#915eff', shape: 'Dodecahedron' },
  }

  return (
    <section id="tech" aria-label="Technologies" className="relative py-12 sm:py-24 bg-background-primary overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
                What Tools I Build With
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Technologies</h2>
              <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
                Interactive 3D showcase using Platonic Solids - the sacred geometry of technology
              </p>
            </div>
          </motion.div>

          {/* Legend - Sacred Geometry Shapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-8"
          >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, cat]) => (
              <div
                key={key}
                className="flex items-center gap-3 p-3 rounded-lg bg-background-secondary/30 backdrop-blur-sm border border-white/5"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: cat.color, boxShadow: `0 0 10px ${cat.color}80` }}
                />
                <div>
                  <p className="text-sm font-semibold text-white">{cat.name}</p>
                  <p className="text-xs text-text-tertiary">{cat.shape}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        </div>

        {/* 3D Scene - Full Width, Seamless Edges */}
        <motion.div
          ref={canvasWrapperRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative w-full h-[550px] sm:h-[650px] lg:h-[750px] -my-8 cursor-pointer"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
          onClick={() => { if (!isCanvasActive) setIsCanvasActive(true) }}
        >
          <TechScene technologies={technologies} onTechClick={() => {}} isActive={isCanvasActive} />

          {/* Click-to-interact overlay */}
          {!isCanvasActive && (
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-5 py-2.5 rounded-full bg-black/50 border border-white/10 text-sm text-white/70"
              >
                Click to interact with 3D scene
              </motion.div>
            </div>
          )}
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Interaction Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-6 text-sm text-text-tertiary"
          >
            🖱️ Drag to rotate • 🔍 Scroll to zoom (click scene first) • 👆 Click shapes to learn more
          </motion.p>

        {/* Technology List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {technologies.map((tech) => {
              const config = categories[tech.category as keyof typeof categories]
              return (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 p-3 rounded-lg bg-background-secondary/20 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: config.color, boxShadow: `0 0 8px ${config.color}60` }}
                  />
                  <p className="text-sm text-text-secondary">{tech.name}</p>
                </div>
              )
            })}
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}
