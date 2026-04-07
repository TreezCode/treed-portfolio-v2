import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'

export function Merkaba() {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  
  // Use quaternion for rotation to avoid gimbal lock
  const targetQuaternion = useRef(new THREE.Quaternion())
  const currentQuaternion = useRef(new THREE.Quaternion())
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect screen size for responsive positioning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  // Responsive scale for mobile
  const scale = isMobile ? 0.6 : 1

  // Professional trackball-style rotation
  const bind = useGesture({
    onDrag: ({ delta: [dx, dy], dragging = false, first }) => {
      if (first) {
        setIsDragging(true)
        // Store current rotation when drag starts
        if (groupRef.current) {
          currentQuaternion.current.copy(groupRef.current.quaternion)
        }
      }
      
      if (!dragging) {
        setIsDragging(false)
        return
      }

      // Calculate rotation based on drag delta
      const rotationSpeed = 0.005
      const deltaRotationQuaternion = new THREE.Quaternion()
        .setFromEuler(new THREE.Euler(
          dy * rotationSpeed,
          dx * rotationSpeed,
          0,
          'XYZ'
        ))

      // Apply rotation relative to camera view
      targetQuaternion.current.multiplyQuaternions(
        deltaRotationQuaternion,
        currentQuaternion.current
      )
      
      // Update current for next frame
      currentQuaternion.current.copy(targetQuaternion.current)
    }
  })

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime
    
    if (outerRef.current && innerRef.current) {
      // Outer tetrahedron rotates clockwise
      outerRef.current.rotation.y += delta * 0.3
      outerRef.current.rotation.x += delta * 0.1

      // Inner tetrahedron rotates counter-clockwise
      innerRef.current.rotation.y -= delta * 0.3
      innerRef.current.rotation.x -= delta * 0.1
    }
    
    // Orbital motion - Merkaba moves in circular path (depth effect)
    if (groupRef.current) {
      const orbitRadius = 1.5
      const orbitSpeed = 0.3
      // Responsive positioning: centered on mobile, right-positioned on desktop
      const baseX = isMobile ? 0 : 2
      const baseY = isMobile ? -2 : -0.5 // Lower position to minimize content overlap
      
      // Apply orbital position
      groupRef.current.position.x = baseX + Math.cos(time * orbitSpeed) * orbitRadius
      groupRef.current.position.y = baseY
      groupRef.current.position.z = Math.sin(time * orbitSpeed) * orbitRadius
      
      // Apply responsive scale
      groupRef.current.scale.setScalar(scale)
      
      // Apply user rotation using quaternion (smooth, no gimbal lock)
      if (isDragging) {
        // Instant response during drag
        groupRef.current.quaternion.copy(targetQuaternion.current)
      } else {
        // Smooth interpolation when not dragging
        groupRef.current.quaternion.slerp(targetQuaternion.current, 0.1)
      }
    }
  })

  return (
    <group ref={groupRef} {...bind()}>
      {/* Outer Tetrahedron Wireframe - pointing up with glow */}
      <mesh ref={outerRef}>
        <tetrahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color="#ff6bff"
          wireframe
          transparent
          opacity={0.9}
          toneMapped={false}
        />
      </mesh>

      {/* Inner Tetrahedron Wireframe - pointing down with glow */}
      <mesh ref={innerRef} rotation={[Math.PI, 0, 0]}>
        <tetrahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
