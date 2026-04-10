# Build With Treez Logo - GIMP Workflow Guide

## 🎨 Refining AI-Generated Logos in GIMP

### Step 1: Import AI-Generated Logo
1. Open GIMP
2. **File → Open** your AI-generated PNG/SVG
3. If SVG, import at **2000px** width (high resolution)
4. **Image → Mode → RGB** (ensure correct color mode)

### Step 2: Create Transparent Background
1. **Layer → Transparency → Add Alpha Channel**
2. **Select → By Color** (click white background)
3. **Edit → Clear** (Delete key)
4. Zoom in to check edges are clean

### Step 3: Color Adjustment (Brand Colors)
**Your Brand Colors:**
- Purple: `#915eff` (RGB: 145, 94, 255)
- Teal: `#00d4ff` (RGB: 0, 212, 255)
- White: `#ffffff`

**To Change Colors:**
1. **Colors → Color to Alpha** (remove any unwanted colors)
2. **Colors → Hue-Saturation** (adjust to brand colors)
3. **Select → By Color** (select area to recolor)
4. **Bucket Fill Tool** → Fill with brand color

### Step 4: Sharp Edges & Cleanup
1. **Filters → Enhance → Sharpen** (if edges are blurry)
2. **Select → Shrink** by 1-2px → **Select → Invert** → **Delete** (clean edges)
3. **Eraser Tool** with hard edge for manual cleanup

### Step 5: Add Text (If Logo Is Icon Only)
1. **Text Tool** (T key)
2. Font recommendations:
   - **Montserrat Bold** (modern, tech)
   - **Inter Bold** (clean, professional)
   - **Poppins SemiBold** (friendly, modern)
3. Type "Build With Treez"
4. Size: ~150-200px for high-res
5. Color: Match your brand purple or use white
6. **Layer → Text to Path** (for more control)

### Step 6: Create Variations
**Create these versions from your master file:**

#### A. Full Color Logo (Primary)
- Save as: `logo-full-color.png`
- Resolution: 2000px width
- Use: Website header, light backgrounds

#### B. White Logo (For Dark Backgrounds)
1. **Colors → Desaturate → Desaturate**
2. **Colors → Brightness-Contrast** → Max brightness
3. Save as: `logo-white.png`

#### C. Black Logo (For Light Backgrounds)
1. **Colors → Desaturate → Desaturate**
2. **Colors → Brightness-Contrast** → Min brightness
3. Save as: `logo-black.png`

#### D. Favicon Versions
1. **Image → Scale Image** → 512x512px
2. Save as: `favicon-512.png`
3. Repeat for: 192x192, 180x180, 32x32, 16x16

#### E. Monogram/Icon Only
1. Crop to just the tree/icon (no text)
2. Square canvas: **Image → Canvas Size** → Lock ratio
3. Save as: `icon-only.png`

### Step 7: Export Formats

**For Web:**
1. **File → Export As**
2. Format: **PNG**
3. Settings:
   - ✓ Save background color
   - ✓ Save resolution
   - Compression level: 9 (maximum)

**Required Exports:**
```
/public/logo/
  ├── logo-full.png          (2000px width, transparent)
  ├── logo-white.png         (2000px width, white on transparent)
  ├── logo-black.png         (2000px width, black on transparent)
  ├── logo-square.png        (1024x1024, for social)
  ├── favicon-512.png        (512x512)
  ├── favicon-192.png        (192x192)
  ├── favicon-180.png        (180x180 for Apple)
  ├── favicon-32.png         (32x32)
  └── favicon-16.png         (16x16)
```

### Step 8: Quality Check
- [ ] Zoom to 400% - are edges smooth?
- [ ] Test on dark background
- [ ] Test on light background
- [ ] Test at small sizes (32px) - is it readable?
- [ ] Check transparency (open on checkered bg)
- [ ] Verify colors match brand (#915eff, #00d4ff)

### Pro Tips
- Always work on a copy, keep original AI file
- Use **Layers** for non-destructive editing
- Export at 2x/3x size, then scale down for web (crisper)
- Save GIMP project file (.xcf) for future edits
- Keep a "master" high-res version (4000px+)

## 🎨 Color Palette Quick Reference

```
Primary Purple: #915eff (rgb(145, 94, 255))
Secondary Teal: #00d4ff (rgb(0, 212, 255))
Accent Pink:    #ff6b9d (rgb(255, 107, 157))
White:          #ffffff
Dark BG:        #0a0a0a
```

## 🔧 GIMP Keyboard Shortcuts

- **Ctrl+Z** - Undo
- **Ctrl+Shift+Z** - Redo
- **E** - Eraser
- **B** - Bucket Fill
- **T** - Text Tool
- **Shift+O** - Select by Color
- **Shift+Ctrl+E** - Export As
- **Ctrl+Shift+L** - Levels (adjust brightness/contrast)
