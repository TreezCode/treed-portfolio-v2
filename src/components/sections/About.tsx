'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { services } from '@/data'
import { Globe, Zap, Code, Palette } from 'lucide-react'
import { useRef, useState } from 'react'
import { FruitOfLife } from '@/components/backgrounds/FruitOfLife'
import { useIsMobile } from '@/hooks/useMobileReduced'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Zap,
  Code,
  Palette,
}

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const tiltRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = useIsMobile()

  const brandColors = [
    { from: '#915eff', to: '#ff6b9d' }, // Purple to Pink
    { from: '#00d4ff', to: '#915eff' }, // Cyan to Purple
    { from: '#ff6b9d', to: '#00d4ff' }, // Pink to Cyan
    { from: '#915eff', to: '#00d4ff' }, // Purple to Cyan
  ]
  const colors = brandColors[index % brandColors.length]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt on mobile/touch devices
    if (!tiltRef.current || isMobile) return
    
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -30
    const rotateY = ((x - centerX) / centerX) * 30

    // Direct DOM manipulation for smooth performance
    tiltRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (!tiltRef.current) return
    
    // Smooth return to neutral position
    tiltRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg)'
    setIsHovering(false)
  }

  const Icon = iconMap[service.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group w-full"
    >
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s cubic-bezier(0.03, 0.98, 0.52, 0.99)',
        }}
        className="w-full"
      >
      {/* Gradient Border Container */}
      <div
        className="relative p-px rounded-2xl transition-all duration-300"
        style={{
          background: isHovering
            ? `linear-gradient(135deg, ${colors.from}, ${colors.to})`
            : `linear-gradient(135deg, ${colors.from}40, ${colors.to}40)`,
          boxShadow: isHovering ? `0 20px 60px ${colors.from}40` : 'none',
        }}
      >
        {/* Card Content */}
        <div className="bg-background-primary rounded-2xl p-6 sm:p-8 min-h-[280px] flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Radial Glow Effect */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 0%, ${colors.from}15, transparent 60%)`,
            }}
          />

          {/* Fruit of Life sacred geometry background */}
          <div className="absolute -bottom-8 -right-8 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-500 pointer-events-none">
            <FruitOfLife
              color={colors.from}
              secondaryColor={colors.to}
              className="w-48 h-48 sm:w-56 sm:h-56"
            />
          </div>

          {/* Icon */}
          <div 
            className="relative z-10 mb-4 transition-all duration-300"
            style={{
              color: isHovering ? colors.from : `${colors.from}80`,
              transform: isHovering ? 'scale(1.1)' : 'scale(1)',
            }}
          >
            {Icon && <Icon className="w-12 h-12 sm:w-16 sm:h-16" />}
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 relative z-10">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed relative z-10">
            {service.description}
          </p>
        </div>
      </div>
      </div>
    </motion.div>
  )
}

export function About() {
  return (
    <section id="about" aria-label="About Me" className="relative py-12 sm:py-24 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
              Introduction
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto px-4">
              I&apos;m a junior software engineer with a growing focus on cybersecurity and secure web architecture.
              Skilled in building dynamic, SEO-optimized solutions with React, Next.js, and modern frameworks.
              CompTIA Security+ certified with a passion for AI and emerging technologies, I combine frontend expertise
              with hands-on security knowledge to deliver scalable, user-focused applications.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12 sm:mt-20">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
