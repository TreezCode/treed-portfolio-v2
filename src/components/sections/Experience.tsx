'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/data'
import { Briefcase } from 'lucide-react'
import { SeedOfLife } from '@/components/backgrounds/SeedOfLife'

const ExperienceCard = ({ experience, index }: { experience: typeof experiences[0]; index: number }) => {
  const isLeft = index % 2 === 0
  
  // Varying sizes and opacities for depth
  const patterns = [
    { size: 1.2, opacity: 0.06, color: '#915eff' },
    { size: 1.0, opacity: 0.05, color: '#00d4ff' },
    { size: 1.3, opacity: 0.04, color: '#ff6b9d' },
    { size: 1.1, opacity: 0.05, color: '#915eff' },
  ]
  const pattern = patterns[index % patterns.length]
  
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
      {/* Seed of Life Pattern - Behind card */}
      <div className="absolute inset-0 pointer-events-none">
        <SeedOfLife 
          size={pattern.size} 
          opacity={pattern.opacity}
          color={pattern.color}
          position="center"
        />
      </div>

      {/* Card - Takes up half width on desktop */}
      <div className="w-full lg:w-[calc(50%-2rem)] relative z-10">
        <div
          className="relative p-px rounded-2xl transition-all duration-300 group"
          style={{
            background: 'linear-gradient(135deg, #915eff40, #00d4ff40)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #915eff, #00d4ff)'
            e.currentTarget.style.boxShadow = '0 20px 60px #915eff40'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'linear-gradient(135deg, #915eff40, #00d4ff40)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <div className="bg-background-primary rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            {/* Glow Effect */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at 50% 50%, #915eff, transparent 70%)',
              }}
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {experience.title}
                  </h3>
                  <p className="text-[#00d4ff] font-semibold">{experience.company}</p>
                </div>
              </div>

              <p className="text-text-tertiary text-sm mb-4">{experience.date}</p>

              <ul className="space-y-2">
                {experience.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-text-secondary text-sm leading-relaxed">
                    <span className="text-[#915eff] mt-1 text-lg">▹</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Icon - Center on desktop, hidden on mobile */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-full items-center justify-center z-10"
        style={{
          background: 'linear-gradient(135deg, #915eff, #00d4ff)',
          boxShadow: '0 0 20px #915eff80',
        }}
      >
        <Briefcase className="w-8 h-8 text-white" />
      </div>

      {/* Spacer for opposite side on desktop */}
      <div className="hidden lg:block w-[calc(50%-2rem)]" />
    </motion.div>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-label="Work Experience" className="relative py-12 sm:py-24 bg-background-primary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
              What I&apos;ve Done So Far
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Work Experience</h2>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto mt-12 sm:mt-20 relative">
          {/* Vertical Timeline Line - Desktop only, starts from first icon */}
          <div className="hidden lg:block absolute left-1/2 top-48 bottom-12 w-0.5 bg-linear-to-b from-[#915eff] via-[#00d4ff] to-transparent -translate-x-1/2" />
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.title} experience={experience} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
