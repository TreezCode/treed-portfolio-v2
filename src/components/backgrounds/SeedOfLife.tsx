'use client'

import { useEffect, useRef, useState } from 'react'

interface SeedOfLifeProps {
  size?: number // Base radius multiplier (default: 1)
  opacity?: number // Opacity (default: 0.8)
  position?: 'center' | 'top' | 'bottom' // Vertical position
  color?: string // Color (default: #915eff)
}

export function SeedOfLife({ 
  size = 1, 
  opacity = 0.8, 
  position = 'center',
  color = '#915eff'
}: SeedOfLifeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(true)

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      const width = parent.clientWidth
      const height = parent.clientHeight

      // Set canvas size to match parent
      canvas.width = width
      canvas.height = height

      // Set CSS size to prevent stretching
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    const drawSeedOfLife = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      
      // Position vertically based on prop
      let centerY = height / 2
      if (position === 'top') centerY = height * 0.25
      if (position === 'bottom') centerY = height * 0.75
      
      // Use the smaller dimension and apply size multiplier
      const baseRadius = Math.min(width, height) / 8
      const radius = baseRadius * size

      ctx.clearRect(0, 0, width, height)
      
      // Theme-aware opacity multiplier
      const opacityMultiplier = isDark ? 1 : 2.5  // Higher opacity for light mode
      
      ctx.strokeStyle = color
      ctx.lineWidth = isDark ? 1.5 : 2
      ctx.globalAlpha = opacity * opacityMultiplier

      // Center circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()

      // Six surrounding circles (Seed of Life pattern)
      // These circles touch the center circle at exactly one point
      const angles = [0, 60, 120, 180, 240, 300]
      angles.forEach((angle) => {
        const rad = (angle * Math.PI) / 180
        const x = centerX + radius * Math.cos(rad)
        const y = centerY + radius * Math.sin(rad)

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Additional decorative circles for more complexity
      const outerRadius = radius * 2
      ctx.globalAlpha = opacity * 0.6 * opacityMultiplier
      angles.forEach((angle) => {
        const rad = (angle * Math.PI) / 180
        const x = centerX + outerRadius * Math.cos(rad)
        const y = centerY + outerRadius * Math.sin(rad)

        ctx.beginPath()
        ctx.arc(x, y, radius / 2, 0, Math.PI * 2)
        ctx.stroke()
      })
    }

    const handleResize = () => {
      resizeCanvas()
      drawSeedOfLife()
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [size, opacity, position, color, isDark])  // Redraw when theme changes

  return <canvas ref={canvasRef} className="absolute inset-0" />
}
