'use client'

import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Deterministic seeded PRNG (mulberry32)
function createRng(seed: number) {
  let s = seed | 0
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Orbital ring component
function OrbitalRing({
  radius,
  tube,
  color,
  rotationAxis,
  speed,
  opacity,
  segments = [64, 128],
}: {
  radius: number
  tube: number
  color: string
  rotationAxis: [number, number, number]
  speed: number
  opacity: number
  // PERF TESTING: [tubularSegments, radialSegments] — reduced to [8,16] in reduced-3d
  segments?: [number, number]
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = rotationAxis[0] + t * speed
    ref.current.rotation.y = rotationAxis[1] + t * speed * 0.7
    ref.current.rotation.z = rotationAxis[2] + t * speed * 0.3
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tube, segments[0], segments[1]]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        wireframe
      />
    </mesh>
  )
}

// Particle field orbiting the structure
function ParticleField({ count, radius, color, seed }: { count: number; radius: number; color: string; seed: number }) {
  const ref = useRef<THREE.Points>(null)
  const [rng] = useState(() => createRng(seed))

  const positions = useMemo(() => {
    const rand = rng
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute on a sphere surface
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = radius * (0.8 + rand() * 0.5)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count, radius, rng])

  const sizes = useMemo(() => {
    const rand = rng
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = rand() * 0.03 + 0.01
    }
    return s
  }, [count, rng])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.05
    ref.current.rotation.x = Math.sin(t * 0.03) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.04}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

// Inner energy lines connecting vertices
function EnergyLines({ radius, color }: { radius: number; color: string }) {
  const ref = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    // Create lines connecting icosahedron vertices to dodecahedron vertices
    const ico = new THREE.IcosahedronGeometry(radius * 0.5, 0)
    const dodeca = new THREE.DodecahedronGeometry(radius * 0.75, 0)

    const icoPositions = ico.getAttribute('position')
    const dodecaPositions = dodeca.getAttribute('position')

    const points: number[] = []

    // Connect each ico vertex to nearest dodeca vertex
    for (let i = 0; i < icoPositions.count; i += 3) {
      const ix = icoPositions.getX(i)
      const iy = icoPositions.getY(i)
      const iz = icoPositions.getZ(i)

      // Find a corresponding dodeca vertex
      const di = i % dodecaPositions.count
      const dx = dodecaPositions.getX(di)
      const dy = dodecaPositions.getY(di)
      const dz = dodecaPositions.getZ(di)

      points.push(ix, iy, iz, dx, dy, dz)
    }

    ico.dispose()
    dodeca.dispose()

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3))
    return geo
  }, [radius])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.1
    ref.current.rotation.x = t * 0.07
    // Pulsing opacity
    const mat = ref.current.material as THREE.LineBasicMaterial
    mat.opacity = 0.15 + Math.sin(t * 2) * 0.08
  })

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

interface SacredGeometryOrbProps {
  // PERF TESTING: reduced=true lowers geometry complexity and particle count
  reduced?: boolean
}

export function SacredGeometryOrb({ reduced = false }: SacredGeometryOrbProps) {
  const groupRef = useRef<THREE.Group>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const shellRef = useRef<THREE.Mesh>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime

    // Gentle overall breathing
    if (groupRef.current) {
      const breathe = 1 + Math.sin(t * 0.5) * 0.03
      groupRef.current.scale.setScalar(breathe)
    }

    // Core icosahedron - slow rotation
    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15
      coreRef.current.rotation.y = t * 0.2
    }

    // Middle dodecahedron - opposite rotation
    if (shellRef.current) {
      shellRef.current.rotation.x = -t * 0.1
      shellRef.current.rotation.y = -t * 0.13
      shellRef.current.rotation.z = t * 0.05
    }

    // Outer octahedron - very slow
    if (outerRef.current) {
      outerRef.current.rotation.x = t * 0.05
      outerRef.current.rotation.y = -t * 0.08
    }

    // Glow sphere pulse
    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 1.5) * 0.05
      glowRef.current.scale.setScalar(pulse)
      const mat = glowRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.04 + Math.sin(t * 0.8) * 0.02
    }
  })

  // PERF TESTING: torus ring segments — full (64×128=8192 tris/ring) vs reduced (8×16=128 tris/ring)
  const torusSeg: [number, number] = reduced ? [8, 16] : [64, 128]

  return (
    <group ref={groupRef}>
      {/* Central glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#915eff"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Core - Icosahedron (Purple) */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial
          color="#915eff"
          wireframe
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Inner glow for core */}
      <mesh ref={coreRef ? undefined : undefined}>
        <icosahedronGeometry args={[0.58, 0]} />
        <meshBasicMaterial
          color="#b388ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Middle shell - Dodecahedron (Cyan) */}
      <mesh ref={shellRef}>
        <dodecahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial
          color="#00d4ff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer frame - Octahedron (Pink) */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1.35, 0]} />
        <meshBasicMaterial
          color="#ff6b9d"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Energy lines connecting forms */}
      <EnergyLines radius={1.8} color="#915eff" />

      {/* Orbital rings */}
      <OrbitalRing
        radius={1.6}
        tube={0.005}
        color="#915eff"
        rotationAxis={[0, 0, 0]}
        speed={0.2}
        opacity={0.35}
        segments={torusSeg}
      />
      <OrbitalRing
        radius={1.7}
        tube={0.004}
        color="#00d4ff"
        rotationAxis={[Math.PI / 3, 0, Math.PI / 6]}
        speed={-0.15}
        opacity={0.25}
        segments={torusSeg}
      />
      <OrbitalRing
        radius={1.8}
        tube={0.003}
        color="#ff6b9d"
        rotationAxis={[-Math.PI / 4, Math.PI / 5, 0]}
        speed={0.12}
        opacity={0.2}
        segments={torusSeg}
      />

      {/* PERF TESTING: particle counts halved in reduced mode */}
      <ParticleField count={reduced ? 80 : 200} radius={2.0} color="#915eff" seed={42} />
      <ParticleField count={reduced ? 40 : 100} radius={2.2} color="#00d4ff" seed={137} />
      {(!reduced) && <ParticleField count={60} radius={2.4} color="#ff6b9d" seed={256} />}

      {/* Ambient point lights for subtle illumination */}
      <pointLight color="#915eff" intensity={0.5} distance={5} position={[2, 0, 0]} />
      <pointLight color="#00d4ff" intensity={0.3} distance={5} position={[-2, 1, 0]} />
      <pointLight color="#ff6b9d" intensity={0.2} distance={5} position={[0, -1, 2]} />
    </group>
  )
}
