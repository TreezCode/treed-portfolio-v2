/**
 * Fruit of Life Sacred Geometry - Inline SVG Component
 * 
 * The Fruit of Life consists of 13 circles arranged in a specific pattern:
 * - 1 center circle
 * - 6 inner ring circles (60° spacing)
 * - 6 outer ring circles (60° spacing)
 * 
 * Used as a decorative background element on About section cards.
 */

interface FruitOfLifeProps {
  color: string
  secondaryColor: string
  className?: string
}

export function FruitOfLife({ color, secondaryColor, className }: FruitOfLifeProps) {
  // Circle parameters
  const r = 20 // circle radius
  const cx = 100 // center x
  const cy = 100 // center y
  const innerRingRadius = r * 2 // distance from center to inner ring circles
  const outerRingRadius = r * 4 // distance from center to outer ring circles

  // Generate circle positions
  const centerCircle = { cx, cy }
  
  const innerRing = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180) // Start at top, 60° increments
    return {
      cx: cx + innerRingRadius * Math.cos(angle),
      cy: cy + innerRingRadius * Math.sin(angle),
    }
  })
  
  const outerRing = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180)
    return {
      cx: cx + outerRingRadius * Math.cos(angle),
      cy: cy + outerRingRadius * Math.sin(angle),
    }
  })

  // Create unique gradient ID based on colors to avoid conflicts
  const gradientId = `fruitOfLife-${color.replace('#', '')}-${secondaryColor.replace('#', '')}`

  return (
    <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>
      {/* Center circle */}
      <circle 
        cx={centerCircle.cx} 
        cy={centerCircle.cy} 
        r={r} 
        fill="none" 
        stroke={`url(#${gradientId})`} 
        strokeWidth="0.5" 
      />
      {/* Inner ring circles */}
      {innerRing.map((circle, i) => (
        <circle 
          key={`inner-${i}`} 
          cx={circle.cx} 
          cy={circle.cy} 
          r={r} 
          fill="none" 
          stroke={`url(#${gradientId})`} 
          strokeWidth="0.5" 
        />
      ))}
      {/* Outer ring circles */}
      {outerRing.map((circle, i) => (
        <circle 
          key={`outer-${i}`} 
          cx={circle.cx} 
          cy={circle.cy} 
          r={r} 
          fill="none" 
          stroke={`url(#${gradientId})`} 
          strokeWidth="0.5" 
        />
      ))}
    </svg>
  )
}
