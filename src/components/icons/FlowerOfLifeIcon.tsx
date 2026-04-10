/**
 * Flower of Life Icon - Light Mode Symbol
 * Represents expansion, light, and sacred geometry
 */

export function FlowerOfLifeIcon({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Light mode - Flower of Life"
    >
      <defs>
        <linearGradient id="flowerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#915eff" />
          <stop offset="50%" stopColor="#7b3fd1" />
          <stop offset="100%" stopColor="#915eff" />
        </linearGradient>
      </defs>
      
      {/* Center circle */}
      <circle
        cx="50"
        cy="50"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="1"
      />
      
      {/* 6 surrounding circles (petals) */}
      <circle
        cx="50"
        cy="38"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="60.4"
        cy="44"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="60.4"
        cy="56"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="50"
        cy="62"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="39.6"
        cy="56"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      <circle
        cx="39.6"
        cy="44"
        r="12"
        stroke="url(#flowerGradient)"
        strokeWidth="2.5"
        fill="none"
        opacity="0.9"
      />
      
      {/* Outer radial lines (sun rays) */}
      <g opacity="0.85">
        <line x1="50" y1="20" x2="50" y2="26" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="27" x2="64" y2="31" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="80" y1="50" x2="74" y2="50" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="68" y1="73" x2="64" y2="69" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="50" y1="80" x2="50" y2="74" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="73" x2="36" y2="69" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="20" y1="50" x2="26" y2="50" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="32" y1="27" x2="36" y2="31" stroke="url(#flowerGradient)" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}
