'use client'

// PERF TESTING: Context provider that parses ?perf= once and distributes PerfFlags
// to all consumers. Wrap the app root with this so every component can read flags
// without each independently calling useSearchParams().

import { createContext, useContext, Suspense } from 'react'
import { usePerfMode, type PerfFlags } from '@/hooks/usePerfMode'

const defaultFlags: PerfFlags = {
  mode: 'none',
  minimalUI: false,
  reducedMotion: false,
  reduced3D: false,
  showOverlay: false,
}

export const PerfContext = createContext<PerfFlags>(defaultFlags)

export function usePerfFlags(): PerfFlags {
  return useContext(PerfContext)
}

function PerfProviderInner({ children }: { children: React.ReactNode }) {
  const flags = usePerfMode()
  return <PerfContext.Provider value={flags}>{children}</PerfContext.Provider>
}

export function PerfProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<PerfContext.Provider value={defaultFlags}>{children}</PerfContext.Provider>}>
      <PerfProviderInner>{children}</PerfProviderInner>
    </Suspense>
  )
}
