# Build With Treez Logo - Export Checklist

## 📦 Required Logo Files

### Primary Logo Files (Save to /public/logo/)

- [ ] `logo-full.png` - Full color, 2000px width, transparent
- [ ] `logo-white.png` - White version, 2000px width, transparent  
- [ ] `logo-black.png` - Black version, 2000px width, transparent
- [ ] `logo-icon.png` - Icon only (no text), 512x512, transparent
- [ ] `logo-square.png` - Square format, 1024x1024 for social

### Favicon Files (Save to /public/)

- [ ] `favicon.ico` - 32x32 (convert PNG to ICO)
- [ ] `favicon-16x16.png` - 16x16
- [ ] `favicon-32x32.png` - 32x32  
- [ ] `android-chrome-192x192.png` - 192x192
- [ ] `android-chrome-512x512.png` - 512x512
- [ ] `apple-touch-icon.png` - 180x180

### Open Graph / Social Media

- [ ] `og-image.jpg` - 1200x630 for social sharing
- [ ] `twitter-card.jpg` - 1200x600 for Twitter

### Header/UI Sizes

- [ ] `logo-header.png` - ~300px width for header
- [ ] `logo-header-white.png` - White version for dark mode
- [ ] `logo-mobile.png` - ~150px for mobile header

## 🎨 Color Specifications

**Primary Colors:**
- Purple: `#915eff` (RGB: 145, 94, 255)
- Teal: `#00d4ff` (RGB: 0, 212, 255)  
- Pink accent: `#ff6b9d` (RGB: 255, 107, 157)

**Background Colors:**
- Dark: `#0a0a0a`
- White: `#ffffff`

## ✅ Quality Checklist

Before exporting each file:
- [ ] Transparent background (no white)
- [ ] Colors match brand exactly
- [ ] Edges are crisp (no blur)
- [ ] Readable at small sizes
- [ ] Centered in canvas
- [ ] No stray pixels
- [ ] Saved at correct size
- [ ] File size reasonable (<500KB for web)

## 📐 GIMP Export Settings

**For PNG (recommended for web):**
- Format: PNG
- Compression level: 9
- Save background color: ✓
- Save resolution: ✓

**For ICO (favicon only):**
- Use online converter: https://convertio.co/png-ico/
- Or use GIMP plugin for ICO export

## 🗂️ Final File Structure

```
/public/
├── logo/
│   ├── logo-full.png
│   ├── logo-white.png
│   ├── logo-black.png
│   ├── logo-icon.png
│   ├── logo-square.png
│   ├── logo-header.png
│   └── logo-header-white.png
├── favicon.ico
├── favicon-16x16.png
├── favicon-32x32.png
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── apple-touch-icon.png
├── og-image.jpg
└── twitter-card.jpg
```

## 🚀 Quick Export Process in GIMP

### Method: Batch Export Multiple Sizes

1. Open master logo file (2000px)
2. For each size needed:
   - **Image → Scale Image** → Enter size
   - **File → Export As** → Name file
   - Choose PNG, compression 9
   - Click Export
   - **Edit → Undo** (back to 2000px)
   - Repeat for next size

### Time-Saving Tip
Export from largest to smallest to maintain quality:
1. 2000px → logo-full.png
2. 1024px → logo-square.png  
3. 512px → logo-icon.png
4. 300px → logo-header.png
5. 192px → android-chrome-192x192.png
6. 180px → apple-touch-icon.png
7. 32px → favicon-32x32.png
8. 16px → favicon-16x16.png
