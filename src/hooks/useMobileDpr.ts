'use client'

// PERF FIX: Cap WebGL canvas DPR on mobile devices.
// Data shows DPR=2 causes 400–900ms GPU stall spikes on Android.
// Mobile browsers report DPR=2–3; we cap at 1 to eliminate fill-rate bottleneck.
// Desktop is left uncapped (max 2) since GPU headroom is sufficient.
//
// useSyncExternalStore is the correct React API for SSR-safe client-only values:
//   - getServerSnapshot returns the safe SSR default ([1,2])
//   - getSnapshot runs on the client and reads window.matchMedia
//   - subscribe wires up mediaQuery change events so it stays reactive

import { useSyncExternalStore } from 'react'

const DESKTOP: [number, number] = [1, 2]
const MOBILE: [number, number] = [1, 1]

function getSnapshot(): [number, number] {
  return window.matchMedia('(pointer: coarse)').matches ? MOBILE : DESKTOP
}

function getServerSnapshot(): [number, number] {
  return DESKTOP
}

function subscribe(cb: () => void): () => void {
  const mq = window.matchMedia('(pointer: coarse)')
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useMobileDpr(): [number, number] {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
