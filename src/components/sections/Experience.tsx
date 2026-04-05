'use client'

import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { experiences } from '@/data'

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-background-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-accent-primary text-sm font-semibold uppercase tracking-wider mb-2">
              What I've Done
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Experience</h2>
          </div>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ScrollReveal key={experience.title} delay={index * 0.1}>
              <div className="relative pl-8 pb-12 border-l-2 border-accent-primary/30 last:pb-0">
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-accent-primary ring-4 ring-background-primary" />

                <div className="bg-background-secondary/50 backdrop-blur-sm rounded-lg p-6 hover:bg-background-secondary transition-colors duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-primary">{experience.title}</h3>
                      <p className="text-accent-secondary font-medium">{experience.company}</p>
                    </div>
                    <p className="text-text-tertiary text-sm mt-2 sm:mt-0">{experience.date}</p>
                  </div>

                  <ul className="space-y-2">
                    {experience.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-text-secondary">
                        <span className="text-accent-primary mt-1.5">▹</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
