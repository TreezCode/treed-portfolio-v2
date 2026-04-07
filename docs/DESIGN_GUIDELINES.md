# BuildwithTreez Portfolio - Design Guidelines

> **Last Updated:** April 6, 2026  
> **Reference Section:** Hero Section (Fully Polished)

This document outlines the design system, branding consistency, and implementation patterns for the BuildwithTreez portfolio. Use the Hero section as the gold standard when updating other sections.

---

## 🎨 Brand Identity

### Core Brand Colors
```css
/* Primary Colors */
--treez-purple: #915eff;    /* Innovation, creativity */
--treez-cyan: #00d4ff;      /* Technology, precision */
--treez-pink: #ff6b9d;      /* Energy, passion */

/* Background Colors */
--deep-space: #0a0a0f;      /* Primary background */
--cosmic-gray: #1a1a2e;     /* Secondary background */

/* Text Colors */
--soft-white: #f8f8f8;      /* Primary text */
--muted-gray: #b0b0b0;      /* Secondary text */
```

### Brand Philosophy
*"Where Sacred Geometry Meets Modern Technology"*

The portfolio blends ancient sacred geometry patterns with cutting-edge web technology, creating a unique visual identity that represents both spiritual depth and technical expertise.

---

## 🎯 Component Design Patterns

### 1. Hero Section Pattern (Reference Implementation)

**Layout Structure:**
```tsx
<section className="relative min-h-screen overflow-hidden">
  {/* Background Layer (z-0) */}
  <SacredGeometryBackground />
  
  {/* 3D Scene Layer (z-10) */}
  <motion.div className="absolute inset-0 z-10">
    <ThreeJSScene />
  </motion.div>
  
  {/* Content Layer (z-20) */}
  <motion.div className="absolute inset-0 z-20 pointer-events-none">
    {/* Content with pointer-events-auto on interactive elements */}
  </motion.div>
</section>
```

**Key Features:**
- ✅ Sacred geometry background pattern
- ✅ Interactive 3D scene (Merkaba + Quantum Field)
- ✅ Availability badge with pulse animation
- ✅ Typed text animation
- ✅ Brand-colored CTA buttons
- ✅ Social links with hover effects
- ✅ Fully mobile responsive

---

## 🔘 Button System

### Primary CTA
**Use for:** Main actions, primary navigation
```tsx
<a className="group relative px-6 sm:px-8 py-3 sm:py-4 
  bg-gradient-to-r from-[#915eff] to-[#ff6b9d] 
  rounded-xl font-semibold text-white 
  shadow-lg hover:shadow-[#915eff]/50 
  transition-all duration-300 hover:scale-105 
  overflow-hidden">
  <span className="relative z-10">Button Text</span>
  <div className="absolute inset-0 
    bg-gradient-to-r from-[#ff6b9d] to-[#915eff] 
    opacity-0 group-hover:opacity-100 
    transition-opacity duration-300" />
</a>
```

**Features:**
- Purple-to-pink gradient
- Reverse gradient on hover
- Scale lift (1.05)
- Colored glow shadow
- Responsive padding

### Secondary CTA
**Use for:** Secondary actions, alternative paths
```tsx
<a className="px-6 sm:px-8 py-3 sm:py-4 
  border-2 border-[#00d4ff] 
  rounded-xl font-semibold text-[#00d4ff] 
  hover:bg-[#00d4ff]/10 
  transition-all duration-300 hover:scale-105 
  hover:shadow-lg hover:shadow-[#00d4ff]/30 
  bg-background-primary/80 backdrop-blur-sm">
  Button Text
</a>
```

**Features:**
- Cyan border
- Transparent with backdrop blur
- Cyan glow on hover
- Subtle background fill on hover

### Ghost Button
**Use for:** Tertiary actions, subtle interactions
```tsx
<button className="p-3 rounded-lg 
  border border-white/10 
  hover:border-[#915eff] 
  bg-white/5 hover:bg-[#915eff]/10 
  transition-all duration-300 hover:scale-110 
  hover:shadow-lg hover:shadow-[#915eff]/30">
  {/* Icon or content */}
</button>
```

---

## 🎭 Animation Patterns

### Framer Motion Standards

**Fade In:**
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.8 }}
>
```

**Slide In (from left):**
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
>
```

**Slide Up:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
```

**Scale In:**
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
>
```

**Stagger Delays:**
- First element: 0.3s
- Second element: 0.6s
- Third element: 0.9s
- CTAs: 1.2s
- Social links: 1.5s

---

## 📱 Mobile Responsiveness

### Breakpoint System
```css
/* Tailwind Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
```

### Mobile-First Patterns

**Section Padding:**
```tsx
className="py-12 sm:py-24"  // Reduced on mobile
```

**Typography:**
```tsx
className="text-3xl sm:text-4xl lg:text-5xl"  // Scale up
```

**Grid Layouts:**
```tsx
className="grid lg:grid-cols-2 gap-6 sm:gap-8"  // Stack on mobile
```

**Card Padding:**
```tsx
className="p-4 sm:p-6"  // Tighter on mobile
```

**Input Fields:**
```tsx
className="px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base"
```

**Spacing:**
```tsx
className="space-y-4 sm:space-y-6"  // Reduced vertical spacing
```

---

## ✨ Interactive Elements

### Hover Effects Standard
```css
/* All interactive elements should have: */
transition-all duration-300
hover:scale-105 (or 1.1 for icons)
hover:shadow-lg hover:shadow-[brand-color]/30
```

### Focus States
```css
/* Form inputs */
focus:outline-none 
focus:ring-2 
focus:ring-accent-primary 
focus:border-transparent
```

### Disabled States
```css
disabled:opacity-50 
disabled:cursor-not-allowed
```

---

## 🌟 Sacred Geometry Integration

### Background Patterns
**Flower of Life** - Used in Hero section
- Canvas-based 2D rendering
- Subtle opacity (0.03-0.05)
- Responsive to window resize
- Cosmic purple color (#915eff)

**Implementation:**
```tsx
<canvas className="absolute inset-0 opacity-5" />
```

### 3D Sacred Geometry
**Merkaba (Star Tetrahedron)**
- Dual rotating tetrahedrons
- Quaternion-based rotation controls
- Responsive positioning (centered mobile, right-aligned desktop)
- Magenta (#ff6bff) and Cyan (#00ffff) wireframes
- Bloom post-processing for glow effect

**Quantum Field**
- 200 particles in tornado/vortex pattern
- Cylindrical orbit around viewer
- Cyan color (#00d4ff)
- Additive blending
- Pulsing animation

---

## 🎨 Glass Morphism Style

### Card Components
```tsx
<Card variant="glass">
  {/* Content */}
</Card>

// Generates:
className="bg-white/5 backdrop-blur-xl border border-white/10"
```

### Availability Badge
```tsx
<div className="inline-flex items-center gap-2 
  px-4 py-2 rounded-full 
  bg-gradient-to-r from-[#915eff]/20 to-[#00d4ff]/20 
  border border-[#915eff]/30 
  backdrop-blur-sm">
  <div className="relative">
    <div className="w-2 h-2 bg-[#00d4ff] rounded-full animate-pulse" />
    <div className="absolute inset-0 w-2 h-2 bg-[#00d4ff] rounded-full animate-ping" />
  </div>
  <span className="text-sm font-medium text-[#00d4ff]">Available for Hire</span>
</div>
```

---

## 🔗 Social Links Pattern

### Icon Grid
```tsx
<div className="flex gap-4 mt-2 pointer-events-auto">
  {/* Each social link */}
  <a className="group p-3 rounded-lg 
    border border-white/10 hover:border-[brand-color] 
    bg-white/5 hover:bg-[brand-color]/10 
    transition-all duration-300 hover:scale-110 
    hover:shadow-lg hover:shadow-[brand-color]/30">
    <svg className="w-5 h-5 text-white/70 group-hover:text-[brand-color] transition-colors">
      {/* Icon path */}
    </svg>
  </a>
</div>
```

**Brand Color Assignments:**
- GitHub: Purple (#915eff)
- LinkedIn: Cyan (#00d4ff)
- Twitter: Pink (#ff6b9d)
- Email: Purple (#915eff)

---

## 📐 Layout Principles

### Z-Index Layering
```
z-0   : Background patterns
z-10  : 3D scenes / Canvas elements
z-20  : Content layer
z-30  : Scroll indicators / Fixed elements
z-50  : Interactive elements (CTAs, forms)
```

### Pointer Events Management
```tsx
// Parent container
className="pointer-events-none"

// Interactive children
className="pointer-events-auto"
```

This allows 3D scene interaction while keeping text/content non-blocking.

---

## 🎯 Section Checklist

When updating any portfolio section, ensure:

- [ ] **Brand colors** used consistently
- [ ] **Mobile responsive** (test at 375px, 768px, 1024px)
- [ ] **Framer Motion** animations with proper delays
- [ ] **Sacred geometry** element integrated (if applicable)
- [ ] **Glass morphism** cards where appropriate
- [ ] **Hover effects** on all interactive elements (300ms transition)
- [ ] **Focus states** on form inputs
- [ ] **Proper z-index** layering
- [ ] **Accessibility** (aria-labels, semantic HTML)
- [ ] **Typography scale** responsive (mobile → desktop)
- [ ] **Spacing** reduced on mobile (padding, gaps, margins)
- [ ] **Button styles** match design system
- [ ] **Gradient directions** consistent with brand

---

## 🚀 Performance Guidelines

### 3D Scenes
- Use `dynamic` import with `ssr: false`
- Implement proper loading states
- Optimize particle counts (200-300 max)
- Use `InstancedMesh` for particle systems

### Images & Assets
- Use Next.js `Image` component
- Implement lazy loading
- Optimize file sizes
- Use WebP format when possible

### Animations
- Use CSS transforms (not position changes)
- Leverage GPU acceleration
- Implement `will-change` sparingly
- Use `framer-motion` for complex animations

---

## 📝 Code Style

### Component Structure
```tsx
'use client'  // If needed

import { ... }  // External
import { ... }  // Internal
import { ... }  // Components

export function ComponentName() {
  // State
  // Refs
  // Effects
  // Handlers
  
  return (
    <section id="section-name" className="...">
      {/* Content */}
    </section>
  )
}
```

### Naming Conventions
- Components: PascalCase
- Files: PascalCase for components, kebab-case for utilities
- CSS Classes: Tailwind utility classes
- IDs: kebab-case for section anchors

---

## 🎨 Future Enhancements

### Planned Sacred Geometry Elements
- **Metatron's Cube** - Projects section background
- **Torus Field** - Skills/Tech section
- **Platonic Solids** - Interactive elements
- **Golden Ratio Spiral** - Layout guides

### Planned Interactions
- Particle systems responding to scroll
- Sacred geometry morphing on section change
- Parallax effects with depth
- Smooth scroll with section snapping

---

## 📚 Reference Files

- **Brand Guide:** `BRAND_GUIDE.md`
- **Sacred Geometry Concepts:** `SACRED_GEOMETRY_CONCEPTS.md`
- **Implementation Details:** `SACRED_GEOMETRY_IMPLEMENTATION.md`
- **Hero Section Code:** `src/app/page.tsx` (lines 1-171)
- **Merkaba Component:** `src/components/three/Merkaba.tsx`
- **Quantum Field:** `src/components/three/QuantumField.tsx`

---

## ✅ Hero Section Achievements

The Hero section serves as the **gold standard** for:

1. ✅ **Brand Consistency** - All brand colors properly applied
2. ✅ **Mobile Responsiveness** - Perfect on all screen sizes
3. ✅ **Sacred Geometry Integration** - Flower of Life + 3D Merkaba
4. ✅ **Interactive Elements** - Smooth drag controls, hover effects
5. ✅ **Professional Polish** - Animations, transitions, micro-interactions
6. ✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
7. ✅ **Performance** - Optimized 3D rendering, lazy loading
8. ✅ **User Experience** - Clear CTAs, social links, availability status

**Use this section as the template when updating all other portfolio sections.**

---

*Last reviewed and validated: April 6, 2026*
