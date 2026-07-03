'use client'

import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

/**
 * Shared canvas interaction contract (see DESIGN.md, "WebGL Scenes"):
 * scroll always passes through, zoom is never captured, no lock/unlock UI.
 *
 * Drop <ScrollThrough /> inside every <Canvas>. It forces `touch-action: pan-y`
 * on the canvas element (R3F sets 'none' by default), so vertical swipes scroll
 * the page while horizontal drags still reach the scene.
 */
export function ScrollThrough() {
  const { gl } = useThree()
  useEffect(() => {
    gl.domElement.style.touchAction = 'pan-y'
  }, [gl])
  return null
}

interface StageControlsProps {
  autoRotate?: boolean
  autoRotateSpeed?: number
  minPolarAngle?: number
  maxPolarAngle?: number
}

/**
 * Preconfigured OrbitControls matching the shared contract: rotate only.
 * Zoom and pan are permanently disabled so the scroll wheel and pinch
 * gestures always belong to the page, never the scene.
 */
export function StageControls({
  autoRotate = false,
  autoRotateSpeed = 0.4,
  minPolarAngle,
  maxPolarAngle,
}: StageControlsProps) {
  return (
    <OrbitControls
      enableZoom={false}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      minPolarAngle={minPolarAngle}
      maxPolarAngle={maxPolarAngle}
    />
  )
}
