'use client'

import { useEffect, useRef } from 'react'

interface MetatronsCubeProps {
  opacity?: number
  color?: string
  secondaryColor?: string
}

export function MetatronsCube({
  opacity = 0.06,
  color = '#915eff',
  secondaryColor = '#00d4ff',
}: MetatronsCubeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawMetatronsCube = () => {
      const width = canvas.width
      const height = canvas.height
      const centerX = width / 2
      const centerY = height / 2

      // Scale based on smaller dimension
      const scale = Math.min(width, height) * 0.4

      ctx.clearRect(0, 0, width, height)

      // --- Fruit of Life (13 circles) ---
      ctx.lineWidth = 1
      ctx.strokeStyle = color
      ctx.globalAlpha = opacity

      // Center circle
      const r = scale * 0.15
      ctx.beginPath()
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2)
      ctx.stroke()

      // Inner ring - 6 circles
      const innerPoints: [number, number][] = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const x = centerX + r * 2 * Math.cos(angle)
        const y = centerY + r * 2 * Math.sin(angle)
        innerPoints.push([x, y])

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Outer ring - 6 circles
      const outerPoints: [number, number][] = []
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const x = centerX + r * 4 * Math.cos(angle)
        const y = centerY + r * 4 * Math.sin(angle)
        outerPoints.push([x, y])

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.stroke()
      }

      // --- Metatron's Cube lines ---
      // Connect ALL 13 points to each other
      const allPoints: [number, number][] = [
        [centerX, centerY],
        ...innerPoints,
        ...outerPoints,
      ]

      // Draw connecting lines with gradient
      ctx.globalAlpha = opacity * 0.8
      for (let i = 0; i < allPoints.length; i++) {
        for (let j = i + 1; j < allPoints.length; j++) {
          const gradient = ctx.createLinearGradient(
            allPoints[i][0],
            allPoints[i][1],
            allPoints[j][0],
            allPoints[j][1]
          )
          gradient.addColorStop(0, color)
          gradient.addColorStop(1, secondaryColor)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 0.5

          ctx.beginPath()
          ctx.moveTo(allPoints[i][0], allPoints[i][1])
          ctx.lineTo(allPoints[j][0], allPoints[j][1])
          ctx.stroke()
        }
      }

      // --- Outer bounding circle ---
      ctx.strokeStyle = color
      ctx.globalAlpha = opacity * 0.5
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, r * 4 + r, 0, Math.PI * 2)
      ctx.stroke()

      // Second outer circle
      ctx.globalAlpha = opacity * 0.3
      ctx.beginPath()
      ctx.arc(centerX, centerY, r * 4 + r * 2, 0, Math.PI * 2)
      ctx.stroke()

      // --- Inner Platonic solid outlines (hexagons) ---
      ctx.strokeStyle = secondaryColor
      ctx.globalAlpha = opacity * 0.4
      ctx.lineWidth = 0.8

      // Inner hexagon
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const [x, y] = innerPoints[i]
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()

      // Outer hexagon
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const [x, y] = outerPoints[i]
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()

      // Star of David (two triangles)
      ctx.strokeStyle = color
      ctx.globalAlpha = opacity * 0.35
      ctx.lineWidth = 0.8

      // Upward triangle
      ctx.beginPath()
      ctx.moveTo(outerPoints[0][0], outerPoints[0][1])
      ctx.lineTo(outerPoints[2][0], outerPoints[2][1])
      ctx.lineTo(outerPoints[4][0], outerPoints[4][1])
      ctx.closePath()
      ctx.stroke()

      // Downward triangle
      ctx.beginPath()
      ctx.moveTo(outerPoints[1][0], outerPoints[1][1])
      ctx.lineTo(outerPoints[3][0], outerPoints[3][1])
      ctx.lineTo(outerPoints[5][0], outerPoints[5][1])
      ctx.closePath()
      ctx.stroke()
    }

    const handleResize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight
      drawMetatronsCube()
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [opacity, color, secondaryColor])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
