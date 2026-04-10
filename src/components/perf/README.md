# Performance Testing Tools

**Status:** Development/Staging Only  
**Production:** Disabled by default

---

## 🎯 Purpose

This folder contains performance monitoring tools used during development and testing to:
- Track FPS (frames per second) in 3D scenes
- Monitor render performance
- Identify performance bottlenecks
- Compare different optimization strategies
- Download performance logs for analysis

---

## 🔒 Production Safety

**These tools are COMPLETELY DISABLED in production** via environment variable guards:

```typescript
const isPerfEnabled = process.env.NEXT_PUBLIC_ENABLE_PERF_TOOLS === 'true'
```

### Security Features:
✅ **Zero runtime overhead** - Tools don't execute in production  
✅ **Tree-shaking friendly** - Next.js can remove code in production builds  
✅ **Environment controlled** - Must explicitly enable  
✅ **No data collection** - All metrics stay in browser memory

---

## 📦 Components

### `FPSTracker.tsx`
Monitors frame rate inside React Three Fiber canvases.

**Usage:**
```tsx
<Canvas>
  <FPSTracker label="hero" mode={perfFlags?.mode} />
  {/* Your 3D content */}
</Canvas>
```

**Features:**
- Tracks average FPS, worst frame, best frame
- Identifies frame spikes (>33.3ms)
- Logs to console and perfLogStore
- Samples every 5 seconds

---

### `PerfOverlay.tsx`
Visual overlay for comparing performance configurations.

**Features:**
- Shows active performance mode
- Download logs button (CSV export)
- Clear logs functionality
- Toggleable via URL params (`?perf=mode`)

---

### `PerfProvider.tsx`
React context for sharing performance flags across components.

**Usage:**
```tsx
const { mode, showOverlay } = usePerfFlags()
```

---

### `perfLogStore.ts`
Module-level log storage (no React, no context).

**API:**
```typescript
perfLog.push(entry)    // Add entry
perfLog.getAll()       // Get all entries
perfLog.clear()        // Clear all
perfLog.download()     // Export as CSV
```

---

## 🚀 How to Use

### Enable in Development

1. Create `.env.local`:
```bash
NEXT_PUBLIC_ENABLE_PERF_TOOLS=true
```

2. Restart dev server:
```bash
npm run dev
```

3. Access overlay via URL:
```
http://localhost:3000?perf=full
```

### Performance Modes

| Mode | Description |
|------|-------------|
| `none` | All effects enabled (baseline) |
| `no-bloom` | Disable bloom post-processing |
| `no-particles` | Disable particle systems |
| `compare-all` | All effects disabled |

### Download Logs

1. Enable overlay: `?perf=full`
2. Use the app normally
3. Click "Download Logs" button
4. Analyze CSV in Excel/Google Sheets

---

## 📊 Log Format

```typescript
{
  ts: number              // Timestamp (performance.now())
  type: 'init' | 'fps-sample'
  label: string           // Scene identifier
  mode: PerfMode          // Current performance mode
  data: {
    // For 'init' type:
    dpr: number           // Device pixel ratio
    drawBuffer: string    // Canvas resolution
    viewport: string      // Window size
    userAgent: string     // Browser info
    
    // For 'fps-sample' type:
    avgFps: number        // Average FPS
    avgFrameMs: number    // Average frame time
    worstFrameMs: number  // Slowest frame
    bestFrameMs: number   // Fastest frame
    spikeCount: number    // Frames over 33.3ms
    sampleCount: number   // Frames in sample
  }
}
```

---

## ⚠️ Important Notes

### DO:
✅ Use for local development and testing  
✅ Enable on staging environments for debugging  
✅ Share logs when reporting performance issues  
✅ Compare modes to validate optimizations

### DON'T:
❌ Enable in production builds  
❌ Commit `.env.local` with `ENABLE_PERF_TOOLS=true`  
❌ Deploy with performance overlay visible  
❌ Use in user-facing environments

---

## 🔧 Netlify Configuration

For staging deploys with perf tools:

```toml
# netlify.toml
[build.environment]
  NEXT_PUBLIC_ENABLE_PERF_TOOLS = "true"  # Staging only

[context.production.environment]
  NEXT_PUBLIC_ENABLE_PERF_TOOLS = "false"  # Production (explicit)
```

---

## 🎓 Best Practices

1. **Baseline First** - Always test with `?perf=none` first
2. **Compare Modes** - Test each mode 2-3 times for consistency
3. **Document Findings** - Save logs with meaningful filenames
4. **Mobile Testing** - Test on real devices, not just desktop
5. **Long Sessions** - Let it run 30+ seconds per mode

---

## 📁 File Structure

```
src/components/perf/
├── README.md              ← You are here
├── FPSTracker.tsx         ← Frame rate monitor
├── PerfOverlay.tsx        ← UI overlay
├── PerfOverlayRoot.tsx    ← Conditional wrapper
├── PerfProvider.tsx       ← React context
└── perfLogStore.ts        ← Log storage
```

---

## 🔗 Related Files

- `src/hooks/usePerfMode.ts` - Performance mode detection
- `src/app/layout.tsx` - Provider integration
- `.env.example` - Environment config template

---

**Built with 🌳 by BuildwithTreez**
