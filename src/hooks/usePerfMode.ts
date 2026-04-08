'use client'

import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'

// PERF TESTING: query-param driven performance mode toggles.
// Usage: append ?perf=<mode> to any URL.
// Modes: minimal-ui | reduced-motion | reduced-3d | compare-all
// These flags NEVER affect production behaviour — they are opt-in only via URL.

export type PerfMode = 'none' | 'minimal-ui' | 'reduced-motion' | 'reduced-3d' | 'compare-all'

export interface PerfFlags {
  mode: PerfMode
  // minimal-ui: strip compositing-heavy CSS (backdrop-blur, mix-blend-mode, decorative shadows)
  minimalUI: boolean
  // reduced-motion: near-zero Framer Motion transitions, no looping CSS animations
  reducedMotion: boolean
  // reduced-3d: cap DPR=1, disable Bloom, halve particles, reduce geometry detail
  reduced3D: boolean
  // dev overlay visible
  showOverlay: boolean
}

export function usePerfMode(): PerfFlags {
  const searchParams = useSearchParams()
  const raw = (searchParams?.get('perf') ?? 'none') as PerfMode

  return useMemo<PerfFlags>(() => {
    const compareAll = raw === 'compare-all'
    return {
      mode: raw,
      minimalUI: raw === 'minimal-ui' || compareAll,
      reducedMotion: raw === 'reduced-motion' || compareAll,
      reduced3D: raw === 'reduced-3d' || compareAll,
      showOverlay: raw !== 'none',
    }
  }, [raw])
}
