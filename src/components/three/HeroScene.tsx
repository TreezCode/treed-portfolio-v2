'use client'

import dynamic from 'next/dynamic'
import { Component, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import styles from './HeroScene.module.css'

interface StaticGeometryProps {
  className?: string
  animated?: boolean
}

function StaticGeometry({ className, animated = false }: StaticGeometryProps) {
  return (
    <div
      className={`hero-geometry-fallback ${className ?? ''} ${animated ? styles.vectorMotion : ''}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 640 640" role="presentation">
        <g fill="none" stroke="currentColor">
          <g className={styles.calibrationRing} opacity="0.25">
            <circle cx="320" cy="320" r="214" />
            <path d="M320 92v22M320 526v22M92 320h22M526 320h22" />
            <path d="m159 159 16 16m290 290 16 16m0-322-16 16M175 465l-16 16" />
          </g>
          <circle cx="320" cy="320" r="150" opacity="0.18" />
          <g className={styles.outerTetrahedron}>
            <path d="m320 92 198 342H122L320 92Z" opacity="0.72" />
            <path d="M122 434 320 320l198 114" opacity="0.18" />
          </g>
          <g className={styles.innerTetrahedron}>
            <path d="m320 548 198-342H122l198 342Z" opacity="0.46" />
            <path d="M122 206 320 320l198-114" opacity="0.16" />
          </g>
          <g className={styles.measurementAxes} opacity="0.2">
            <path d="M122 206 518 434M518 206 122 434M320 92v456" />
            <circle cx="320" cy="320" r="34" />
          </g>
          <circle
            className={styles.geometryCore}
            cx="320"
            cy="320"
            r="8"
            fill="currentColor"
            stroke="none"
            opacity="0.65"
          />
        </g>
      </svg>
    </div>
  )
}

const DynamicScene = dynamic(
  () => import('./SacredGeometryScene').then((module) => module.SacredGeometryScene),
  {
    ssr: false,
    loading: () => null,
  }
)

interface WebGLBoundaryProps {
  children: ReactNode
  onUnavailable: () => void
}

interface WebGLBoundaryState {
  failed: boolean
}

class WebGLBoundary extends Component<WebGLBoundaryProps, WebGLBoundaryState> {
  state: WebGLBoundaryState = { failed: false }

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { failed: true }
  }

  componentDidCatch() {
    this.props.onUnavailable()
  }

  render() {
    return this.state.failed ? null : this.props.children
  }
}

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string
  saveData?: boolean
}

interface CapabilityNavigator extends Navigator {
  connection?: NetworkInformationLike
  deviceMemory?: number
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const options: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      failIfMajorPerformanceCaveat: true,
      powerPreference: 'high-performance',
    }
    const context = canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options)

    if (!context) return false

    context.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function hasConstrainedRenderingBudget() {
  const capabilityNavigator = navigator as CapabilityNavigator
  const connection = capabilityNavigator.connection
  const lowBandwidth =
    connection?.saveData === true ||
    connection?.effectiveType === 'slow-2g' ||
    connection?.effectiveType === '2g'
  const lowMemory =
    typeof capabilityNavigator.deviceMemory === 'number' && capabilityNavigator.deviceMemory <= 2
  const lowConcurrency =
    typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 2

  return lowBandwidth || lowMemory || lowConcurrency
}

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)
  const [isDocumentVisible, setIsDocumentVisible] = useState(true)
  const [canRenderScene, setCanRenderScene] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const [vectorMotionEnabled, setVectorMotionEnabled] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const perf = usePerfFlags()
  const shouldReduceMotion = Boolean(prefersReducedMotion || perf.reducedMotion)
  const revealScene = useCallback(() => setSceneReady(true), [])
  const showFallback = useCallback(() => setSceneReady(false), [])

  // Keep the server and first client render identical, then enhance based on
  // actual rendering capability. Coarse pointers receive the measured DPR=1,
  // no-bloom tier inside SacredGeometryScene instead of being excluded here.
  useEffect(() => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (handle: number) => void
    }
    let frameId: number | undefined
    let timeoutId: number | undefined
    let idleId: number | undefined

    const cancelScheduledWork = () => {
      if (frameId !== undefined) window.cancelAnimationFrame(frameId)
      if (timeoutId !== undefined) window.clearTimeout(timeoutId)
      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId)
      frameId = undefined
      timeoutId = undefined
      idleId = undefined
    }

    cancelScheduledWork()
    frameId = window.requestAnimationFrame(() => {
      setVectorMotionEnabled(!shouldReduceMotion)

      if (shouldReduceMotion || hasConstrainedRenderingBudget()) {
        setSceneReady(false)
        setCanRenderScene(false)
        return
      }

      const mountScene = () => {
        if (!supportsWebGL()) {
          setSceneReady(false)
          setCanRenderScene(false)
          return
        }

        setCanRenderScene(true)
      }

      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(mountScene, { timeout: 1000 })
      } else {
        timeoutId = window.setTimeout(mountScene, 450)
      }
    })

    return cancelScheduledWork
  }, [shouldReduceMotion])

  useEffect(() => {
    const updateVisibility = () => {
      setIsDocumentVisible(document.visibilityState !== 'hidden')
    }

    updateVisibility()
    document.addEventListener('visibilitychange', updateVisibility)

    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      rootMargin: '160px 0px',
    })
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const rootClassName = [
    'hero-scene',
    styles.root,
    canRenderScene ? styles.webglMounted : '',
    canRenderScene && sceneReady ? styles.ready : '',
    sceneReady || !isInView || !isDocumentVisible ? styles.vectorPaused : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={rootClassName} aria-hidden="true">
      <StaticGeometry className={styles.fallbackLayer} animated={vectorMotionEnabled} />
      {canRenderScene && (
        <WebGLBoundary onUnavailable={showFallback}>
          <DynamicScene
            active={isInView && isDocumentVisible}
            perfFlags={perf}
            className={styles.sceneLayer}
            onReady={revealScene}
            onUnavailable={showFallback}
          />
        </WebGLBoundary>
      )}
    </div>
  )
}
