'use client'

import dynamic from 'next/dynamic'
import { Component, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from 'framer-motion'
import { usePerfFlags } from '@/components/perf/PerfProvider'
import styles from './HeroScene.module.css'

interface StaticGeometryProps {
  className?: string
}

function StaticGeometry({ className }: StaticGeometryProps) {
  return (
    <div className={`hero-geometry-fallback ${className ?? ''}`} aria-hidden="true">
      <svg viewBox="0 0 640 640" role="presentation">
        <g fill="none" stroke="currentColor">
          <circle cx="320" cy="320" r="214" opacity="0.25" />
          <circle cx="320" cy="320" r="150" opacity="0.18" />
          <path d="m320 92 198 342H122L320 92Z" opacity="0.72" />
          <path d="m320 548 198-342H122l198 342Z" opacity="0.46" />
          <path d="M122 206 518 434M518 206 122 434M320 92v456" opacity="0.2" />
          <circle cx="320" cy="320" r="8" fill="currentColor" stroke="none" opacity="0.65" />
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
  },
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

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')

    if (!context) return false

    context.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

export function HeroScene() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isActive, setIsActive] = useState(true)
  const [canRenderScene, setCanRenderScene] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const perf = usePerfFlags()
  const shouldReduceMotion = Boolean(prefersReducedMotion || perf.reducedMotion)
  const revealScene = useCallback(() => setSceneReady(true), [])
  const showFallback = useCallback(() => setSceneReady(false), [])

  // Keep the server and first client render identical. WebGL is a desktop,
  // fine-pointer enhancement and loads only after the critical page work is idle.
  // Mobile and touch-first visitors keep the lightweight static geometry.
  useEffect(() => {
    const desktopFinePointer = window.matchMedia('(min-width: 768px) and (pointer: fine)')
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

    const updateScenePreference = () => {
      cancelScheduledWork()
      frameId = window.requestAnimationFrame(() => {
        if (shouldReduceMotion || !desktopFinePointer.matches) {
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
          idleId = idleWindow.requestIdleCallback(mountScene, { timeout: 1400 })
        } else {
          timeoutId = window.setTimeout(mountScene, 900)
        }
      })
    }

    updateScenePreference()
    desktopFinePointer.addEventListener('change', updateScenePreference)

    return () => {
      desktopFinePointer.removeEventListener('change', updateScenePreference)
      cancelScheduledWork()
    }
  }, [shouldReduceMotion])

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { rootMargin: '160px 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const rootClassName = [
    'hero-scene',
    canRenderScene ? styles.webglMounted : '',
    canRenderScene && sceneReady ? styles.ready : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={rootClassName} aria-hidden="true">
      <StaticGeometry className={styles.fallbackLayer} />
      {canRenderScene && (
        <WebGLBoundary onUnavailable={showFallback}>
          <DynamicScene
            active={isActive}
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
