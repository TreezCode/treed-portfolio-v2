import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function EnergyRings() {
  const ringsRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!ringsRef.current) return

    const time = state.clock.elapsedTime

    ringsRef.current.children.forEach((ring, i) => {
      // Subtle pulse effect
      const scale = 1 + Math.sin(time * 1 - i * 0.8) * 0.1
      ring.scale.setScalar(scale)

      // Subtle fade in/out
      const material = (ring as THREE.Mesh).material as THREE.MeshBasicMaterial
      material.opacity = 0.15 + Math.sin(time * 1 - i * 0.8) * 0.1
    })
  })

  return (
    <group ref={ringsRef} position={[2, 0, 0]}>
      {[0].map((i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.01, 16, 100]} />
          <meshBasicMaterial
            color="#915eff"
            transparent
            opacity={0.25}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}
