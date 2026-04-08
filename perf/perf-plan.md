# Performance Testing Plan

## How to run a test session

```bash
# Start dev server
npm run dev

# Open on mobile via local network
npx lt --port 3000   # or use your LAN IP

# Test URLs (append query params)
http://<your-ip>:3000/                      # baseline
http://<your-ip>:3000/?perf=minimal-ui      # CSS effects stripped
http://<your-ip>:3000/?perf=reduced-motion  # Framer Motion reduced
http://<your-ip>:3000/?perf=reduced-3d      # WebGL quality reduced
http://<your-ip>:3000/?perf=compare-all     # dev overlay with mode switcher
```

## What each mode tests

| Mode | What it removes | Hypothesis tested |
|------|----------------|-------------------|
| `minimal-ui` | `backdrop-blur`, `mix-blend-mode`, decorative CSS animations | **Primary:** CSS compositing over WebGL is expensive |
| `reduced-motion` | Framer Motion enter animations, looping CSS animations | FM spring overhead and concurrent animation cost |
| `reduced-3d` | DPR capped to 1, Bloom disabled, particle count halved, torus segments reduced | WebGL fill rate and postprocessing cost |
| `compare-all` | All of the above simultaneously + dev overlay | Cumulative cost of all effects |

## How to measure

### On-device (best signal)
1. Open Chrome DevTools via `chrome://inspect` USB debugging
2. Navigate to Performance tab on desktop while page is open on device
3. Press Record, scroll through the page, stop
4. Look for: long frames (>16ms), compositor thread work, GPU rasterization time
5. Compare baseline vs each mode by repeating

### FPS Counter + downloadable logs (built-in, no USB required)
The app includes a built-in overlay visible whenever `?perf=` is in the URL.

**Overlay controls (bottom-right corner):**
- Mode switcher buttons — tap to reload in that mode
- Entry counter — updates every 2s, shows how many FPS samples have been collected
- **⬇ save logs** — tapping this downloads `perf-log-<mode>-<timestamp>.json` directly to the device
- **✕ clear** — resets the in-memory store for a clean next run

**Workflow for mobile without USB:**
1. Open the URL with `?perf=baseline` on device
2. Scroll through the full page (30–60s of data)
3. Tap **⬇ save logs** — file goes to your phone's Downloads folder
4. Switch to next mode, repeat
5. Transfer JSON files to desktop and compare across modes

**Log file structure:**
```json
{
  "exportedAt": "...",
  "mode": "minimal-ui",
  "userAgent": "...",
  "viewport": { "w": 390, "h": 844 },
  "entries": [
    { "ts": 1234, "type": "init", "label": "hero", "data": { "dpr": 3, ... } },
    { "ts": 6234, "type": "fps-sample", "label": "hero", "data": { "avgFps": 42, "worstFrameMs": 38.2, "spikeCount": 3, ... } }
  ]
}
```

### Lighthouse (automated)
```bash
npm run perf:lighthouse:baseline
npm run perf:lighthouse:minimal-ui
npm run perf:lighthouse:reduced-motion
npm run perf:lighthouse:reduced-3d
```
Reports saved to `perf/lighthouse-results/`.

### Playwright traces
```bash
npm run perf:playwright
```
Tests 3 mobile profiles. Results in `perf/playwright/results/`.

## Measurement cadence
1. Run baseline — note FPS on Hero, on scroll, on Tech section
2. Run `minimal-ui` — does Hero FPS improve? Scroll smoothness?
3. Run `reduced-3d` — compare to minimal-ui. Is improvement additive or same?
4. Run `reduced-motion` — scroll into About/Experience. Any improvement?
5. Run `compare-all` — use overlay to toggle in real time

## Success criteria
- ≥10 FPS improvement on Hero in any single mode = strong signal for that hypothesis
- `minimal-ui` showing big improvement = CSS compositing bottleneck confirmed
- `reduced-3d` showing big improvement = WebGL fill rate bottleneck confirmed
- Both showing similar improvement = either both are culprits or some other factor

## Recording results
Fill in `perf/findings.md` after each session with:
- Device tested
- Mode
- Observed FPS (baseline vs mode)
- Notable observations
