'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { PlatonicSolid } from './PlatonicSolid'
import { TechInfoCard } from './TechInfoCard'
import { ScrollThrough, StageControls } from './CanvasStage'

interface TechSceneProps {
  technologies: Array<{
    name: string
    category: 'frontend' | 'backend' | 'database' | 'tools'
  }>
  onTechClick: (tech: { name: string; category: string }) => void
}

interface SelectedTech {
  name: string
  category: string
  position: [number, number, number]
  color: string
}

export function TechScene({ technologies }: TechSceneProps) {
  const [selectedTech, setSelectedTech] = useState<SelectedTech | null>(null)
  // Map categories to Platonic Solids and colors
  const getCategoryConfig = (category: string) => {
    switch (category) {
      case 'frontend':
        return { type: 'tetrahedron' as const, color: '#915eff' }
      case 'backend':
        return { type: 'cube' as const, color: '#00d4ff' }
      case 'database':
        return { type: 'octahedron' as const, color: '#ff6b9d' }
      case 'tools':
        return { type: 'dodecahedron' as const, color: '#915eff' }
      default:
        return { type: 'icosahedron' as const, color: '#915eff' }
    }
  }

  // Calculate grid positions
  const getPosition = (index: number, total: number): [number, number, number] => {
    const cols = Math.ceil(Math.sqrt(total))
    const row = Math.floor(index / cols)
    const col = index % cols

    const spacing = 4 // Tighter spacing since camera is closer
    const offsetX = (cols - 1) * spacing / 2
    const offsetZ = (Math.ceil(total / cols) - 1) * spacing / 2

    return [
      col * spacing - offsetX,
      0,
      row * spacing - offsetZ
    ]
  }

  return (
    <div className="relative w-full h-full">
    <Canvas
      className="w-full h-full"
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      camera={{ position: [0, 6, 10], fov: 50 }}
    >

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#915eff" />
      <pointLight position={[10, -10, -5]} intensity={0.5} color="#00d4ff" />

      <Suspense fallback={null}>
        {technologies.map((tech, index) => {
          const config = getCategoryConfig(tech.category)
          const pos = getPosition(index, technologies.length)
          return (
            <PlatonicSolid
              key={tech.name}
              type={config.type}
              color={config.color}
              position={pos}
              techName={tech.name}
              delay={index * 0.08} // Staggered entrance animation
              onClick={() => {
                // Toggle off if same shape clicked
                if (selectedTech?.name === tech.name) {
                  setSelectedTech(null)
                  return
                }
                // Force re-mount by clearing first, then setting new after unmount
                setSelectedTech(null)
                setTimeout(() => {
                  setSelectedTech({
                    name: tech.name,
                    category: tech.category,
                    position: pos,
                    color: config.color
                  })
                }, 50)
              }}
            />
          )
        })}
      </Suspense>

      {/* 3D Info Card - Rendered outside Suspense to prevent re-mounting */}
      {selectedTech && (
        <TechInfoCard
          position={selectedTech.position}
          techName={selectedTech.name}
          category={selectedTech.category}
          color={selectedTech.color}
          onClose={() => setSelectedTech(null)}
        />
      )}

      {/* Shared interaction contract: rotate only, scroll always passes through */}
      <ScrollThrough />
      <StageControls
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 4}
      />
    </Canvas>
    </div>
  )
}
