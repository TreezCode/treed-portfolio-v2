'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data'
import { MetatronsCube } from '@/components/backgrounds/MetatronsCube'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
)

// Inline SVG Metatron's Cube for card decoration
function MetatronsCubeSVG({ color, secondaryColor, className }: { color: string; secondaryColor: string; className?: string }) {
  // 13 points: center + 6 inner ring + 6 outer ring
  const r = 12
  const cx = 50
  const cy = 50
  const innerPts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return [cx + r * 2 * Math.cos(a), cy + r * 2 * Math.sin(a)] as [number, number]
  })
  const outerPts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6
    return [cx + r * 4 * Math.cos(a), cy + r * 4 * Math.sin(a)] as [number, number]
  })
  const allPts: [number, number][] = [[cx, cy], ...innerPts, ...outerPts]

  // Generate all unique line pairs
  const lines: [number, number, number, number][] = []
  for (let i = 0; i < allPts.length; i++) {
    for (let j = i + 1; j < allPts.length; j++) {
      lines.push([allPts[i][0], allPts[i][1], allPts[j][0], allPts[j][1]])
    }
  }

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      {/* Connecting lines */}
      {lines.map((l, i) => (
        <line key={i} x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]} stroke={i % 2 === 0 ? color : secondaryColor} strokeWidth="0.2" />
      ))}
      {/* Circles */}
      <circle cx={cx} cy={cy} r={r} stroke={color} strokeWidth="0.3" />
      {innerPts.map((p, i) => (
        <circle key={`i${i}`} cx={p[0]} cy={p[1]} r={r} stroke={color} strokeWidth="0.3" />
      ))}
      {outerPts.map((p, i) => (
        <circle key={`o${i}`} cx={p[0]} cy={p[1]} r={r} stroke={secondaryColor} strokeWidth="0.25" />
      ))}
      {/* Inner hexagon */}
      <polygon points={innerPts.map(p => p.join(',')).join(' ')} stroke={secondaryColor} strokeWidth="0.3" />
      {/* Outer hexagon */}
      <polygon points={outerPts.map(p => p.join(',')).join(' ')} stroke={color} strokeWidth="0.25" />
      {/* Star of David */}
      <polygon points={`${outerPts[0].join(',')},${outerPts[2].join(',')},${outerPts[4].join(',')}`} stroke={color} strokeWidth="0.3" />
      <polygon points={`${outerPts[1].join(',')},${outerPts[3].join(',')},${outerPts[5].join(',')}`} stroke={secondaryColor} strokeWidth="0.3" />
      {/* Bounding circles */}
      <circle cx={cx} cy={cy} r={r * 4 + r} stroke={color} strokeWidth="0.2" />
      <circle cx={cx} cy={cy} r={r * 4 + r * 2} stroke={secondaryColor} strokeWidth="0.15" />
    </svg>
  )
}

// Gradient color pairs per card index
const cardGradients = [
  { from: '#915eff', to: '#ff6b9d' }, // Purple → Pink
  { from: '#00d4ff', to: '#915eff' }, // Cyan → Purple
  { from: '#ff6b9d', to: '#00d4ff' }, // Pink → Cyan
  { from: '#915eff', to: '#00d4ff' }, // Purple → Cyan
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const gradient = cardGradients[index % cardGradients.length]

  // 3D tilt effect (DOM-based for 60fps)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -8
      const rotateY = ((x - centerX) / centerX) * 8

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    },
    []
  )

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
  }, [])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-2xl p-px cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)`,
          transition: 'transform 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99), box-shadow 300ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`
          e.currentTarget.style.boxShadow = `0 20px 60px ${gradient.from}30, 0 0 40px ${gradient.to}15`
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = `linear-gradient(135deg, ${gradient.from}40, ${gradient.to}40)`
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Inner card */}
        <div className="relative h-full rounded-2xl bg-[#0d0d1a] p-5 sm:p-6 flex flex-col overflow-hidden">
          {/* Radial glow on hover */}
          <div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${gradient.from}15, transparent 60%)`,
            }}
          />

          {/* Project Header */}
          <div
            className="relative h-44 sm:h-48 mb-5 rounded-xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}15, ${gradient.to}10)`,
            }}
          >
            {/* Metatron's Cube overlay on image area */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none">
              <MetatronsCubeSVG
                color={gradient.from}
                secondaryColor={gradient.to}
                className="w-48 h-48 sm:w-56 sm:h-56"
              />
            </div>

            {/* Featured badge */}
            {project.featured && (
              <div
                className="absolute top-3 right-3 text-white text-xs font-bold px-3 py-1 rounded-full z-10"
                style={{
                  background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                  boxShadow: `0 4px 15px ${gradient.from}50`,
                }}
              >
                Featured
              </div>
            )}

            {/* Links overlay on hover */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from}80, ${gradient.to}80)`,
                    boxShadow: `0 4px 20px ${gradient.from}40`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon />
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${gradient.from}80, ${gradient.to}80)`,
                    boxShadow: `0 4px 20px ${gradient.from}40`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>

          {/* Project Content */}
          <div className="relative flex-1 flex flex-col">
            {/* Metatron's Cube body background */}
            <div className="absolute -bottom-6 -right-6 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
              <MetatronsCubeSVG
                color={gradient.from}
                secondaryColor={gradient.to}
                className="w-44 h-44 sm:w-52 sm:h-52"
              />
            </div>
            <h3
              className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:transition-colors duration-300"
              style={{ color: 'white' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = gradient.from }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'white' }}
            >
              {project.name}
            </h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4 flex-1 leading-relaxed">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border transition-colors duration-300"
                  style={{
                    borderColor: `${gradient.from}30`,
                    color: gradient.to,
                    background: `${gradient.from}10`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom links */}
            <div className="flex gap-4 pt-2 border-t border-white/5">
              {project.sourceCode && (
                <a
                  href={project.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 transition-colors duration-300"
                  style={{}}
                  onMouseEnter={(e) => { e.currentTarget.style.color = gradient.from }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <GithubIcon />
                  <span className="text-sm font-medium">Code</span>
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 transition-colors duration-300"
                  onMouseEnter={(e) => { e.currentTarget.style.color = gradient.to }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9ca3af' }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLinkIcon />
                  <span className="text-sm font-medium">Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<string>('all')

  // Get unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
  const filters = ['all', ...allTags]

  // Filter projects based on selected tag
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))

  return (
    <section id="work" className="relative py-12 sm:py-24 bg-background-primary overflow-hidden">
      {/* Sacred Geometry Background - Metatron's Cube */}
      <div className="absolute inset-0 pointer-events-none">
        <MetatronsCube opacity={0.05} color="#915eff" secondaryColor="#00d4ff" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
            My Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto">
            A showcase of my best work, from full-stack applications to creative experiments.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14"
        >
          {filters.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              style={{
                background:
                  filter === tag
                    ? 'linear-gradient(135deg, #915eff, #00d4ff)'
                    : 'rgba(255, 255, 255, 0.05)',
                color: filter === tag ? '#ffffff' : '#b0b0b0',
                border: `1px solid ${filter === tag ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
                boxShadow:
                  filter === tag
                    ? '0 4px 20px rgba(145, 94, 255, 0.3), 0 0 15px rgba(0, 212, 255, 0.15)'
                    : 'none',
                transform: filter === tag ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {tag === 'all' ? 'All Projects' : tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="text-text-secondary text-lg">No projects found with this filter.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
