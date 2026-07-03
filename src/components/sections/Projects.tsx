'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, projectCategories } from '@/data'
import { MetatronsCube } from '@/components/backgrounds/MetatronsCube'

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

const ExternalLinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
)

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const categoryLabel = projectCategories.find((c) => c.id === project.category)?.label

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-full"
    >
      <article className="group relative h-full flex flex-col rounded-2xl bg-surface-primary border border-border-primary hover:border-border-strong transition-colors duration-200 p-6 theme-transition">
        {/* Header: category label + external links */}
        <div className="flex items-start justify-between mb-4">
          <span className="text-label text-text-tertiary">{categoryLabel}</span>
          <div className="flex gap-1">
            {project.sourceCode && (
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code for ${project.name} on GitHub`}
                className="p-2.5 -m-1 rounded-lg text-text-tertiary hover:text-accent-primary hover:bg-surface-hover transition-colors duration-200"
              >
                <GithubIcon />
              </a>
            )}
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.name}`}
                className="p-2.5 -m-1 rounded-lg text-text-tertiary hover:text-accent-primary hover:bg-surface-hover transition-colors duration-200"
              >
                <ExternalLinkIcon />
              </a>
            )}
          </div>
        </div>

        {/* Title + description */}
        <h3 className="text-title text-text-primary mb-2 theme-transition">
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-primary transition-colors duration-200 after:absolute after:inset-0"
            >
              {project.name}
            </a>
          ) : (
            project.name
          )}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-border-secondary">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-surface-hover text-text-secondary theme-transition"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </motion.div>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<string>('all')

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter)

  return (
    <section id="work" aria-label="Featured Projects" className="relative py-16 sm:py-28 bg-background-primary overflow-hidden">
      {/* Sacred Geometry Background - the section-level signature placement */}
      <div className="absolute inset-0 pointer-events-none">
        <MetatronsCube opacity={0.05} color="#915eff" secondaryColor="#915eff" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-8 sm:mb-10"
        >
          <span className="text-label text-text-tertiary block mb-3">04</span>
          <h2 className="text-headline text-text-primary theme-transition mb-4">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Production work spanning full-stack products, client builds, and front-end craft.
          </p>
        </motion.div>

        {/* Curated category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10 sm:mb-12"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectCategories.map((category) => {
            const isSelected = filter === category.id
            return (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  isSelected
                    ? 'bg-accent-fill text-white border-transparent'
                    : 'bg-surface-primary text-text-secondary border-border-primary hover:border-border-strong hover:text-text-primary'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
              <p className="text-text-secondary text-lg">No projects found in this category.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
