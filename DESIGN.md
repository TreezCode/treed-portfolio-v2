---
name: BuildWithTreez
description: "Precise, dimensional developer portfolio: sacred geometry in WebGL over disciplined tonal surfaces, one committed purple accent, hairline borders, expanded-width Archivo display type."
colors:
  accent-purple: "oklch(0.65 0.19 292)"
  accent-purple-hover: "oklch(0.72 0.16 292)"
  accent-purple-light: "oklch(0.50 0.21 292)"
  accent-purple-light-hover: "oklch(0.44 0.21 292)"
  canvas-dark: "oklch(0.15 0.012 290)"
  surface-1-dark: "oklch(0.18 0.014 290)"
  surface-2-dark: "oklch(0.21 0.016 290)"
  surface-3-dark: "oklch(0.24 0.018 290)"
  ink-dark: "oklch(0.96 0.005 290)"
  ink-muted-dark: "oklch(0.78 0.012 290)"
  ink-subtle-dark: "oklch(0.64 0.015 290)"
  hairline-dark: "oklch(0.28 0.02 290)"
  hairline-strong-dark: "oklch(0.36 0.025 290)"
  canvas-light: "oklch(0.97 0.005 290)"
  surface-1-light: "oklch(0.945 0.007 290)"
  surface-2-light: "oklch(0.92 0.009 290)"
  surface-3-light: "oklch(0.895 0.011 290)"
  ink-light: "oklch(0.22 0.02 290)"
  ink-muted-light: "oklch(0.40 0.02 290)"
  ink-subtle-light: "oklch(0.50 0.02 290)"
  hairline-light: "oklch(0.87 0.01 290)"
  hairline-strong-light: "oklch(0.80 0.014 290)"
  scene-cyan: "#00d4ff"
  scene-pink: "#ff6b9d"
  semantic-success: "oklch(0.68 0.15 162)"
  semantic-error: "oklch(0.64 0.19 22)"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 2.75rem)"
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
  section: "clamp(64px, 10vw, 128px)"
components:
  button-primary:
    backgroundColor: "{colors.accent-purple}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.accent-purple-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  card:
    backgroundColor: "{colors.surface-1-dark}"
    rounded: "{rounded.lg}"
    padding: "24px"
  chip:
    backgroundColor: "{colors.surface-2-dark}"
    textColor: "{colors.ink-muted-dark}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  chip-selected:
    backgroundColor: "{colors.accent-purple}"
    textColor: "#ffffff"
  input:
    backgroundColor: "{colors.surface-1-dark}"
    textColor: "{colors.ink-dark}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
---

# Design System: BuildWithTreez

## 1. Overview

**Creative North Star: "The Geometer's Study"**

A quiet, purple-tinted room where precise instruments sit on dark surfaces and the only spectacle is the geometry itself. The dimensional identity of BuildWithTreez lives in its real-time WebGL scenes: the Merkaba, the platonic solids, the orb. Everything around those scenes is deliberately flat, tonal, and exact, so the 3D work reads as the signature rather than one glow among many. The system's confidence comes from restraint: hairline borders, a single committed accent, expanded-width display type, and generous spacing that lets each section breathe.

This system explicitly rejects the gradient-everything AI-portfolio look: no purple-to-pink buttons, no gradient card borders, no tri-color hover glows, no pulsing availability badges, no glassmorphism-by-default. It also rejects badge walls and template scaffolding (the repeated uppercase eyebrow label above every section is retired). Depth is conveyed by WebGL and tonal layering, never by decorative gradient chrome.

**Key Characteristics:**

- Purple-tinted neutrals everywhere; no pure black or pure white anywhere.
- One accent (purple) in UI chrome; cyan and pink exist only inside WebGL scenes.
- Hairline borders and tonal surface steps instead of shadows and glows.
- Single type family (Archivo) with committed weight and width contrast.
- 3D scenes never trap scroll and never require lock/unlock instructions.

## 2. Colors

Purple-tinted tonal neutrals with a single saturated violet accent; committed, not decorated.

### Primary

- **Treez Violet** (oklch(0.65 0.19 292), dark theme / oklch(0.50 0.21 292), light theme): the one voice of the brand in UI chrome. Used on primary CTAs, selected filter chips, active nav indicators, focus rings, and link hovers. It appears on well under 15% of any viewport; its rarity is what makes it read as intentional. The light-theme value is darkened to hold 4.5:1 against light surfaces.

### Neutral

- **Study Dark** (oklch(0.15 0.012 290)): the dark canvas. Near-black tinted toward the brand hue, never `#000`.
- **Surface steps 1-3** (oklch 0.18 / 0.21 / 0.24, chroma 0.014-0.018, hue 290): tonal layering for cards, chips, and inputs. Depth = lighter step, not shadow.
- **Ink** (oklch(0.96 0.005 290) dark / oklch(0.22 0.02 290) light): primary text. Tinted, never pure white or pure black.
- **Ink Muted / Ink Subtle**: secondary and tertiary text, both AA-verified against their canvases.
- **Hairline** (oklch(0.28 0.02 290) dark / oklch(0.87 0.01 290) light): 1px borders on every container. **Hairline Strong** for hover and emphasis.

### Tertiary (scene-only)

- **Scene Cyan** (#00d4ff) and **Scene Pink** (#ff6b9d): live exclusively inside WebGL canvases as light colors and material emissives, where they are genuinely dimensional. They never appear in 2D UI chrome, text, borders, or backgrounds.

### Named Rules

**The One Accent Rule.** Treez Violet is the only chromatic color permitted in 2D UI. If a second color appears outside a WebGL canvas or a semantic state (success/error), it is a bug.

**The Scene Exception.** Cyan and pink are stage lighting, not brand chrome. They exist only inside `<Canvas>`.

**The No-Gradient-Chrome Rule.** Gradients are prohibited on buttons, borders, text, badges, chips, and underlines. The only permitted gradients are alpha fade masks (e.g. canvas edge fades) and the hero background wash.

## 3. Typography

**Display Font:** Archivo (variable; with system-ui fallback)
**Body Font:** Archivo (with system-ui fallback)
**Label/Mono Font:** Geist Mono (numeric labels only)

**Character:** One engineered grotesque doing all the work through committed contrast. Display type is set heavy (700) and expanded (width 125) with tight negative tracking, giving headlines a machined, dimensional presence; body text returns to normal width and weight for calm legibility. Geist Mono survives only as tiny numeric labels (nav numbers, section indices), a nod to the technical register without wearing mono as a costume.

### Hierarchy

- **Display** (700, clamp(2.75rem, 6vw, 4.5rem), 1.05, -0.02em, width 125): hero headline only.
- **Headline** (650, clamp(2rem, 4vw, 2.75rem), 1.1, -0.015em, width 118): section headings.
- **Title** (600, 1.25rem, 1.3): card and item titles.
- **Body** (400, 1rem-1.125rem, 1.6): paragraphs, capped at 65-75ch measure.
- **Label** (Geist Mono 500, 0.75rem, +0.04em): numeric indices and small metadata only.

### Named Rules

**The Width-Is-Voice Rule.** Hierarchy is expressed through Archivo's weight and width axes, never through color, gradients, or added families.

**The One Kicker Rule.** The repeated uppercase eyebrow label above every section heading is prohibited. Sections open with the headline itself, differentiated by a mono numeric index at most.

## 4. Elevation

The system is flat by conviction. Depth belongs to the WebGL scenes; 2D surfaces express hierarchy through tonal steps (surface-1 through surface-3) and hairline borders, not shadows. There are no ambient drop shadows on cards at rest and no colored glow shadows anywhere. The single permitted shadow is a soft, neutral focus/hover cue on interactive elements, and even that is optional where a hairline-strong border change suffices.

### Shadow Vocabulary

- **hover-lift** (`box-shadow: 0 8px 24px oklch(0 0 0 / 0.25)`): optional, dark theme only, on interactive cards at hover. Neutral, never tinted with the accent.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. A state change (hover, focus) may lighten the surface one tonal step or strengthen the hairline; it never adds a colored glow.

## 5. Components

### Buttons

- **Shape:** gently rounded (12px).
- **Primary:** solid Treez Violet fill, white text, 14px 28px padding. Hover lightens to accent-hover; no gradient, no scale bounce, no glow.
- **Secondary:** transparent fill, hairline-strong border, ink text. Hover: surface-1 fill.
- **Focus:** 2px focus ring in Treez Violet with 2px offset, both themes.

### Chips (tech tags, project filters)

- **Style:** surface-2 fill, ink-muted text, full radius, 4px 12px padding, hairline border.
- **Selected (filters):** solid Treez Violet fill, white text. Unselected hover: hairline-strong border.
- Filters are a curated set of 4-5 categories, never an auto-generated tag union.

### Cards / Containers

- **Corner Style:** 16px radius.
- **Background:** surface-1 on canvas; surface-2 for nested emphasis zones (never nested cards).
- **Border:** 1px hairline on all sides. Hover: hairline-strong. Prohibited: gradient `p-px` wrappers, colored side stripes, colored glow shadows.
- **Internal Padding:** 24px (lg spacing).
- **Height discipline:** cards in a shared row are equal height; copy is trimmed to fit, not the reverse.

### Inputs / Fields

- **Style:** surface-1 fill, hairline border, 12px radius, 12px 16px padding, ink text, ink-subtle placeholder.
- **Focus:** border becomes Treez Violet plus a 2px violet ring; no colored outer glow, no per-field accent colors.
- **Error:** semantic-error border and message text.

### Navigation

- Fixed header, transparent at top; scrolled state gains canvas fill at 95% opacity and a bottom hairline (solid, not gradient). Nav items are ink-muted, hover ink, active ink with a solid violet underline indicator. Mono numeric indices in ink-subtle. Mobile menu is a full-screen canvas surface with the same grammar.

### WebGL Scenes (signature component)

- Scenes render on transparent canvases blended into the page. Cyan/pink/violet stage lighting is permitted and encouraged inside the scene.
- **Interaction contract:** `touch-action: pan-y` on every canvas at all times; no scroll-zoom, no OrbitControls zoom, no lock/unlock overlays or buttons. Pointer drag rotates; scroll always scrolls the page. Camera framing is fixed.

## 6. Do's and Don'ts

### Do:

- **Do** use Treez Violet (oklch(0.65 0.19 292) dark / oklch(0.50 0.21 292) light) as the single accent, on a small fraction of the screen.
- **Do** express depth with tonal surface steps and hairline borders; save real depth for the WebGL scenes.
- **Do** set display type in Archivo at weight 700 / width 125 with -0.02em tracking.
- **Do** keep every canvas scrollable: `touch-action: pan-y`, zoom disabled, no lock UI.
- **Do** trim copy so cards in a row are naturally equal height; 1-2 lines of description per card.
- **Do** verify 4.5:1 contrast for all text in both themes and honor `prefers-reduced-motion`.

### Don't:

- **Don't** use gradients on buttons, card borders, text, badges, underlines, or separators ("gradient-everything AI slop" per PRODUCT.md).
- **Don't** use cyan (#00d4ff) or pink (#ff6b9d) anywhere outside a WebGL canvas.
- **Don't** repeat an uppercase tracked eyebrow label above section headings ("template SaaS hero" scaffolding).
- **Don't** render badge walls: no auto-generated filter unions, no 28-chip technology grids.
- **Don't** use backdrop-blur decoratively; the scrolled header is the one permitted use.
- **Don't** use `#000`, `#fff`, or untinted grays; every neutral carries the 290 hue.
- **Don't** add lock/unlock overlays, hints, or buttons to 3D scenes.
- **Don't** use border-left/right stripes thicker than 1px as colored accents, gradient text, or pulsing status badges.
