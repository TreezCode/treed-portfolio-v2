'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text, Billboard } from '@react-three/drei'
import * as THREE from 'three'

interface PlatonicSolidProps {
  type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron'
  color: string
  position: [number, number, number]
  techName: string
  onClick: () => void
  delay?: number // Staggered entrance animation delay
}

export function PlatonicSolid({ type, color, position, techName, onClick, delay = 0 }: PlatonicSolidProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isDark, setIsDark] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  
  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Staggered entrance animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

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
    // Entrance animation
    if (isVisible && animationProgress < 1) {
      setAnimationProgress(prev => Math.min(prev + delta * 2.5, 1))
      
      if (groupRef.current) {
        // Smooth easing function (ease-out cubic)
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
        const progress = easeOut(animationProgress)
        
        // Scale from 0.3 to 1 with smooth easing
        groupRef.current.scale.setScalar(0.3 + progress * 0.7)
        
        // Fade in opacity (handled via material opacity below)
      }
    }
    
    if (meshRef.current) {
      // Gentle auto-rotation (faster on hover)
      const baseSpeed = isHovered ? 0.4 : 0.2
      meshRef.current.rotation.x += delta * baseSpeed * 0.3
      meshRef.current.rotation.y += delta * baseSpeed * 0.5
    }
  })

  // Calculate opacity based on animation progress
  const currentOpacity = isVisible ? Math.min(animationProgress, 1) : 0
  
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
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
            opacity={(isHovered ? 0.8 : 0.4) * currentOpacity}
            emissive={color}
            emissiveIntensity={(isHovered ? 0.5 : 0.2) * currentOpacity}
          />
        </mesh>

        {/* Solid inner core */}
        <mesh geometry={getGeometry()} scale={0.7}>
          <meshStandardMaterial
            color={color}
            transparent
            opacity={(isHovered ? 0.3 : 0.1) * currentOpacity}
            emissive={color}
            emissiveIntensity={(isHovered ? 0.3 : 0.1) * currentOpacity}
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
            color={isHovered ? color : (isDark ? '#f8f8f8' : '#1a1a2e')}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor={isDark ? '#000000' : '#ffffff'}
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
