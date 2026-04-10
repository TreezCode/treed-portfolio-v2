import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import * as THREE from 'three'

export function Merkaba() {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  // All drag state in refs — zero re-renders during drag, no stale closure issues
  const isDragging = useRef(false)
  const lastPointer = useRef<{ x: number; y: number } | null>(null)
  const targetQuaternion = useRef(new THREE.Quaternion())

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const scale = isMobile ? 0.6 : 1

  const { gl, camera } = useThree()

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    e.nativeEvent.preventDefault()
    gl.domElement.setPointerCapture(e.pointerId)
    isDragging.current = true
    lastPointer.current = { x: e.clientX, y: e.clientY }
    // Snapshot current group quaternion as the rotation base
    if (groupRef.current) targetQuaternion.current.copy(groupRef.current.quaternion)
  }

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!isDragging.current || !lastPointer.current) return
    e.stopPropagation()
    e.nativeEvent.preventDefault()
    
    const dx = e.clientX - lastPointer.current.x
    const dy = e.clientY - lastPointer.current.y
    lastPointer.current = { x: e.clientX, y: e.clientY }

    const speed = 0.008

    // Rotate around the camera's actual right axis (horizontal drag) and
    // world up axis (vertical drag) so controls always match what the user sees,
    // regardless of how the Merkaba's quaternion has accumulated.
    const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
    const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion)

    const rotX = new THREE.Quaternion().setFromAxisAngle(cameraRight, dy * speed)
    const rotY = new THREE.Quaternion().setFromAxisAngle(cameraUp, dx * speed)

    targetQuaternion.current.premultiply(rotY).premultiply(rotX)

    // Apply immediately during drag — no slerp lag on mobile
    if (groupRef.current) groupRef.current.quaternion.copy(targetQuaternion.current)
  }

  const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    gl.domElement.releasePointerCapture(e.pointerId)
    isDragging.current = false
    lastPointer.current = null
  }

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
      
      // During drag: already applied directly in handlePointerMove — nothing to do.
      // When idle: smoothly slerp toward the last target quaternion.
      // Use frame-rate-independent formula: 1 - exp(-k*delta) so it feels
      // the same at 30fps and 60fps on mobile.
      if (!isDragging.current) {
        groupRef.current.quaternion.slerp(targetQuaternion.current, 1 - Math.exp(-8 * delta))
      }
    }
  })

  return (
    <group ref={groupRef}>
      {/* Interactive hit sphere - DESKTOP ONLY
          On mobile: disabled to prevent scroll conflicts and pull-to-refresh issues.
          Mobile users get smooth auto-rotation without interaction conflicts. */}
      {!isMobile && (
        <mesh
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          <sphereGeometry args={[1.8, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

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
