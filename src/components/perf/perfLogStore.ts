// PERF TESTING: Module-level log store — no React, no context.
// FPSTracker pushes entries here; PerfOverlay reads them for download.
// Lives in the browser only; imported by client components.

export interface PerfLogEntry {
  ts: number          // performance.now() at time of log
  type: 'init' | 'fps-sample' | 'event'
  label: string       // 'hero' | 'orb' | 'tech' etc.
  mode: string
  data: Record<string, unknown>
}

// Plain array — intentionally mutable module state.
// Safe because it only lives in the browser and is never SSR'd.
const entries: PerfLogEntry[] = []

export const perfLog = {
  push(entry: PerfLogEntry) {
    entries.push(entry)
  },

  getAll(): PerfLogEntry[] {
    return entries
  },

  count(): number {
    return entries.length
  },

  clear() {
    entries.length = 0
  },

  /** Trigger a browser file-save of all entries as pretty-printed JSON. */
  download(mode: string) {
    const payload = {
      exportedAt: new Date().toISOString(),
      mode,
      userAgent: navigator.userAgent,
      viewport: { w: window.innerWidth, h: window.innerHeight },
      entries,
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `perf-log-${mode}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  },
}
