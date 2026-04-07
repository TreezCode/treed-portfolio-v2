'use client'

import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { services } from '@/data'
import { Globe, Zap, Code, Palette } from 'lucide-react'
import { useRef, useState } from 'react'

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

  const brandColors = [
    { from: '#915eff', to: '#ff6b9d' }, // Purple to Pink
    { from: '#00d4ff', to: '#915eff' }, // Cyan to Purple
    { from: '#ff6b9d', to: '#00d4ff' }, // Pink to Cyan
    { from: '#915eff', to: '#00d4ff' }, // Purple to Cyan
  ]
  const colors = brandColors[index % brandColors.length]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltRef.current) return
    
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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="w-full"
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
          {/* Glow Effect */}
          {isHovering && (
            <div
              className="absolute inset-0 opacity-10"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${colors.from}, transparent 70%)`,
              }}
            />
          )}

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
    <section id="about" className="relative py-12 sm:py-24 bg-background-secondary overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-[#915eff] text-sm font-semibold uppercase tracking-wider mb-2">
              Introduction
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-base sm:text-xl text-text-secondary max-w-3xl mx-auto px-4">
              I&apos;m a passionate full-stack developer with expertise in building modern web
              applications. I specialize in React, Next.js, and Three.js, creating immersive 3D
              experiences and intuitive user interfaces.
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
