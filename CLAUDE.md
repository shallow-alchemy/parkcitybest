# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for a Park City, Utah travel guide built with Eleventy (11ty) v2.0.1. The site uses Nunjucks templating, vanilla CSS, and vanilla JavaScript.

## Essential Commands

```bash
# Start development server with live reload
npm start

# Build the static site to _site directory
npm run build

# Clean the build directory
npm run clean
```

## Architecture & Structure

### Core Technologies
- **Static Site Generator**: Eleventy 2.0.1
- **Templating**: Nunjucks (.njk files)
- **Styling**: Vanilla CSS (no preprocessors or frameworks)
- **JavaScript**: Vanilla JS (no frameworks)
- **Deployment**: Netlify

### Directory Structure
- `src/` - All source files
  - `layouts/base.njk` - Base template with SEO meta tags and site structure
  - `css/main.css` - All styles in a single CSS file
  - `js/main.js` - All JavaScript functionality
  - `images/` - Static images
  - `index.njk` - Homepage
  - `[page-name]/index.njk` - Individual page directories
- `_site/` - Generated static output (gitignored)
- `.eleventy.js` - Eleventy configuration with HTML minification
- `netlify.toml` - Deployment and security headers configuration

### Page Organization
Each page follows the pattern `src/[page-name]/index.njk` and includes:
- Front matter with title, description, and meta tags
- Content wrapped in the base layout
- Consistent structure for SEO and navigation

### Key Implementation Details
1. **SEO**: Base template includes comprehensive meta tags, Open Graph tags, and structured data (JSON-LD)
2. **Performance**: HTML minification in production, static asset passthrough, proper caching headers
3. **Security**: Headers configured in netlify.toml (X-Frame-Options, X-XSS-Protection, etc.)
4. **Responsive Design**: CSS Grid and Flexbox for layout, mobile-first approach

### Development Considerations
- No build step for CSS/JS - files are used directly
- Images should be optimized before adding to `src/images/`
- All pages inherit from `src/layouts/base.njk`
- Navigation is managed in the base template
- Each page requires title and description in front matter