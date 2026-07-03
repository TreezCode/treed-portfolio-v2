'use client'

import { motion } from 'framer-motion'
import { technologies } from '@/data'
import dynamic from 'next/dynamic'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

// Dynamically import 3D scene to avoid SSR issues
// Loading placeholder prevents layout shift and improves perceived performance
const TechScene = dynamic(
  () => import('@/components/three/TechScene').then((mod) => mod.TechScene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[550px] sm:h-[650px] lg:h-[750px] bg-transparent flex items-center justify-center" aria-label="Loading 3D technology scene">
        <div className="w-12 h-12 border-2 border-accent-primary/20 border-t-accent-primary rounded-full animate-spin" />
      </div>
    )
  }
)

const categories = {
  frontend: { name: 'Frontend', shape: 'Tetrahedron' },
  backend: { name: 'Backend', shape: 'Cube' },
  database: { name: 'Database', shape: 'Octahedron' },
  tools: { name: 'Tools & Security', shape: 'Dodecahedron' },
} as const

// Scene-color keys: these identify WebGL materials in the scene above,
// the one place scene colors may be referenced outside the canvas.
const sceneColors: Record<keyof typeof categories, string> = {
  frontend: '#915eff',
  backend: '#00d4ff',
  database: '#ff6b9d',
  tools: '#915eff',
}

export function Tech() {
  // Lazy load 3D scene when approaching viewport (300px before)
  const { ref: observerRef, isIntersecting } = useIntersectionObserver({
    rootMargin: '300px',
    threshold: 0,
    triggerOnce: true,
  })

  const coreTech = technologies.filter((t) => t.core)
  const secondaryTech = technologies.filter((t) => !t.core)
  const secondaryByCategory = (['frontend', 'backend', 'database', 'tools'] as const)
    .map((cat) => ({
      category: cat,
      items: secondaryTech.filter((t) => t.category === cat),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <section id="tech" aria-label="Technologies" className="relative py-16 sm:py-28 bg-background-primary overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mb-10 sm:mb-14"
          >
            <span className="text-label text-text-tertiary block mb-3">03</span>
            <h2 className="text-headline text-text-primary theme-transition mb-4">Technologies</h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              Each platonic solid below is a live WebGL object; drag to rotate the field,
              tap a shape to see where that tool fits in my stack.
            </p>
          </motion.div>

          {/* Legend - keys to the WebGL scene shapes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap gap-x-8 gap-y-3 mb-4"
          >
            {(Object.keys(categories) as Array<keyof typeof categories>).map((key) => (
              <div key={key} className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: sceneColors[key] }}
                  aria-hidden
                />
                <span className="text-sm font-medium text-text-primary theme-transition">{categories[key].name}</span>
                <span className="text-label text-text-tertiary">{categories[key].shape}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Scene - Full Width, Seamless Edges */}
        <motion.div
          ref={observerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full h-[550px] sm:h-[650px] lg:h-[750px] -my-8 cursor-grab"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          {/* Only load 3D scene when approaching viewport */}
          {isIntersecting && (
            <TechScene technologies={coreTech} onTechClick={() => {}} />
          )}
        </motion.div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Core stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 max-w-4xl"
          >
            <h3 className="text-title text-text-primary theme-transition mb-4">Core stack</h3>
            <div className="flex flex-wrap gap-2.5">
              {coreTech.map((tech) => (
                <span
                  key={tech.name}
                  className="px-4 py-2 rounded-full bg-surface-primary border border-border-primary text-sm font-medium text-text-primary hover:border-border-strong transition-colors duration-200 theme-transition"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Working knowledge - quiet grouped list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 max-w-4xl"
          >
            <h3 className="text-title text-text-primary theme-transition mb-4">Also working with</h3>
            <dl className="space-y-2">
              {secondaryByCategory.map((group) => (
                <div key={group.category} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                  <dt className="text-label text-text-tertiary sm:w-36 shrink-0">
                    {categories[group.category].name}
                  </dt>
                  <dd className="text-sm text-text-secondary">
                    {group.items.map((t) => t.name).join(' · ')}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
