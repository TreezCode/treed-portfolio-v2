'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { SacredGeometryOrb } from './SacredGeometryOrb'
import { FPSTracker } from '@/components/perf/FPSTracker'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import { useMobileDpr } from '@/hooks/useMobileDpr'
import { useIsMobile } from '@/hooks/useMobileReduced'
import { ScrollThrough, StageControls } from './CanvasStage'

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
    <div
      className={className}
      style={{
        cursor: !isMobile ? 'grab' : 'default',
        position: 'relative'
      }}
    >
      <Canvas
        camera={{ fov: 35, near: 0.1, far: 200, position: [0, 0, 8] }}
        dpr={dpr}
        gl={{ preserveDrawingBuffer: false, alpha: true }}
        style={{ cursor: 'inherit', width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          {/* Shared interaction contract: rotate only, scroll always passes through */}
          <StageControls
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
          <ambientLight intensity={0.1} />
          {/* PERF FIX: reduced=true on mobile permanently + in reduced-3d perf mode */}
          <SacredGeometryOrb reduced={reduced} />
          <Preload all />
        </Suspense>
        <ScrollThrough />
        <FPSTracker label="orb" mode={perf.mode} />
      </Canvas>
    </div>
  )
}
