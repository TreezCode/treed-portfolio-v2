'use client'

import { useEffect, useRef, useState } from 'react'

export function SacredGeometry() {
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

    // Draw sacred geometry pattern
    const drawPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const spacing = 120
      const radius = 40
      
      // Theme-aware colors and opacity
      const opacity = isDark ? 0.07 : 0.15  // Higher opacity for light mode
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, `rgba(145, 94, 255, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(0, 212, 255, ${opacity})`)
      gradient.addColorStop(1, `rgba(255, 107, 157, ${opacity})`)

      ctx.strokeStyle = gradient
      ctx.lineWidth = isDark ? 1 : 1.5  // Slightly thicker lines in light mode

      // Draw overlapping circles (Flower of Life pattern)
      for (let x = -spacing; x < canvas.width + spacing; x += spacing) {
        for (let y = -spacing; y < canvas.height + spacing; y += spacing) {
          // Main circle
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.stroke()

          // Surrounding circles
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i
            const offsetX = Math.cos(angle) * radius
            const offsetY = Math.sin(angle) * radius
            
            ctx.beginPath()
            ctx.arc(x + offsetX, y + offsetY, radius, 0, Math.PI * 2)
            ctx.stroke()
          }
        }
      }

      // Add connecting lines for Metatron's Cube effect
      const lineOpacity = isDark ? 0.075 : 0.1
      ctx.strokeStyle = `rgba(145, 94, 255, ${lineOpacity})`
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          // Draw lines to adjacent points
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + spacing, y)
          ctx.stroke()
          
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x, y + spacing)
          ctx.stroke()
          
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x + spacing, y + spacing)
          ctx.stroke()
        }
      }
    }

    // Set canvas size and redraw pattern
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawPattern()
    }

    // Initial setup
    handleResize()
    
    // Listen for resize events
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isDark])  // Redraw pattern when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50"
      style={{ 
        mixBlendMode: isDark ? 'screen' : 'multiply'  // screen for dark, multiply for light
      }}
    />
  )
}
