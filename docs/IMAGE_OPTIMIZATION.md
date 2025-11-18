# Image Optimization Guide

> Guide for optimizing images to improve website performance

Last Updated: 2025-11-17

---

## Current Image Inventory

### Images Found in `/public/images/`

| File | Size | Format | Recommendation |
|------|------|--------|----------------|
| `hero.png` | 917KB | PNG | **Priority 1** - Convert to WebP, compress |
| `massage.webp` | 617KB | WebP | **Priority 2** - Compress further |
| `chakra-healing.webp` | 485KB | WebP | **Priority 3** - Compress further |
| `enisa-intro.jpg` | 41KB | JPG | ✅ Good size |
| `logo.webp` | 34KB | WebP | ✅ Good size |

**Total Size:** ~2.1MB
**Target Size:** <500KB total
**Potential Savings:** ~1.6MB (76% reduction)

---

## Why Optimize Images?

- ⚡ **Faster Page Loads** - Smaller images = faster website
- 📊 **Better SEO** - Google ranks faster sites higher
- 💰 **Lower Bandwidth Costs** - Especially on mobile
- ✅ **Better Core Web Vitals** - Improves Largest Contentful Paint (LCP)

**Target:** All images should be <100KB for optimal performance

---

## Recommended Tools

### Option 1: TinyPNG (Easiest)
**Website:** https://tinypng.com/

**Steps:**
1. Go to https://tinypng.com/
2. Drag and drop images (supports PNG, JPG, WebP)
3. Download compressed versions
4. Replace original files

**Pros:**
- ✅ Super easy to use
- ✅ Great compression (60-80% reduction)
- ✅ Maintains visual quality
- ✅ Free for up to 20 images

**Cons:**
- ❌ Manual process
- ❌ Doesn't convert formats

---

### Option 2: Squoosh (Best for Format Conversion)
**Website:** https://squoosh.app/

**Steps:**
1. Go to https://squoosh.app/
2. Upload an image
3. Select "WebP" format on the right panel
4. Adjust quality slider (aim for 75-85%)
5. Compare original vs. compressed
6. Download when satisfied

**Pros:**
- ✅ Convert PNG/JPG to WebP
- ✅ Visual comparison
- ✅ Fine control over quality
- ✅ Works offline (PWA)

**Cons:**
- ❌ One image at a time

---

### Option 3: ImageOptim (macOS Only)
**Website:** https://imageoptim.com/

**Steps:**
1. Download and install ImageOptim
2. Drag images onto the app
3. Wait for automatic compression
4. Files are replaced with optimized versions

**Pros:**
- ✅ Batch processing
- ✅ Preserves metadata
- ✅ Lossless compression option

**Cons:**
- ❌ macOS only

---

### Option 4: Command Line (Advanced)
Install `cwebp` for WebP conversion:

```bash
# Install on macOS
brew install webp

# Install on Ubuntu/Debian
sudo apt-get install webp

# Convert PNG/JPG to WebP
cwebp -q 80 hero.png -o hero.webp

# Batch convert all PNG files
for file in *.png; do cwebp -q 80 "$file" -o "${file%.png}.webp"; done
```

---

## Step-by-Step Optimization

### 1. **hero.png** (917KB → Target: <100KB)

**Current Issue:** PNG format, very large
**Recommendation:** Convert to WebP

**Steps:**
1. Go to https://squoosh.app/
2. Upload `hero.png`
3. Select **WebP** format
4. Set quality to **80**
5. Check file size (should be ~80-120KB)
6. Download as `hero.webp`
7. Replace in `/public/images/`
8. Update references in code if needed

**Expected Result:** 90% size reduction (917KB → ~100KB)

---

### 2. **massage.webp** (617KB → Target: <100KB)

**Current Issue:** Already WebP but too large

**Steps:**
1. Go to https://tinypng.com/
2. Upload `massage.webp`
3. Download compressed version
4. Replace original file

**Expected Result:** 60-70% size reduction (617KB → ~180-250KB)

If still too large, use Squoosh to reduce quality to 75-80%.

---

### 3. **chakra-healing.webp** (485KB → Target: <100KB)

**Current Issue:** Already WebP but too large

**Steps:**
1. Follow same process as `massage.webp`
2. Use TinyPNG or Squoosh
3. Target quality: 75-80%

**Expected Result:** 60-70% size reduction (485KB → ~150-200KB)

---

## Automated Solution (Future)

Consider adding an image optimization plugin to your build process:

### Using `@nuxt/image` (Already Installed!)

The project already has `@nuxt/image` installed. This module automatically optimizes images when you use the `<NuxtImg>` component.

**Update your components to use NuxtImg:**

```vue
<!-- Before -->
<img src="/images/hero.png" alt="Hero image" />

<!-- After -->
<NuxtImg
  src="/images/hero.webp"
  alt="Hero image"
  format="webp"
  quality="80"
  width="1200"
  height="800"
/>
```

**Benefits:**
- ✅ Automatic format conversion
- ✅ Lazy loading
- ✅ Responsive images
- ✅ CDN integration (if configured)

---

## Verification

After optimizing images, verify improvements:

### 1. Check File Sizes

```bash
ls -lh public/images/
```

All images should be <100KB (except maybe hero which can be <150KB).

### 2. Test Page Speed

Use Google PageSpeed Insights:
https://pagespeed.web.dev/

**Before Optimization:**
- Lighthouse Performance: ~70-80
- LCP: ~3-4s

**After Optimization:**
- Lighthouse Performance: 90+
- LCP: <2s

### 3. Visual Quality Check

- Open website locally
- Check all pages with images
- Ensure no visible quality loss
- Images should look crisp on retina displays

---

## Best Practices Going Forward

### For New Images:

1. **Start with WebP** - Always use WebP format
2. **Compress Before Upload** - Use TinyPNG/Squoosh first
3. **Target <100KB** - Aim for small file sizes
4. **Use NuxtImg** - Let Nuxt handle optimization
5. **Test on Mobile** - Check load times on slow connections

### Recommended Image Sizes:

- **Hero Images:** 1200x800px @ 80KB
- **Treatment Images:** 800x600px @ 50KB
- **Thumbnails:** 400x300px @ 30KB
- **Logos:** 200x200px @ 20KB
- **Icons:** 100x100px @ 10KB

### Quality Settings:

- **WebP Quality:** 75-85 (sweet spot)
- **JPG Quality:** 80-85
- **PNG:** Convert to WebP instead

---

## Quick Wins Checklist

- [ ] Convert `hero.png` to WebP (~90% savings)
- [ ] Compress `massage.webp` (~60% savings)
- [ ] Compress `chakra-healing.webp` (~60% savings)
- [ ] Verify all images load correctly
- [ ] Test website performance
- [ ] Update any hardcoded image references

---

## Expected Performance Improvements

**Before:**
- Total image size: ~2.1MB
- LCP: 3-4 seconds
- PageSpeed Score: 75

**After:**
- Total image size: <500KB
- LCP: <2 seconds
- PageSpeed Score: 90+

**User Impact:**
- 🚀 3-4x faster image loading
- 📱 Better mobile experience
- 💰 Less data usage for users
- ✅ Improved SEO ranking

---

## Need Help?

If you encounter any issues during image optimization:

1. Check original images are backed up
2. Compare compressed vs. original visually
3. Use quality settings 75-85 (don't go below 70)
4. Test on actual website before deploying

---

*Last Updated: 2025-11-17*
*Part of: Quick Wins - Performance Optimization*
