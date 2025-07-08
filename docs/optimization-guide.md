# Claude Code Performance Optimization Instructions

## Project Context
Reference the docs/ folder for complete project understanding and follow the technical standards outlined in ENGINEERING_GUIDELINES.md.

## Current Performance Issues
The Park City Best website needs critical performance optimizations to achieve Lighthouse scores of 90+. The site is functionally complete but lacks key performance implementations that are causing poor Core Web Vitals.

## Task Priority Order
Complete these tasks in order, testing Lighthouse scores after each implementation:

---

## Task 1: Image Optimization System
**Priority: CRITICAL (Biggest performance impact)**

### Install and Configure 11ty Image Plugin
```bash
npm install @11ty/eleventy-img --save-dev
```

### Implementation Requirements:
1. **Add to .eleventy.js configuration:**
   - Install eleventy-img plugin
   - Create async image shortcode that generates:
     - Multiple sizes: [300, 600, 900, 1200] widths
     - Multiple formats: ["webp", "jpeg"] 
     - Lazy loading: `loading="lazy"`
     - Output directory: `./dist/img/`
     - URL path: `/img/`

2. **Create image shortcode usage:**
   ```njk
   {% image "./src/images/hero-bg.jpg", "Park City mountain view", "(min-width: 30em) 50vw, 100vw" %}
   ```

3. **Convert existing images:**
   - Update all `<img>` tags to use the new shortcode
   - Ensure hero images load with priority (no lazy loading)
   - Add proper alt text and sizes attributes

### Expected Result:
- All images serve in WebP format with JPEG fallback
- Responsive images for different screen sizes
- Lazy loading for below-the-fold content
- 20-30 point Lighthouse performance improvement

---

## Task 2: Critical CSS Implementation
**Priority: HIGH (Fixes render blocking)**

### Create Critical CSS System:
1. **Create `src/_includes/critical.css` with above-the-fold styles:**
   - Body, typography, and layout fundamentals
   - Hero section styles (complete styling for first screen)
   - Navigation styles
   - Any CSS needed for content visible without scrolling

2. **Modify base layout template:**
   - Inline critical CSS in `<head>` using: `{% include "critical.css" %}`
   - Load remaining CSS asynchronously:
     ```html
     <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
     <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
     ```

3. **Move non-critical CSS:**
   - Extract all below-the-fold styles to separate file
   - Keep critical CSS under 14KB for optimal performance

### Expected Result:
- Eliminates render-blocking CSS
- Faster First Contentful Paint (FCP)
- Improved Largest Contentful Paint (LCP)
- 10-15 point Lighthouse improvement

---

## Task 3: Font Optimization
**Priority: MEDIUM (Reduces layout shift)**

### Implement Font Loading Strategy:
1. **Add to `<head>` section:**
   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
   <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
   <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet"></noscript>
   ```

2. **Add font-display CSS:**
   ```css
   font-display: swap;
   ```

3. **Define fallback fonts:**
   ```css
   font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
   ```

### Expected Result:
- Faster font loading
- Reduced Cumulative Layout Shift (CLS)
- Better perceived performance

---

## Task 4: Resource Preloading
**Priority: MEDIUM (Improves loading priority)**

### Add Strategic Preloading:
1. **Preload critical resources in `<head>`:**
   ```html
   <link rel="dns-prefetch" href="//fonts.googleapis.com">
   <link rel="preload" href="/images/hero-bg.webp" as="image">
   <link rel="preload" href="/css/main.css" as="style">
   ```

2. **Optimize resource loading order:**
   - Critical images: preload
   - Hero background: preload
   - Below-fold images: lazy load

### Expected Result:
- Faster loading of critical resources
- Better resource prioritization
- Improved perceived performance

---

## Task 5: HTML/CSS Minification
**Priority: LOW (Small but measurable improvement)**

### Add Build Optimizations:
1. **Install minification packages:**
   ```bash
   npm install html-minifier clean-css --save-dev
   ```

2. **Add to .eleventy.js:**
   - HTML minification transform
   - CSS minification filter
   - Remove comments and whitespace in production

3. **Configure minification options:**
   - Remove comments
   - Collapse whitespace
   - Minify CSS/JS in HTML

### Expected Result:
- Smaller file sizes
- Faster download times
- Minor performance improvement

---

## Task 6: Service Worker Implementation
**Priority: LOW (Advanced optimization)**

### Add Caching Strategy:
1. **Create `src/sw.js`:**
   - Cache critical resources
   - Implement cache-first strategy for images
   - Network-first strategy for HTML

2. **Register service worker:**
   ```javascript
   if ('serviceWorker' in navigator) {
     navigator.serviceWorker.register('/sw.js');
   }
   ```

### Expected Result:
- Faster repeat visits
- Offline capability
- Better user experience

---

## Testing Instructions

### After Each Task:
1. **Run local build:** `npm run build`
2. **Test locally:** `npm run serve`
3. **Check Lighthouse score** using Chrome DevTools or PageSpeed Insights
4. **Verify no broken functionality**

### Target Scores:
- **After Task 1 (Images):** 60-70 performance score
- **After Task 2 (Critical CSS):** 75-85 performance score  
- **After Task 3 (Fonts):** 80-90 performance score
- **After Tasks 4-6:** 90+ performance score

### Troubleshooting:
- If images don't generate: Check file paths and permissions
- If CSS doesn't inline: Verify include path and file exists
- If fonts don't load: Check preconnect and preload syntax
- If builds fail: Check console errors and npm dependencies

## Success Criteria
- ✅ Lighthouse Performance Score: 90+
- ✅ All Core Web Vitals in "Good" range
- ✅ Images load in WebP format with lazy loading
- ✅ Critical CSS inlined, non-critical CSS async
- ✅ Fonts load without layout shift
- ✅ No broken functionality or design issues

## Files That Will Be Modified:
- `.eleventy.js` (main configuration)
- `src/_includes/layouts/base.njk` (main template)
- `src/_includes/critical.css` (new file)
- `src/sw.js` (new file)
- Template files using images (convert to shortcodes)
- `package.json` (new dependencies)

Implement these optimizations systematically to achieve the target 90+ Lighthouse performance score while maintaining all current functionality and design.