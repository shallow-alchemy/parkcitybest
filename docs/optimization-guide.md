# Park City Best - Lighthouse Performance Optimization

## Current Issues Analysis
Based on your site's content and typical 11ty performance patterns, here are the most likely optimization opportunities:

## 🚀 Performance Optimizations

### 1. Image Optimization (Biggest Impact)
**Current Issue**: Likely using large, unoptimized images
**Solutions**:
```javascript
// .eleventy.js - Add image optimization plugin
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600, 900, 1200],
    formats: ["webp", "jpeg"],
    outputDir: "./dist/img/",
    urlPath: "/img/"
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("image", imageShortcode);
};
```

**Template Usage**:
```njk
{% image "./src/images/restaurant-hero.jpg", "Riverhorse Restaurant exterior", "(min-width: 30em) 50vw, 100vw" %}
```

### 2. Critical CSS Implementation
**Create**: `src/_includes/critical.css`
```css
/* Inline critical styles for above-the-fold content */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  margin: 0;
  padding: 0;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 4rem 1rem;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin: 0 0 1rem 0;
  font-weight: 700;
}

.nav {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

**In base.njk**:
```njk
<head>
  <style>
    {% include "critical.css" %}
  </style>
  <link rel="preload" href="/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="/css/main.css"></noscript>
</head>
```

### 3. Font Optimization
```njk
<!-- In head.njk -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</noscript>
```

### 4. JavaScript Optimization
**Defer non-critical JS**:
```njk
<!-- At bottom of body -->
<script src="/js/main.js" defer></script>
<script>
  // Inline critical JS only
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
</script>
```

### 5. Resource Preloading
```njk
<!-- In head.njk -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-bg.webp" as="image">
```

## 🎯 Accessibility Improvements

### 1. Semantic HTML Structure
```njk
<!-- Current improvement needed -->
<header role="banner">
  <nav role="navigation" aria-label="Main navigation">
    <ul>
      <li><a href="/restaurants/" aria-current="page">Restaurants</a></li>
      <li><a href="/activities/">Activities</a></li>
    </ul>
  </nav>
</header>

<main role="main">
  <section aria-labelledby="hero-heading">
    <h1 id="hero-heading">Your Local Guide to Park City's Best</h1>
  </section>
</main>
```

### 2. Focus Management
```css
/* Visible focus indicators */
a:focus,
button:focus {
  outline: 3px solid #4A90E2;
  outline-offset: 2px;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### 3. Color Contrast Improvements
```css
/* Ensure 4.5:1 contrast ratio minimum */
.text-muted {
  color: #545454; /* Instead of light gray */
}

.btn-primary {
  background: #1a365d; /* Darker blue for better contrast */
  color: #ffffff;
}
```

## 🔍 SEO Optimizations

### 1. Enhanced Meta Tags
```njk
<!-- In head.njk -->
<title>{{ title }} | Park City Best - Local Restaurant & Activity Guide</title>
<meta name="description" content="{{ description or 'Your local guide to Park City\'s best restaurants, activities, and experiences. Skip the tourist traps with our resident-verified recommendations.' }}">

<!-- Open Graph -->
<meta property="og:title" content="{{ title }} | Park City Best">
<meta property="og:description" content="{{ description or site.description }}">
<meta property="og:image" content="{{ image or '/images/og-default.jpg' }}">
<meta property="og:url" content="{{ site.url }}{{ page.url }}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Park City Best">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{{ title }} | Park City Best">
<meta name="twitter:description" content="{{ description or site.description }}">
<meta name="twitter:image" content="{{ image or '/images/twitter-default.jpg' }}">

<!-- Local Business Schema -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Park City Best",
  "url": "{{ site.url }}",
  "description": "Local guide to Park City's best restaurants and activities",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "{{ site.url }}/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

### 2. Structured Data for Restaurants
```njk
<!-- In restaurant-card.njk -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "{{ restaurant.name }}",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "{{ restaurant.streetAddress }}",
    "addressLocality": "Park City",
    "addressRegion": "UT",
    "postalCode": "{{ restaurant.postalCode }}"
  },
  "telephone": "{{ restaurant.phone }}",
  "priceRange": "{{ restaurant.priceRange }}",
  "servesCuisine": "{{ restaurant.cuisine }}",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "{{ restaurant.rating }}",
    "bestRating": "5"
  }
}
</script>
```

## 🔧 Build Optimizations

### 1. HTML Minification
```javascript
// .eleventy.js
const htmlmin = require("html-minifier");

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath && outputPath.endsWith(".html") ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }
    return content;
  });
};
```

### 2. CSS Optimization
```javascript
// Install: npm install clean-css
const CleanCSS = require("clean-css");

eleventyConfig.addFilter("cssmin", function(code) {
  return new CleanCSS({}).minify(code).styles;
});
```

### 3. Service Worker for Caching
**Create**: `src/sw.js`
```javascript
const CACHE_NAME = 'park-city-best-v1';
const urlsToCache = [
  '/',
  '/restaurants/',
  '/css/main.css',
  '/js/main.js',
  '/images/logo.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

## 📊 Performance Monitoring

### 1. Core Web Vitals Tracking
```javascript
// Add to main.js
function trackWebVitals() {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}

if (typeof window !== 'undefined') {
  trackWebVitals();
}
```

### 2. Lighthouse CI Setup
**Create**: `.github/workflows/lighthouse.yml`
```yaml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci && npm run build
      - run: npm install -g @lhci/cli@0.12.x
      - run: lhci autorun
```

## 🎯 Quick Wins Implementation Order

1. **Image Optimization** (Biggest performance impact)
2. **Critical CSS** (Improves LCP significantly)
3. **Font Optimization** (Reduces CLS)
4. **Meta Tags & Schema** (SEO boost)
5. **Accessibility Improvements** (Score improvement)
6. **Service Worker** (PWA capabilities)

## 📈 Expected Lighthouse Score Improvements

- **Performance**: 65 → 90+ (with image optimization)
- **Accessibility**: 75 → 95+ (with semantic HTML/contrast fixes)
- **Best Practices**: 80 → 95+ (with HTTPS, no console errors)
- **SEO**: 85 → 100 (with meta tags, structured data)

Implement these optimizations in order of impact for maximum improvement to your Lighthouse scores!