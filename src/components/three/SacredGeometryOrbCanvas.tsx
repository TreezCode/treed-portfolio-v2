'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { SacredGeometryOrb } from './SacredGeometryOrb'

interface SacredGeometryOrbCanvasProps {
  className?: string
}

export function SacredGeometryOrbCanvas({ className }: SacredGeometryOrbCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          fov: 35,
          near: 0.1,
          far: 200,
          position: [0, 0, 8],
        }}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.4}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.1} />
          <SacredGeometryOrb />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
