'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { Earth } from './Earth'

interface EarthCanvasProps {
  className?: string
}

export function EarthCanvas({ className }: EarthCanvasProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{
          fov: 20,
          near: 0.1,
          far: 200,
          position: [1, 3, 6],
        }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls
            autoRotate
            autoRotateSpeed={0.5}
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
