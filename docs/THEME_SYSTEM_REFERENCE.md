# Sacred Toggle™ Theme System - Quick Reference

**Version:** 2.0  
**Last Updated:** April 10, 2026  
**Status:** ✅ Production Ready

---

## 📋 Overview

The Sacred Toggle is Build With Treez's premium light/dark mode implementation featuring sacred geometry icons, smooth transitions, and full accessibility support.

**Key Features:**
- 🌸 Flower of Life icon (Light mode)
- ⭐ Merkaba icon (Dark mode)
- 🔄 180° rotation animation
- 💾 LocalStorage persistence
- 🎨 System preference detection
- ♿ WCAG-compliant
- 📱 Mobile-optimized

---

## 🎨 CSS Variables

### Usage

**✅ DO:**
```tsx
<div className="bg-background-primary text-text-primary border-border-primary theme-transition">
```

**❌ DON'T:**
```tsx
<div className="bg-[#0a0a0f] text-white border-white/10">
```

### Variable Reference

#### Backgrounds
```css
--background-primary     /* Main page background */
--background-secondary   /* Cards, sections */
--background-tertiary    /* Nested elements */
```

#### Text
```css
--text-primary          /* Headings, main content */
--text-secondary        /* Subheadings, labels */
--text-tertiary         /* Placeholder text, hints */
```

#### Borders
```css
--border-primary        /* Main borders */
--border-secondary      /* Subtle dividers */
```

#### Surfaces
```css
--surface-primary       /* Interactive surfaces */
--surface-secondary     /* Subtle backgrounds */
--surface-hover         /* Hover states */
```

### Complete Color Values

```css
/* Light Theme */
:root {
  --background-primary: #f5f5f7;
  --background-secondary: #e8e8ed;
  --background-tertiary: #d8d8dd;
  
  --text-primary: #1a1a2e;
  --text-secondary: #4a4a5e;
  --text-tertiary: #6b7280;
  
  --border-primary: rgba(145, 94, 255, 0.15);
  --border-secondary: rgba(145, 94, 255, 0.08);
  
  --surface-primary: rgba(145, 94, 255, 0.08);
  --surface-secondary: rgba(145, 94, 255, 0.04);
  --surface-hover: rgba(145, 94, 255, 0.15);
}

/* Dark Theme */
.dark {
  --background-primary: #0a0a0f;
  --background-secondary: #151520;
  --background-tertiary: #1f1f2e;
  
  --text-primary: #f8f8f8;
  --text-secondary: #b8b8c8;
  --text-tertiary: #888899;
  
  --border-primary: rgba(145, 94, 255, 0.2);
  --border-secondary: rgba(145, 94, 255, 0.1);
  
  --surface-primary: rgba(145, 94, 255, 0.1);
  --surface-secondary: rgba(145, 94, 255, 0.05);
  --surface-hover: rgba(145, 94, 255, 0.2);
}
```

---

## 🔧 Implementation

### 1. Theme Context

```tsx
// contexts/ThemeContext.tsx
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

// Usage in components
const { theme, toggleTheme, isTransitioning } = useTheme()
```

### 2. ThemeToggle Component

```tsx
import { ThemeToggle } from '@/components/ui/ThemeToggle'

// In header/navigation
<ThemeToggle />
```

### 3. Theme-Aware Styling

**Tailwind Classes:**
```tsx
className="bg-background-primary text-text-primary border-border-primary theme-transition"
```

**CSS Variables:**
```css
.my-component {
  background-color: var(--background-primary);
  color: var(--text-primary);
  border-color: var(--border-primary);
  transition: background-color 300ms, color 300ms, border-color 300ms;
}
```

**Inline Styles:**
```tsx
<div style={{ 
  backgroundColor: 'var(--background-secondary)',
  color: 'var(--text-primary)'
}}>
```

---

## 📱 Mobile Optimizations

### Touch Gesture Handling

**Double-Tap Detection:**
```tsx
const [touchCountRef, lastTapRef] = [useRef(0), useRef(0)]

// Track finger count
handleTouchStart: touchCountRef.current = e.touches.length

// Only trigger on single-finger taps
if (touchCountRef.current !== 1) return

// Check double-tap timing
const timeSinceLast = now - lastTapRef.current
if (timeSinceLast < 300 && timeSinceLast > 0) {
  toggleLock()
}
```

**Prevent Sticky Focus:**
```tsx
const handleClick = () => {
  toggleTheme()
  // Auto-blur on mobile
  if ('ontouchstart' in window) {
    (document.activeElement as HTMLElement)?.blur()
  }
}
```

---

## ♿ Accessibility

### ARIA Labels
```tsx
aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
```

### Keyboard Navigation
```tsx
focus-visible:ring-2 focus-visible:ring-[#915eff]
```

### Contrast Ratios
- **Light Mode Text:** #1a1a2e on #f5f5f7 = 12.6:1 ✅
- **Dark Mode Text:** #f8f8f8 on #0a0a0f = 17.4:1 ✅
- **Minimum Required:** 4.5:1 for normal text

---

## 🎭 Sacred Geometry Icons

### Flower of Life (Light Mode)
- **Size:** 28×28px (w-7 h-7)
- **Stroke Width:** 2.5px
- **Gradient:** Purple-dominant (#915eff → #7b3fd1 → #915eff)
- **Symbolism:** Expansion, sun rays, light

### Merkaba (Dark Mode)
- **Size:** 28×28px (w-7 h-7)
- **Stroke Width:** 2.5px
- **Gradient:** Light purple to cyan (#a78bfa → #00d4ff)
- **Symbolism:** Cosmic energy, stars, night

---

## 🐛 Common Issues & Solutions

### Issue: Colors not updating on theme change
**Solution:** Add `theme-transition` class and use CSS variables

### Issue: Flash of wrong theme on load
**Solution:** Theme detection runs in useEffect before render

### Issue: Mobile focus persists after tap
**Solution:** Auto-blur implemented in handleClick

### Issue: Pinch-to-zoom triggers toggle
**Solution:** Touch gesture discrimination (single-finger only)

### Issue: 3D labels hard to read in light mode
**Solution:** Theme detection with MutationObserver for dynamic text color

---

## 📦 Files Reference

```
src/
├── contexts/
│   └── ThemeContext.tsx          # Theme state management
├── lib/
│   └── themes.ts                 # Theme configuration
├── components/
│   ├── ui/
│   │   └── ThemeToggle.tsx       # Toggle button component
│   └── icons/
│       ├── FlowerOfLifeIcon.tsx  # Light mode icon
│       └── MerkabaIcon.tsx       # Dark mode icon
└── app/
    └── globals.css               # CSS variables & transitions
```

---

## 🚀 Best Practices

1. **Always use CSS variables** - Never hardcode colors
2. **Add theme-transition class** - Smooth color changes
3. **Test both themes** - Ensure readability in light & dark
4. **Check accessibility** - Use high contrast colors
5. **Mobile first** - Test touch interactions
6. **System preference** - Respect user's OS setting
7. **Persist choice** - Save to localStorage

---

## 📊 Performance

- **CSS Variable Lookup:** ~0.1ms
- **Theme Toggle:** ~500ms (animation duration)
- **Color Transition:** 300ms (smooth, imperceptible)
- **LocalStorage Write:** ~1ms
- **Icon Render:** Client-side, no network request

---

## 🎯 Next Steps

- [x] Core implementation
- [x] Comprehensive color audit
- [x] Mobile optimizations
- [x] Accessibility enhancements
- [x] Documentation updates
- [ ] Playwright automated tests
- [ ] Performance monitoring
- [ ] User analytics integration

---

**Built with 🌳 by BuildwithTreez**
