'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Merkaba } from './Merkaba'
import { QuantumField } from './QuantumField'
import { Loader } from './Loader'
import { FPSTracker } from '@/components/perf/FPSTracker'
import { useMobileDpr } from '@/hooks/useMobileDpr'
import { useIsMobile } from '@/hooks/useMobileReduced'
import type { PerfFlags } from '@/hooks/usePerfMode'

function CanvasInitTouchAction({ isMobile }: { isMobile: boolean }) {
  const { gl } = useThree()
  const canvasEl = useRef<HTMLCanvasElement>(gl.domElement)
  useEffect(() => {
    // Set initial touch-action: pan-y on mobile so empty-canvas touches scroll.
    // Merkaba's onPointerDown/Up handlers dynamically flip to 'none'/'pan-y'
    // only while the user is actively dragging the mesh.
    canvasEl.current.style.touchAction = isMobile ? 'pan-y' : 'none'
  }, [isMobile])
  return null
}

interface SacredGeometrySceneProps {
  className?: string
  // PERF TESTING: optional perf flags passed from parent
  perfFlags?: Partial<PerfFlags>
}

export function SacredGeometryScene({ className, perfFlags }: SacredGeometrySceneProps) {
  // PERF FIX: permanently cap DPR on mobile — data shows DPR=2 causes 400–900ms GPU stalls
  const mobileDpr = useMobileDpr()
  const isMobile = useIsMobile()
  // reduced-3d perf mode forces DPR=1 on top of the mobile cap
  const dpr = perfFlags?.reduced3D ? 1 : mobileDpr
  // Reduce geometry complexity on mobile permanently, same as reduced-3d perf mode
  const reduced = isMobile || !!perfFlags?.reduced3D
  const bloomEnabled = !reduced

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={dpr}
        gl={{ 
          antialias: !reduced,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#915eff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />

          {/* Sacred Geometry Components */}
          <Merkaba />
          {/* PERF FIX: reduced=true on mobile permanently + in reduced-3d perf mode */}
          <QuantumField reduced={reduced} />

          {/* Post-processing Effects — disabled in reduced-3d */}
          {bloomEnabled && (
            <EffectComposer>
              <Bloom
                intensity={1.2}
                luminanceThreshold={0.2}
                luminanceSmoothing={0.9}
                radius={0.6}
              />
            </EffectComposer>
          )}
        </Suspense>

        <CanvasInitTouchAction isMobile={isMobile} />
        {/* PERF TESTING: FPS instrumentation, dev-only no-op in production */}
        <FPSTracker label="hero" mode={perfFlags?.mode} />
      </Canvas>
    </div>
  )
}
