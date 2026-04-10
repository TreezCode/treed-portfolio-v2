'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { useIsMobile } from '@/hooks/useMobileReduced'
import { PlatonicSolid } from './PlatonicSolid'
import { TechInfoCard } from './TechInfoCard'

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#915eff" wireframe />
    </mesh>
  )
}

interface TechSceneProps {
  technologies: Array<{
    name: string
    category: 'frontend' | 'backend' | 'database' | 'tools'
  }>
  onTechClick: (tech: { name: string; category: string }) => void
  isActive?: boolean
  onToggle?: () => void
}

interface SelectedTech {
  name: string
  category: string
  position: [number, number, number]
  color: string
}

function CanvasController({
  isActive, isMobile, onToggle
}: { isActive: boolean; isMobile: boolean; onToggle?: () => void }) {
  const { gl } = useThree()
  const canvasEl = useRef<HTMLCanvasElement>(gl.domElement)
  const lastTapRef = useRef<number>(0)
  const touchCountRef = useRef<number>(0)

  useEffect(() => {
    // Set touch-action directly on the canvas — R3F overrides the wrapper div's style.
    canvasEl.current.style.touchAction = isMobile && !isActive ? 'pan-y' : 'none'
  }, [isActive, isMobile])

  useEffect(() => {
    if (!isMobile || !onToggle) return
    const el = canvasEl.current

    // Track touch count to distinguish single-tap from multi-touch gestures
    const handleTouchStart = (e: TouchEvent) => {
      touchCountRef.current = e.touches.length
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Only process as double-tap if it was a single-finger touch
      // This prevents pinch-to-zoom (2 fingers) from triggering the toggle
      if (touchCountRef.current !== 1) {
        touchCountRef.current = 0
        return
      }

      const now = Date.now()
      const timeSinceLast = now - lastTapRef.current
      if (timeSinceLast < 300 && timeSinceLast > 0) {
        // Double-tap detected with single finger — toggle lock/unlock
        e.preventDefault()
        onToggle()
      }
      lastTapRef.current = now
      touchCountRef.current = 0
    }

    // Track touch start to know finger count
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    // passive:false so we can call preventDefault on the second tap
    el.addEventListener('touchend', handleTouchEnd, { passive: false })
    
    return () => {
      el.removeEventListener('touchstart', handleTouchStart)
      el.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isMobile, onToggle])

  return null
}

export function TechScene({ technologies, isActive = false, onToggle }: TechSceneProps) {
  const [selectedTech, setSelectedTech] = useState<SelectedTech | null>(null)
  const isMobile = useIsMobile()
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

      <Suspense fallback={<Loader />}>
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

      <CanvasController isActive={isActive} isMobile={isMobile} onToggle={onToggle} />
      {isActive && (
        <OrbitControls
          zoomSpeed={0.6}
          minDistance={5}
          maxDistance={20}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
          enableDamping
          dampingFactor={0.05}
          zoomToCursor={true}
        />
      )}
    </Canvas>
    </div>
  )
}
