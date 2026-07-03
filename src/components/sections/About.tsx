'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { services } from '@/data'
import { Globe, Zap, Code, Palette } from 'lucide-react'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Zap,
  Code,
  Palette,
}

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const Icon = iconMap[service.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div className="h-full rounded-2xl bg-surface-primary border border-border-primary hover:border-border-strong transition-colors duration-200 p-6 theme-transition">
        {Icon && <Icon className="w-8 h-8 text-accent-primary mb-4" aria-hidden />}
        <h3 className="text-title text-text-primary mb-2 theme-transition">
          {service.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" aria-label="About Me" className="relative py-16 sm:py-28 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mb-10 sm:mb-14">
            <span className="text-label text-text-tertiary block mb-3">01</span>
            <h2 className="text-headline text-text-primary theme-transition mb-4">About Me</h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              I&apos;m a software engineer who cares as much about how an interface feels as how it
              works. I build with React, Next.js, and Three.js, hold a CompTIA Security+
              certification, and bring a security-first mindset to every project I ship.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
