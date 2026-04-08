'use client'

// PERF TESTING: Thin wrapper that reads PerfContext and conditionally renders the overlay.
// Imported in layout.tsx so the overlay is available on every page.

import { usePerfFlags } from '@/components/perf/PerfProvider'
import { PerfOverlay } from '@/components/perf/PerfOverlay'

export function PerfOverlayRoot() {
  const { showOverlay } = usePerfFlags()
  return <PerfOverlay show={showOverlay} />
}
