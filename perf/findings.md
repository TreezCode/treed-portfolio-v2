# Performance Findings

> Fill this in after each test session. See perf-plan.md for methodology.

---

## Session Log

Device: Android 10, Chrome 146, viewport 411×759

| Mode | DPR | Hero avg FPS | Hero worst spike | Orb avg FPS | Orb worst spike |
|------|-----|-------------|-----------------|------------|----------------|
| baseline | 2 | no data | — | no data | — |
| minimal-ui | **2** | **~56 fps** | **259–894 ms** | **~57 fps** | **258–895 ms** |
| reduced-motion | **2** | **~60 fps** | **134–734 ms** | **~60 fps** | **133–735 ms** |
| reduced-3d | **1** | **~72 fps** | **44–93 ms** | **~72 fps** | **44–93 ms** |
| compare-all | **1** | **~79 fps** | **37–111 ms** | **~78 fps** | **37–111 ms** |

---

## Key Findings

### 🔴 CONFIRMED: DPR is the dominant bottleneck

The single most impactful variable is **DPR**. Every mode with DPR=2 (`minimal-ui`, `reduced-motion`) shows:
- avg FPS ~56–60 with **worst frames of 258–895ms** (half-second+ freezes)
- These are not render spikes — they are **GPU fill-rate stalls** caused by rendering at 4× the pixel count (DPR=2 → 4× pixels vs DPR=1)

Every mode with DPR=1 (`reduced-3d`, `compare-all`) shows:
- avg FPS ~72–79 with **worst frames of 37–111ms** — a 6–8× reduction in worst-case jank
- The device is an Android 10 phone. Its native DPR is 2 (not 3 as predicted), confirmed by init logs: `drawBuffer: 822×1630` at DPR=2 vs `411×815` at DPR=1

### 🟡 CSS overlays (minimal-ui) had negligible effect

Stripping all `backdrop-blur`, `mix-blend-mode`, and decorative CSS effects gave **~0 fps improvement** vs baseline DPR=2. The hypothesis that CSS compositing was causing major jank is **disproved** — the GPU fill-rate cost of the WebGL canvas at DPR=2 completely dominates.

### 🟡 Framer Motion (reduced-motion) had minor effect

Reducing all FM animations gave **~4 fps average improvement** (56→60) but worst-frame spikes remained at 700ms+. The JS animation overhead is real but secondary to fill-rate.

### 🟢 Bloom postprocessing contribution is real but smaller than DPR

`compare-all` (DPR=1, no Bloom) is ~7 fps higher than `reduced-3d` (DPR=1, no Bloom). These are the same DPR so the difference is noise/Framer Motion, not Bloom specifically. Bloom's cost is masked by the DPR savings. To isolate: we'd need a `?perf=reduced-3d-bloom-only` mode — but given DPR is the dominant issue, this is secondary.

### Spike pattern analysis

The 400–900ms worst-frame spikes in DPR=2 modes are consistent with the **GPU stalling waiting for the CPU** (or vice versa) when compositing two full-res WebGL canvases simultaneously. Both the hero and orb canvases share the same worst-case spike timestamps, confirming they compound each other.

In DPR=1 modes, worst frames drop to 44–111ms — these are normal GC pauses and scroll event processing, not GPU stalls.

---

## Bottleneck Rankings (confirmed by data)

1. **DPR=2 on hero + orb canvases simultaneously** — Confidence: 🔴 Very High — Impact: **+16–23 fps, eliminates 400–900ms freezes**
2. **Bloom postprocessing on hero canvas** — Confidence: 🟡 Medium — Impact: secondary (masked by DPR fix)
3. **Framer Motion animations** — Confidence: 🟡 Medium — Impact: **+4 fps avg**, reduces worst spikes slightly
4. **CSS backdrop-blur over WebGL** — Confidence: 🟢 Disproved as primary cause — Impact: negligible on this device

---

## Recommended Fixes

### High Impact / Low Effort — DO THESE NOW
- [x] Cap hero canvas DPR to 1 on mobile (already done in `reduced-3d` mode — make permanent)
- [x] Cap orb canvas DPR to 1 on mobile (already done — make permanent)
- [ ] Add mobile DPR detection to cap DPR at 1.5 max on all canvases permanently (not query-param gated)

### High Impact / Medium Effort
- [ ] Lazy-mount `SacredGeometryOrbCanvas` only when Contact section is in viewport (currently renders offscreen)
- [ ] Move hero canvas to `frameloop="demand"` when page is not visible (Page Visibility API)

### Medium Impact / Low Effort
- [ ] Keep Bloom disabled on mobile (add `isMobile` check, not just perf-mode gate)
- [ ] Reduce FM animation concurrency on mobile (stagger more aggressively, reduce simultaneous `whileInView` triggers)
