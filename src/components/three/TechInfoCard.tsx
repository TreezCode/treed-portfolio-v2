'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

interface TechInfoCardProps {
  position: [number, number, number]
  techName: string
  category: string
  color: string
  onClose: () => void
}

export function TechInfoCard({ position, techName, category, color, onClose }: TechInfoCardProps) {
  const groupRef = useRef<THREE.Group>(null)
  const lineRef = useRef<THREE.Mesh>(null)
  const particleRefs = useRef<(THREE.Mesh | null)[]>([])
  const [showCard, setShowCard] = useState(false)
  const animStart = useRef(-1)

  const LINE_HEIGHT = 2.5
  const ANIM_DURATION = 600 // ms for line to grow
  const PARTICLE_STAGGER = 150 // ms between particles
  const CARD_DELAY = ANIM_DURATION + 100 // ms before card appears

  // Animated line grow + staggered particles + gentle float
  useFrame((state) => {
    const now = state.clock.elapsedTime * 1000
    if (animStart.current < 0) animStart.current = now
    const elapsed = now - animStart.current
    const progress = Math.min(elapsed / ANIM_DURATION, 1)
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3)

    // Grow line from bottom
    if (lineRef.current) {
      const currentHeight = LINE_HEIGHT * eased
      lineRef.current.scale.set(1, eased, 1)
      lineRef.current.position.y = currentHeight / 2
    }

    // Stagger particles
    particleRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const particleElapsed = elapsed - (i * PARTICLE_STAGGER)
      const particleProgress = Math.max(0, Math.min(particleElapsed / 200, 1))
      const particleEased = 1 - Math.pow(1 - particleProgress, 3)
      mesh.scale.setScalar(particleEased)
      mesh.visible = particleElapsed > 0
    })

    // Show card after line animation
    if (!showCard && elapsed > CARD_DELAY) {
      setShowCard(true)
    }

    // Gentle float
    if (groupRef.current) {
      const time = elapsed / 1000
      groupRef.current.position.y = Math.sin(time * 1.5) * 0.05
    }
  })

  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'frontend':
        return { shape: 'Tetrahedron', element: 'Fire', desc: 'User interfaces & visual experiences' }
      case 'backend':
        return { shape: 'Cube', element: 'Earth', desc: 'Server logic & data processing' }
      case 'database':
        return { shape: 'Octahedron', element: 'Air', desc: 'Data storage & retrieval' }
      case 'tools':
        return { shape: 'Dodecahedron', element: 'Ether', desc: 'Development tools & utilities' }
      default:
        return { shape: 'Icosahedron', element: 'Water', desc: 'Versatile technology' }
    }
  }

  const info = getCategoryInfo(category)

  const positionKey = `${position[0]}-${position[1]}-${position[2]}`

  return (
    <group key={positionKey} ref={groupRef} position={position}>
      {/* Connection Line - animated grow from bottom */}
      <mesh ref={lineRef} position={[0, 0, 0]} scale={[1, 0, 1]}>
        <cylinderGeometry args={[0.03, 0.03, LINE_HEIGHT, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>

      {/* Glowing particles along the line - staggered appear */}
      {[0.3, 0.6, 0.9].map((t, i) => (
        <mesh
          key={i}
          ref={(el) => { particleRefs.current[i] = el }}
          position={[0, LINE_HEIGHT * t, 0]}
          scale={0}
          visible={false}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.9} />
          <pointLight color={color} intensity={1} distance={2} />
        </mesh>
      ))}

      {/* 3D HTML Card - appears after line grows */}
      {showCard && (
        <Html
          position={[0, LINE_HEIGHT, 0]}
          center
          distanceFactor={5}
          zIndexRange={[100, 0]}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 350 }}
            style={{ width: '420px' }}
          >
            {/* Card - solid glass background (works inside CSS mask) */}
            <div
              className="relative p-8 rounded-xl"
              style={{
                background: `linear-gradient(135deg, rgba(20, 10, 40, 0.92), rgba(10, 5, 25, 0.95))`,
                border: `2px solid ${color}70`,
                boxShadow: `0 0 50px ${color}40, inset 0 1px 0 rgba(255,255,255,0.08), inset 0 0 80px ${color}10`,
              }}
            >
              {/* Close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white text-sm font-bold"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-5">
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${color}70, ${color}25)`,
                    boxShadow: `0 0 30px ${color}70`,
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 20px ${color}`,
                    }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-center text-white mb-2">
                  {techName}
                </h3>
                <p className="text-sm text-center uppercase tracking-wider opacity-80">
                  {category}
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Sacred Form</p>
                  <p className="text-base font-semibold" style={{ color }}>
                    {info.shape}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Element</p>
                  <p className="text-base font-semibold" style={{ color }}>
                    {info.element}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-gray-300 leading-relaxed">
                {info.desc}
              </p>

              {/* Decorative dots */}
              <div className="flex justify-center gap-1.5 mt-5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: color,
                      boxShadow: `0 0 10px ${color}`,
                      opacity: 0.7,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Pointer/Arrow pointing to shape */}
            <div
              className="absolute left-1/2 -bottom-4 w-0 h-0"
              style={{
                transform: 'translateX(-50%)',
                borderLeft: '16px solid transparent',
                borderRight: '16px solid transparent',
                borderTop: `16px solid ${color}70`,
                filter: `drop-shadow(0 0 12px ${color}50)`,
              }}
            />
          </motion.div>
        </Html>
      )}
    </group>
  )
}
