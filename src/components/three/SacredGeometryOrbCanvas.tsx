'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload } from '@react-three/drei'
import { SacredGeometryOrb } from './SacredGeometryOrb'
import { FPSTracker } from '@/components/perf/FPSTracker'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import { useMobileDpr } from '@/hooks/useMobileDpr'
import { useIsMobile } from '@/hooks/useMobileReduced'

interface SacredGeometryOrbCanvasProps {
  className?: string
}

export function SacredGeometryOrbCanvas({ className }: SacredGeometryOrbCanvasProps) {
  const perf = usePerfFlags()
  const mobileDpr = useMobileDpr()
  const isMobile = useIsMobile()
  // PERF FIX: cap DPR and reduce geometry on mobile permanently; perf mode stacks on top
  const dpr = perf.reduced3D ? 1 : mobileDpr
  const reduced = isMobile || perf.reduced3D

  return (
    <div className={className} style={{ touchAction: 'none' }}>
      <Canvas
        camera={{ fov: 35, near: 0.1, far: 200, position: [0, 0, 8] }}
        dpr={dpr}
        gl={{ preserveDrawingBuffer: false, alpha: true }}
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
          {/* PERF FIX: reduced=true on mobile permanently + in reduced-3d perf mode */}
          <SacredGeometryOrb reduced={reduced} />
          <Preload all />
        </Suspense>
        <FPSTracker label="orb" mode={perf.mode} />
      </Canvas>
    </div>
  )
}
