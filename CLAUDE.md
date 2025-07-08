# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context
Reference the following documentation files for complete project understanding:

- `docs/PROJECT_OVERVIEW.md` - Mission, strategy, revenue model, and content pillars
- `docs/ENGINEERING_GUIDELINES.md` - 11ty architecture, component patterns, and performance standards  
- `docs/CONTENT_STANDARDS.md` - Research process, content structure, and quality requirements
- `docs/DEVELOPMENT_WORKFLOW.md` - Git workflow, deployment, and content update procedures

## Key Requirements from Strategy
- Superior organization and user experience vs competitors
- Complete practical information for each restaurant/activity
- Mobile-first design with visual elements
- 15-20 curated listings vs competitor's 60-100
- Focus on content gaps: seasonal, budget, dietary options
- 2,000+ words per major page with 8-12 images
- Local authority signals and insider knowledge

## Technical Standards
- 11ty static site generation for SEO performance
- Component-driven architecture using Nunjucks templates
- Lighthouse score 90+ across all metrics
- Structured data implementation for local SEO
- JSON-driven content management in `_data/` directory
- Mobile-first CSS with CSS Grid/Flexbox

## Development Priorities
1. **Performance First**: Optimize for Core Web Vitals
2. **SEO Foundation**: Semantic HTML, meta data, structured data
3. **Scalable Components**: Reusable across content types
4. **Content Strategy**: Follow research guardrails for authenticity
5. **Local Authority**: Include practical details (parking, hours, insider tips)

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

Build all features following the technical requirements and content standards outlined in the docs/ folder.