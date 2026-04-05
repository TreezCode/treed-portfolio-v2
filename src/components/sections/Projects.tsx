'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { projects } from '@/data'

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

export function Projects() {
  const [filter, setFilter] = useState<string>('all')

  // Get unique tags from all projects
  const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
  const filters = ['all', ...allTags]

  // Filter projects based on selected tag
  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.tags.includes(filter))

  return (
    <section id="work" className="py-24 bg-background-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-accent-primary text-sm font-semibold uppercase tracking-wider mb-2">
              My Work
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              A showcase of my best work, from full-stack applications to creative experiments.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Buttons */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((tag) => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  filter === tag
                    ? 'bg-accent-primary text-white scale-105'
                    : 'bg-background-secondary text-text-secondary hover:bg-background-tertiary hover:text-text-primary'
                }`}
              >
                {tag === 'all' ? 'All Projects' : tag}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.1}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  variant="glass"
                  className="group h-full flex flex-col hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Project Image Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 mb-4 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">💼</div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-accent-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 text-text-primary group-hover:text-accent-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-text-secondary mb-4 flex-1">{project.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-accent-primary/10 text-accent-secondary border border-accent-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex gap-3">
                      {project.sourceCode && (
                        <a
                          href={project.sourceCode}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors"
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
                          className="flex items-center gap-2 text-text-secondary hover:text-accent-secondary transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLinkIcon />
                          <span className="text-sm font-medium">Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary text-lg">No projects found with this filter.</p>
          </div>
        )}
      </div>
    </section>
  )
}
