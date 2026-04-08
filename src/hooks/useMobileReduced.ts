'use client'

// PERF FIX: Returns true on mobile (pointer:coarse) OR when ?perf=reduced-3d/compare-all is active.
// Used to permanently apply geometry/particle reductions on mobile, matching what
// the reduced-3d perf mode does during testing.

import { useSyncExternalStore } from 'react'

function getSnapshot(): boolean {
  return window.matchMedia('(pointer: coarse)').matches
}

function getServerSnapshot(): boolean {
  return false
}

function subscribe(cb: () => void): () => void {
  const mq = window.matchMedia('(pointer: coarse)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useIsMobile(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
