'use client'

// PERF TESTING: FPS tracker. Rendered inside an R3F Canvas.
// Pushes structured entries to perfLogStore (downloadable from the overlay).
// Also echoes to console when available. Safe in production — guard is inside useFrame.

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { perfLog } from './perfLogStore'
import type { PerfMode } from '@/hooks/usePerfMode'

interface FPSTrackerProps {
  label?: string
  mode?: PerfMode
}

export function FPSTracker({ label = 'canvas', mode = 'none' }: FPSTrackerProps) {
  const frameTimes = useRef<number[]>([])
  const lastSample = useRef(performance.now())
  const lastFrame = useRef(performance.now())
  const { gl } = useThree()

  useEffect(() => {
    const dpr = gl.getPixelRatio()
    const w = gl.domElement.width
    const h = gl.domElement.height
    const entry = {
      ts: performance.now(),
      type: 'init' as const,
      label,
      mode: mode ?? 'none',
      data: {
        dpr,
        drawBuffer: `${w}×${h}`,
        viewport: `${window.innerWidth}×${window.innerHeight}`,
        userAgent: navigator.userAgent,
      },
    }
    perfLog.push(entry)
    console.log(`[perf:${label}] init`, entry.data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, mode])

  useFrame(() => {
    const now = performance.now()
    frameTimes.current.push(now - lastFrame.current)
    lastFrame.current = now

    // Emit a sample every 5 seconds
    if (now - lastSample.current < 5000) return

    const times = frameTimes.current
    if (times.length === 0) return

    const avgMs = times.reduce((a, b) => a + b, 0) / times.length
    const maxMs = Math.max(...times)
    const minMs = Math.min(...times)
    const fps = Math.round(1000 / avgMs)
    const spikes = times.filter((t) => t > 33.3).length

    const entry = {
      ts: now,
      type: 'fps-sample' as const,
      label,
      mode: mode ?? 'none',
      data: {
        avgFps: fps,
        avgFrameMs: parseFloat(avgMs.toFixed(2)),
        worstFrameMs: parseFloat(maxMs.toFixed(2)),
        bestFrameMs: parseFloat(minMs.toFixed(2)),
        spikeCount: spikes,
        sampleCount: times.length,
        dpr: gl.getPixelRatio(),
      },
    }
    perfLog.push(entry)
    console.log(`[perf:${label}] ${fps}fps avg=${avgMs.toFixed(1)}ms worst=${maxMs.toFixed(1)}ms spikes=${spikes}/${times.length}`)

    frameTimes.current = []
    lastSample.current = now
  })

  return null
}
