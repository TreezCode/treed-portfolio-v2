/**
 * Merkaba Icon - Dark Mode Symbol
 * Represents cosmic energy, night, and sacred geometry
 */

export function MerkabaIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Dark mode - Merkaba"
    >
      <defs>
        <linearGradient id="merkabaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
      
      {/* Upward pointing tetrahedron (outer) */}
      <path
        d="M 50 15 L 75 65 L 25 65 Z"
        stroke="url(#merkabaGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="1"
      />
      
      {/* Downward pointing tetrahedron (inner) */}
      <path
        d="M 50 85 L 25 35 L 75 35 Z"
        stroke="url(#merkabaGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.85"
      />
      
      {/* Center hexagon (intersection) */}
      <path
        d="M 50 35 L 62.5 42.5 L 62.5 57.5 L 50 65 L 37.5 57.5 L 37.5 42.5 Z"
        stroke="url(#merkabaGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      
      {/* Connecting lines creating 3D effect */}
      <line
        x1="50"
        y1="15"
        x2="50"
        y2="35"
        stroke="url(#merkabaGradient)"
        strokeWidth="2"
        opacity="0.7"
      />
      <line
        x1="50"
        y1="65"
        x2="50"
        y2="85"
        stroke="url(#merkabaGradient)"
        strokeWidth="2"
        opacity="0.7"
      />
      
      {/* Outer star points (optional cosmic sparkles) */}
      <g opacity="0.8">
        <circle cx="50" cy="10" r="2" fill="url(#merkabaGradient)" />
        <circle cx="80" cy="50" r="2" fill="url(#merkabaGradient)" />
        <circle cx="50" cy="90" r="2" fill="url(#merkabaGradient)" />
        <circle cx="20" cy="50" r="2" fill="url(#merkabaGradient)" />
      </g>
    </svg>
  )
}
