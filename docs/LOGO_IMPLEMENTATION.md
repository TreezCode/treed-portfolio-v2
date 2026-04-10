# Logo Implementation Guide

## 🎯 Where to Add Your Logo

### 1. Header Logo (Primary)

**File:** `src/components/layout/Header.tsx`  
**Line:** ~226-236 (current "JK" text)

**Replace this:**
```tsx
<a
  href="#"
  className="relative z-60 text-xl sm:text-2xl font-bold bg-linear-to-r from-[#915eff] to-[#00d4ff] bg-clip-text text-transparent hover:from-[#00d4ff] hover:to-[#ff6b9d] transition-all duration-300"
  onClick={(e) => {
    e.preventDefault()
    closeMobileMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }}
>
  JK
</a>
```

**With this:**
```tsx
<a
  href="#"
  className="relative z-60 flex items-center gap-2 group"
  onClick={(e) => {
    e.preventDefault()
    closeMobileMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }}
>
  {/* Logo Image */}
  <img
    src="/logo/logo-header.png"
    alt="Build With Treez"
    className="h-8 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
  />
  
  {/* Optional: Add text beside logo */}
  <span className="hidden sm:inline text-lg font-bold bg-gradient-to-r from-[#915eff] to-[#00d4ff] bg-clip-text text-transparent">
    Build With Treez
  </span>
</a>
```

**Alternative: Icon Only (No Text)**
```tsx
<a
  href="#"
  className="relative z-60 group"
  onClick={(e) => {
    e.preventDefault()
    closeMobileMenu()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }}
>
  <img
    src="/logo/logo-icon.png"
    alt="Build With Treez"
    className="h-10 sm:h-12 w-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
  />
</a>
```

---

### 2. Favicon (Browser Tab Icon)

**File:** `src/app/layout.tsx`  
**Add to metadata:**

```tsx
export const metadata: Metadata = {
  title: {
    default: 'Build With Treez | Joey Kubalak',
    template: '%s | Build With Treez',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'android-chrome', url: '/android-chrome-192x192.png', sizes: '192x192' },
      { rel: 'android-chrome', url: '/android-chrome-512x512.png', sizes: '512x512' },
    ],
  },
  // ... rest of metadata
}
```

---

### 3. Open Graph Image (Social Sharing)

**Update Open Graph metadata in `layout.tsx`:**

```tsx
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://buildwithtreez.com',
  title: 'Build With Treez | Joey Kubalak',
  description: 'Junior Software Engineer specializing in secure web development...',
  siteName: 'Build With Treez',
  images: [
    {
      url: 'https://buildwithtreez.com/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Build With Treez - Joey Kubalak Portfolio',
    },
  ],
},
```

---

### 4. Footer Logo (Optional)

**File:** `src/components/layout/Footer.tsx`  
**Add logo to footer:**

```tsx
<footer>
  <div className="flex items-center justify-center mb-6">
    <img
      src="/logo/logo-white.png"
      alt="Build With Treez"
      className="h-8 w-auto opacity-70"
    />
  </div>
  {/* ... rest of footer */}
</footer>
```

---

### 5. Loading State / Splash (Optional Enhancement)

Create a logo loader for better branding:

**File:** `src/components/ui/LogoLoader.tsx` (new file)

```tsx
'use client'

import { motion } from 'framer-motion'

export function LogoLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]">
      <motion.img
        src="/logo/logo-icon.png"
        alt="Loading..."
        className="h-20 w-20"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1.1, 1, 0.8],
          rotate: [0, 0, 360, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}
```

---

## 🎨 Styling Variations

### Animated Logo Hover Effect

```tsx
<a href="#" className="relative group">
  <img
    src="/logo/logo-header.png"
    alt="Build With Treez"
    className="h-10 w-auto transition-all duration-300 
               group-hover:scale-110 
               group-hover:brightness-125
               group-hover:drop-shadow-[0_0_15px_rgba(145,94,255,0.5)]"
  />
</a>
```

### Gradient Border Logo Container

```tsx
<div className="relative p-2 rounded-lg bg-gradient-to-br from-[#915eff]/20 to-[#00d4ff]/20 backdrop-blur-sm">
  <img
    src="/logo/logo-icon.png"
    alt="Build With Treez"
    className="h-10 w-10"
  />
</div>
```

### Logo with Glow Effect

```tsx
<div className="relative">
  {/* Glow layer */}
  <div className="absolute inset-0 blur-xl bg-gradient-to-r from-[#915eff] to-[#00d4ff] opacity-30"></div>
  
  {/* Logo */}
  <img
    src="/logo/logo-header.png"
    alt="Build With Treez"
    className="relative h-10 w-auto"
  />
</div>
```

---

## 📱 Responsive Logo Sizes

```tsx
<img
  src="/logo/logo-header.png"
  alt="Build With Treez"
  className="h-8 sm:h-10 lg:h-12 w-auto"
  // Mobile: 32px, Tablet: 40px, Desktop: 48px
/>
```

---

## ♿ Accessibility Best Practices

**Always include:**
1. ✅ `alt` text describing the logo
2. ✅ Proper contrast ratios
3. ✅ Clickable area ≥ 44x44px
4. ✅ Focus indicator for keyboard navigation

```tsx
<a
  href="#"
  className="focus:outline-none focus:ring-2 focus:ring-[#915eff] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] rounded-lg"
  aria-label="Build With Treez - Home"
>
  <img src="/logo/logo-header.png" alt="Build With Treez" />
</a>
```

---

## 🚀 Implementation Checklist

- [ ] Create logo files in `/public/logo/` folder
- [ ] Add favicon files to `/public/` root
- [ ] Update Header.tsx with logo image
- [ ] Update layout.tsx metadata with icons
- [ ] Add Open Graph image
- [ ] Test logo on light and dark backgrounds
- [ ] Verify logo scales properly on mobile
- [ ] Check favicon displays correctly in browser
- [ ] Test social sharing preview (Facebook, Twitter, LinkedIn)
- [ ] Commit and push changes

---

## 🧪 Testing Your Logo

### Visual Tests
- [ ] Desktop header (scroll up/down)
- [ ] Mobile header
- [ ] Browser tab (favicon)
- [ ] Social media share preview
- [ ] Different screen sizes (320px - 4K)

### Technical Tests
```bash
# Build to check for errors
npm run build

# Verify images load
# Check browser console for 404s
```

### Social Preview Test Tools
- Facebook: https://developers.facebook.com/tools/debug/
- Twitter: https://cards-dev.twitter.com/validator
- LinkedIn: Post preview when sharing link

---

## 💡 Pro Tips

1. **Use WebP for better performance:**
   - Export logo as `.webp` in addition to `.png`
   - Smaller file size, same quality

2. **Lazy load footer logo:**
   ```tsx
   <img src="/logo/logo-white.png" alt="..." loading="lazy" />
   ```

3. **Use Next.js Image component for optimization:**
   ```tsx
   import Image from 'next/image'
   
   <Image
     src="/logo/logo-header.png"
     alt="Build With Treez"
     width={120}
     height={40}
     priority // For header logo
   />
   ```

4. **Preload critical logo:**
   Add to `layout.tsx` head:
   ```tsx
   <link rel="preload" href="/logo/logo-header.png" as="image" />
   ```
