import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PARTICLE_COUNT = 200
const VORTEX_RADIUS = 8 // Horizontal distance from center
const VORTEX_HEIGHT = 10 // Vertical spread
const ROTATION_SPEED = 0.3 // Clockwise rotation speed

interface Particle {
  theta: number // Angle around Y-axis (horizontal rotation)
  y: number // Vertical position
  radius: number // Distance from center axis
  speed: number // Individual rotation speed multiplier
  size: number // Particle size
  phaseOffset: number // For subtle variation
}

// Pure function to create particles in vortex/tornado pattern
function createParticles(): Particle[] {
  const temp: Particle[] = []
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    temp.push({
      theta: Math.random() * Math.PI * 2,
      y: (Math.random() - 0.5) * VORTEX_HEIGHT, // Spread vertically
      radius: 4 + Math.random() * VORTEX_RADIUS, // Vary distance from center
      speed: 0.8 + Math.random() * 0.4,
      size: 0.015 + Math.random() * 0.01,
      phaseOffset: Math.random() * Math.PI * 2
    })
  }
  return temp
}

export function QuantumField() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  
  // Initialize particles once using useState
  const [particles] = useState(createParticles)

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.elapsedTime
    const dummy = new THREE.Object3D()

    particles.forEach((particle, i) => {
      // Rotate particles clockwise around Y-axis (tornado effect)
      particle.theta += ROTATION_SPEED * particle.speed * 0.01
      
      // Add subtle vertical spiral motion
      const verticalSpiral = Math.sin(time * 0.3 + particle.phaseOffset) * 0.5
      const currentY = particle.y + verticalSpiral
      
      // Subtle radius pulsing for organic feel
      const radiusPulse = Math.sin(time * 0.4 + particle.phaseOffset) * 0.3
      const currentRadius = particle.radius + radiusPulse

      // Convert cylindrical coordinates to Cartesian (tornado vortex)
      const x = currentRadius * Math.cos(particle.theta)
      const y = currentY
      const z = currentRadius * Math.sin(particle.theta)

      // Position particle
      dummy.position.set(x, y, z)
      
      // Subtle size pulsing
      const pulse = 1 + Math.sin(time * 2 + particle.phaseOffset) * 0.15
      dummy.scale.setScalar(particle.size * pulse)
      
      dummy.updateMatrix()
      meshRef.current!.setMatrixAt(i, dummy.matrix)
    })

    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial
        color="#00d4ff"
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  )
}
