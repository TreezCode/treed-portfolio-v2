'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  angle: number
  distance: number
  color: string
}

interface ThemeParticlesProps {
  trigger: boolean
  theme: 'light' | 'dark'
}

export function ThemeParticles({ trigger, theme }: ThemeParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    if (!trigger) return

    // Create 12 particles in a radial pattern
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x: 0,
      y: 0,
      angle: (360 / 12) * i,
      distance: 100 + Math.random() * 50,
      color: theme === 'dark' 
        ? ['#915eff', '#00d4ff', '#ff6b9d'][Math.floor(Math.random() * 3)]
        : ['#915eff', '#00d4ff'][Math.floor(Math.random() * 2)],
    }))

    setParticles(newParticles)

    // Clear particles after animation
    const timeout = setTimeout(() => {
      setParticles([])
    }, 1000)

    return () => clearTimeout(timeout)
  }, [trigger, theme])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => {
          const radian = (particle.angle * Math.PI) / 180
          const endX = Math.cos(radian) * particle.distance
          const endY = Math.sin(radian) * particle.distance

          return (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                width: '4px',
                height: '4px',
              }}
              initial={{
                x: 0,
                y: 0,
                scale: 0,
                opacity: 1,
              }}
              animate={{
                x: endX,
                y: endY,
                scale: [0, 1.5, 0],
                opacity: [1, 0.8, 0],
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            >
              {/* Sacred geometry particle shape */}
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Small merkaba/star shape */}
                <path
                  d="M 4 0 L 6 3 L 4 4 L 2 3 Z"
                  fill={particle.color}
                  opacity="0.8"
                />
                <path
                  d="M 4 8 L 2 5 L 4 4 L 6 5 Z"
                  fill={particle.color}
                  opacity="0.6"
                />
              </svg>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
