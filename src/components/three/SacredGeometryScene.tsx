'use client'

import { lazy, Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Merkaba } from './Merkaba'
import { QuantumField } from './QuantumField'
import { FPSTracker } from '@/components/perf/FPSTracker'
import { useMobileDpr } from '@/hooks/useMobileDpr'
import { useIsMobile } from '@/hooks/useMobileReduced'
import { ScrollThrough } from './CanvasStage'
import type { PerfFlags } from '@/hooks/usePerfMode'

const BloomEffects = lazy(async () => {
  const { Bloom, EffectComposer } = await import('@react-three/postprocessing')

  function HeroBloomEffects() {
    return (
      <EffectComposer>
        <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} radius={0.6} />
      </EffectComposer>
    )
  }

  return { default: HeroBloomEffects }
})

interface SacredGeometrySceneProps {
  className?: string
  active?: boolean
  onReady?: () => void
  onUnavailable?: () => void
  // PERF TESTING: optional perf flags passed from parent
  perfFlags?: Partial<PerfFlags>
}

interface SceneLifecycleProps {
  active: boolean
  onReady?: () => void
  onUnavailable?: () => void
}

function SceneLifecycle({ active, onReady, onUnavailable }: SceneLifecycleProps) {
  const { gl, invalidate } = useThree()
  const renderedFrames = useRef(0)
  const readySent = useRef(false)

  useEffect(() => {
    const canvas = gl.domElement

    const handleContextLost = (event: Event) => {
      event.preventDefault()
      renderedFrames.current = 0
      readySent.current = false
      onUnavailable?.()
    }

    const handleContextRestored = () => {
      renderedFrames.current = 0
      readySent.current = false
      invalidate()
    }

    canvas.addEventListener('webglcontextlost', handleContextLost)
    canvas.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost)
      canvas.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [gl, invalidate, onUnavailable])

  useFrame(() => {
    if (!active || readySent.current) return

    renderedFrames.current += 1
    if (renderedFrames.current < 2) return

    readySent.current = true
    onReady?.()
  })

  return null
}

export function SacredGeometryScene({
  className,
  active = true,
  onReady,
  onUnavailable,
  perfFlags,
}: SacredGeometrySceneProps) {
  // PERF FIX: permanently cap DPR on mobile — data shows DPR=2 causes 400–900ms GPU stalls
  const mobileDpr = useMobileDpr()
  const hasCoarsePointer = useIsMobile()
  // The coarse-pointer tier is measured at DPR=1 with reduced geometry and no
  // post-processing. It preserves the real spatial scene without mobile stalls.
  const reduced = hasCoarsePointer || !!perfFlags?.reduced3D
  const dpr = reduced ? 1 : mobileDpr
  const bloomEnabled = !reduced

  return (
    <div
      className={className}
      style={{ cursor: hasCoarsePointer ? 'default' : 'grab', touchAction: 'pan-y' }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        frameloop={active ? 'always' : 'demand'}
        dpr={dpr}
        gl={{
          antialias: !reduced,
          alpha: true,
          failIfMajorPerformanceCaveat: true,
          powerPreference: 'high-performance',
        }}
        style={{ cursor: 'inherit', touchAction: 'pan-y' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#915eff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#00d4ff" />

          {/* Sacred Geometry Components */}
          <Merkaba reduced={reduced} interactive={!hasCoarsePointer} />
          {/* PERF FIX: reduced=true on mobile permanently + in reduced-3d perf mode */}
          <QuantumField reduced={reduced} />

          {/* Desktop-only and split from the mobile scene bundle path. */}
          {bloomEnabled && <BloomEffects />}

          <SceneLifecycle active={active} onReady={onReady} onUnavailable={onUnavailable} />
        </Suspense>

        {/* Shared interaction contract: scroll always passes through */}
        <ScrollThrough />
        {/* PERF TESTING: FPS instrumentation, dev-only no-op in production */}
        <FPSTracker label="hero" mode={perfFlags?.mode} />
      </Canvas>
    </div>
  )
}
