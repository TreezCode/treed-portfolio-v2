# Initial Performance Audit

> Generated: pre-implementation pass against source tree  
> Focus: mobile frame-rate bottlenecks

---

## 1. Three.js / R3F — Canvases & Scenes

### Scene inventory

| Canvas | File | Used In | Notes |
|--------|------|---------|-------|
| `SacredGeometryScene` | `three/SacredGeometryScene.tsx` | Hero (fullscreen) | **Bloom postprocessing** — biggest single GPU cost |
| `TechScene` | `three/TechScene.tsx` | Tech section | `dpr={[1,2]}` — uncontrolled on mobile |
| `SacredGeometryOrbCanvas` | `three/SacredGeometryOrbCanvas.tsx` | Contact section | `preserveDrawingBuffer:true` — disables GPU buffer optimization |

### 🔴 Critical findings

**SacredGeometryScene (Hero)**
- `EffectComposer` + `Bloom` — runs every frame, costs ~2× fill rate on mobile GPUs  
- No `dpr` cap — defaults to native DPR (3× on most modern phones = 9× pixel work)  
- `frameloop` defaults to `always` — renders at 60fps continuously even when idle  
- `QuantumField`: 200 particles, `new THREE.Object3D()` instantiated **inside `useFrame`** every frame → GC pressure  
- `QuantumField`: `AdditiveBlending` with 200 instances = expensive transparency sort  
- `Merkaba`: `useGesture` binds to the canvas DOM element on mobile → touch event interference  

**TechScene**
- `dpr={[1,2]}` allows full 2× DPR — on 3× displays still limited but on retina this is 4× pixel work vs 1×  
- `Float` component from `@react-three/drei` on every `PlatonicSolid` = one `useFrame` per tech item  
- `getGeometry()` called twice per render (wireframe + core mesh) — new geometry objects created on every re-render  
- `meshStandardMaterial` with emissive on hover — PBR material, more expensive than `meshBasicMaterial`  
- `pointLight` spawned conditionally on hover — dynamic light count changes

**SacredGeometryOrbCanvas (Contact)**
- `preserveDrawingBuffer: true` — prevents GPU from discarding framebuffers, costs VRAM  
- No `dpr` cap — native DPR  
- `OrbitControls` with `autoRotate` running even when off-screen  
- `SacredGeometryOrb`: 360 particles total (3× `ParticleField`), 3 `OrbitalRing` instances each with `torusGeometry args={[r, tube, 64, 128]}` — 64×128 = 8192 segments per ring × 3 rings  
- 3 point lights inside the Orb + 1 ambient light = 4 lights in Contact canvas alone  
- `EnergyLines`: geometry computed with `useMemo` but depends on unstable `rng` reference

---

## 2. CSS / DOM Overlay Compositing

### backdrop-filter usage (HYPOTHESIS: HIGH IMPACT)

| Element | Class | Layer size | Always active? |
|---------|-------|-----------|---------------|
| Header (scrolled) | `backdrop-blur-xl` | Full viewport width, fixed | Yes — once scrolled |
| Mobile menu | `backdrop-blur-xl` | Full viewport | When open |
| Hero badge | `backdrop-blur-sm` | Small | Yes — above WebGL canvas |
| Hero CTA button | `backdrop-blur-sm` | Medium | Yes — above WebGL canvas |
| Tech filter pills | `backdrop-blur-sm` | Small × N | In view |
| Tech legend items | `backdrop-blur-sm` | Medium × 4 | In view |
| Card `glass` variant | `backdrop-blur-xl` | Medium | In view |

**Finding:** `backdrop-filter` forces the browser to create a separate compositing layer AND sample from all layers below — including the WebGL canvas. On mobile, this is extremely expensive because the GPU must composite DOM layers directly over WebGL output. Every `backdrop-blur` element over the Hero canvas causes the canvas texture to be read back and re-composited every frame.

### mix-blend-mode
- `SacredGeometry` canvas background uses `mixBlendMode: 'screen'` — forces composite layer creation, expensive on mobile

### Animated elements above canvas (Hero section)
- `animate-pulse` + `animate-ping` on Hero badge dot — CSS animation above WebGL, triggers repaint in compositing layer
- `motion.div` with `initial/animate` on multiple Hero elements — Framer Motion running JS transforms on DOM layers over canvas

### box-shadow / dynamic shadows
- `ServiceCard`: `boxShadow` toggled on hover via inline style — triggers paint
- `Projects.tsx`: project card hover shadows via inline styles  
- Contact form wrapper has gradient border via pseudo-element equivalent

---

## 3. React / JS Main Thread

### Expensive per-frame work
- `QuantumField.useFrame`: allocates `new THREE.Object3D()` every animation frame (~60/sec) → heap churn
- `Merkaba.useFrame`: `new THREE.Quaternion()` + `.setFromEuler` + `new THREE.Euler()` every frame
- `SacredGeometryOrb`: 6 separate `useFrame` callbacks (group, core, shell, outer, glow, OrbitalRing×3, ParticleField×3, EnergyLines = ~12 total) all reading `state.clock.elapsedTime`

### State-triggered re-renders
- `Merkaba`: `useState(isMobile)` + `window.resize` listener → re-render on resize
- `TechScene`: `setTimeout` in click handler → potential state thrash
- `Header`: scroll listener + `setScrolled` → triggers re-render + `motion.header` class change → CSS recalc on every scroll debounce threshold cross

### Client component scope
- Every section is `'use client'` — all sections hydrate JS eagerly
- `page.tsx` uses `dynamic()` for `SacredGeometryScene` (correct), but `SacredGeometryOrbCanvas` in Contact is imported directly (no dynamic import, no lazy load — it mounts even before user scrolls to Contact)

---

## 4. No DPR Control (Hero canvas)

`SacredGeometryScene` has no `dpr` prop on Canvas. On iPhone 14 (DPR=3): renders at 3× resolution = 9× as many pixels as DPR=1. Combined with Bloom postprocessing (two extra full-res passes), this means the Hero canvas alone could be doing **~27× the pixel work** compared to a capped DPR=1 setup.

---

## 5. frameloop="always" (default everywhere)

All three canvases use the default `frameloop="always"` — they render every vsync frame regardless of whether anything changed. `TechScene` when no interaction is happening could use `frameloop="demand"` since shapes only move when hovered.

---

## 6. Priority Ranking

| Issue | Confidence | Est. Impact | Effort |
|-------|-----------|------------|--------|
| No DPR cap on Hero canvas + Bloom | 🔴 Very High | Huge | Tiny |
| `backdrop-blur` over WebGL canvas | 🔴 High | Large | Small |
| `new Object3D()` in QuantumField useFrame | 🟡 Medium | Medium | Tiny |
| `preserveDrawingBuffer: true` on Orb | 🟡 Medium | Medium | Tiny |
| Torus ring high segment count (64×128) | 🟡 Medium | Medium | Tiny |
| `meshStandardMaterial` in TechScene | 🟡 Medium | Medium | Small |
| SacredGeometryOrbCanvas not lazy-loaded | 🟡 Medium | Medium | Small |
| Framer Motion simultaneous animating elements | 🟢 Low-Med | Small | Medium |
| `mix-blend-mode: screen` on bg canvas | 🟢 Low | Small | Tiny |
| float + pulse animations over canvas | 🟢 Low | Small | Tiny |
