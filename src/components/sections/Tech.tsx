'use client'

import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { technologies } from '@/data'

export function Tech() {
  const categories = {
    frontend: technologies.filter((t) => t.category === 'frontend'),
    backend: technologies.filter((t) => t.category === 'backend'),
    database: technologies.filter((t) => t.category === 'database'),
    tools: technologies.filter((t) => t.category === 'tools'),
  }

  return (
    <section id="tech" className="py-24 bg-background-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-accent-primary text-sm font-semibold uppercase tracking-wider mb-2">
              My Toolkit
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Technologies</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              I work with a wide range of modern technologies to build scalable and performant
              applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto space-y-12">
          {Object.entries(categories).map(([category, techs], categoryIndex) => (
            <ScrollReveal key={category} delay={categoryIndex * 0.1}>
              <div>
                <h3 className="text-2xl font-bold mb-6 capitalize text-accent-secondary">
                  {category}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {techs.map((tech, index) => (
                    <div
                      key={tech.name}
                      className="group relative bg-background-primary/50 backdrop-blur-sm rounded-lg p-4 hover:bg-background-primary transition-all duration-300 hover:scale-105 cursor-pointer border border-white/5 hover:border-accent-primary/50"
                    >
                      <p className="text-center text-text-primary font-medium group-hover:text-accent-primary transition-colors">
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
