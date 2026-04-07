'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

interface PlatonicSolidProps {
  type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron'
  color: string
  position: [number, number, number]
  techName: string
  onClick: () => void
}

export function PlatonicSolid({ type, color, position, techName, onClick }: PlatonicSolidProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Geometry based on type
  const getGeometry = () => {
    switch (type) {
      case 'tetrahedron':
        return new THREE.TetrahedronGeometry(1, 0)
      case 'cube':
        return new THREE.BoxGeometry(1.5, 1.5, 1.5)
      case 'octahedron':
        return new THREE.OctahedronGeometry(1, 0)
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(1, 0)
      case 'icosahedron':
        return new THREE.IcosahedronGeometry(1, 0)
      default:
        return new THREE.IcosahedronGeometry(1, 0)
    }
  }

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Gentle auto-rotation (faster on hover)
      const baseSpeed = isHovered ? 0.4 : 0.2
      meshRef.current.rotation.x += delta * baseSpeed * 0.3
      meshRef.current.rotation.y += delta * baseSpeed * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        {/* Wireframe */}
        <mesh
          ref={meshRef}
          geometry={getGeometry()}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={() => setIsHovered(false)}
          onClick={(e) => {
            e.stopPropagation()
            onClick()
          }}
        >
          <meshStandardMaterial
            color={color}
            wireframe
            transparent
            opacity={isHovered ? 0.8 : 0.4}
            emissive={color}
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* Solid inner core */}
        <mesh geometry={getGeometry()} scale={0.7}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={isHovered ? 0.3 : 0.1}
            emissive={color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Tech name label - always faces camera */}
        <Billboard
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Text
            position={[0, -1.5, 0]}
            fontSize={0.35}
            color={isHovered ? color : '#ffffff'}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#000000"
          >
            {techName}
          </Text>
        </Billboard>

        {/* Glow effect on hover */}
        {isHovered && (
          <pointLight
            color={color}
            intensity={2}
            distance={5}
            decay={2}
          />
        )}
      </group>
    </Float>
  )
}
