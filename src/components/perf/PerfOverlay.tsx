'use client'

// PERF TESTING: Fixed overlay shown when any ?perf= param is active.
// Shows active mode switcher, live log count, and a Save Logs button that
// downloads all collected FPS samples as a JSON file — no USB debugging needed.

import { Suspense, useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { perfLog } from './perfLogStore'
import type { PerfMode } from '@/hooks/usePerfMode'

// Module-level to avoid React compiler "value cannot be modified" warning on window.location
function navigateToPerfMode(mode: PerfMode) {
  const url = new URL(window.location.href)
  if (mode === 'none') url.searchParams.delete('perf')
  else url.searchParams.set('perf', mode)
  window.location.assign(url.toString())
}

const MODES: { id: PerfMode; label: string; color: string }[] = [
  { id: 'none', label: 'Baseline', color: '#555' },
  { id: 'minimal-ui', label: 'Minimal UI', color: '#f59e0b' },
  { id: 'reduced-motion', label: 'No Motion', color: '#3b82f6' },
  { id: 'reduced-3d', label: 'Reduced 3D', color: '#10b981' },
  { id: 'compare-all', label: 'All Off', color: '#ef4444' },
]

function PerfOverlayInner() {
  const searchParams = useSearchParams()
  const active = (searchParams?.get('perf') ?? 'none') as PerfMode
  const [logCount, setLogCount] = useState(0)
  const [saved, setSaved] = useState(false)

  // Poll the log store every 2s to update the count display
  useEffect(() => {
    const id = setInterval(() => setLogCount(perfLog.count()), 2000)
    return () => clearInterval(id)
  }, [])

  const handleSave = () => {
    perfLog.download(active)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleClear = () => {
    perfLog.clear()
    setLogCount(0)
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 12,
        right: 12,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.92)',
        border: '1px solid #333',
        borderRadius: 8,
        padding: '8px 10px',
        fontFamily: 'monospace',
        fontSize: 11,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        backdropFilter: 'none',
        pointerEvents: 'auto',
        minWidth: 110,
      }}
    >
      <span style={{ color: '#888', marginBottom: 2 }}>⚡ perf mode</span>

      {MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => navigateToPerfMode(m.id)}
          style={{
            background: active === m.id ? m.color : 'transparent',
            color: active === m.id ? '#fff' : '#aaa',
            border: `1px solid ${active === m.id ? m.color : '#444'}`,
            borderRadius: 4,
            padding: '3px 6px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            fontSize: 11,
            textAlign: 'left',
          }}
        >
          {m.label}
        </button>
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid #333', margin: '2px 0' }} />

      {/* Log count — updated every 2s */}
      <span style={{ color: logCount > 0 ? '#10b981' : '#555', fontSize: 10 }}>
        {logCount} log{logCount !== 1 ? 's' : ''} collected
      </span>

      {/* Save button — triggers JSON file download */}
      <button
        onClick={handleSave}
        disabled={logCount === 0}
        style={{
          background: saved ? '#10b981' : logCount > 0 ? '#1a1a2e' : 'transparent',
          color: saved ? '#fff' : logCount > 0 ? '#10b981' : '#444',
          border: `1px solid ${saved ? '#10b981' : logCount > 0 ? '#10b981' : '#333'}`,
          borderRadius: 4,
          padding: '3px 6px',
          cursor: logCount > 0 ? 'pointer' : 'default',
          fontFamily: 'monospace',
          fontSize: 11,
          textAlign: 'left',
        }}
      >
        {saved ? '✓ saved' : '⬇ save logs'}
      </button>

      {/* Clear button */}
      <button
        onClick={handleClear}
        disabled={logCount === 0}
        style={{
          background: 'transparent',
          color: logCount > 0 ? '#888' : '#444',
          border: `1px solid ${logCount > 0 ? '#444' : '#333'}`,
          borderRadius: 4,
          padding: '3px 6px',
          cursor: logCount > 0 ? 'pointer' : 'default',
          fontFamily: 'monospace',
          fontSize: 11,
          textAlign: 'left',
        }}
      >
        ✕ clear
      </button>
    </div>
  )
}

export function PerfOverlay({ show }: { show: boolean }) {
  if (!show) return null
  return (
    <Suspense fallback={null}>
      <PerfOverlayInner />
    </Suspense>
  )
}
