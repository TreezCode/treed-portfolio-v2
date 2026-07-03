'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data'
import { Briefcase } from 'lucide-react'

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex items-center gap-8 mb-12 last:mb-0 ${
        isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
      } flex-col`}
    >
      {/* Card - Takes up half width on desktop */}
      <div className="w-full lg:w-[calc(50%-2rem)] relative z-10">
        <div className="rounded-2xl bg-surface-primary border border-border-primary hover:border-border-strong transition-colors duration-200 p-6 sm:p-8 theme-transition">
          <h3 className="text-title text-text-primary mb-1 theme-transition">
            {experience.title}
          </h3>
          <p className="text-accent-primary font-medium text-sm">{experience.company}</p>
          <p className="text-label text-text-tertiary mt-1 mb-4">{experience.date}</p>

          <ul className="space-y-2">
            {experience.points.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5 text-text-secondary text-sm leading-relaxed">
                <span className="w-1 h-1 rounded-full bg-accent-primary mt-2 shrink-0" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timeline Icon - Center on desktop, hidden on mobile */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10 bg-surface-primary border border-border-strong theme-transition">
        <Briefcase className="w-5 h-5 text-accent-primary" aria-hidden />
      </div>

      {/* Spacer for opposite side on desktop */}
      <div className="hidden lg:block w-[calc(50%-2rem)]" />
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-label="Work Experience" className="relative py-16 sm:py-28 bg-background-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10 sm:mb-14"
        >
          <span className="text-label text-text-tertiary block mb-3">02</span>
          <h2 className="text-headline text-text-primary theme-transition">Experience &amp; Education</h2>
        </motion.div>

        <div className="max-w-6xl mx-auto relative">
          {/* Vertical Timeline Line - Desktop only */}
          <div className="hidden lg:block absolute left-1/2 top-6 bottom-12 w-px bg-border-primary -translate-x-1/2" />
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
