Git Workflow
bash# Feature development
git checkout -b feature/restaurant-pages
git add .
git commit -m "feat: add restaurant detail components"
git push origin feature/restaurant-pages

# Main branch protection
- All changes via pull requests
- Require code review for major features
- Automated testing via GitHub Actions
Development Commands
bash# Local development
npm run dev          # Start 11ty with hot reload
npm run build        # Production build
npm run serve        # Serve production build locally
npm run test         # Run tests
npm run lint         # Check code style
npm run optimize     # Optimize images and assets
Deployment Pipeline
yaml# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v1.2
Performance Monitoring

Core Web Vitals: Monitor via Google Search Console
Lighthouse CI: Automated performance testing
Analytics: Google Analytics 4 + Google Search Console
Error Tracking: Sentry for client-side errors

Content Update Workflow

Research: Use restaurant research guardrail (30 min per venue)
Data Entry: Update JSON files in _data/ directory
Content Writing: Follow content standards for consistency
Image Processing: Optimize and add to appropriate directories
Testing: Local preview before deployment
SEO Check: Verify meta data, structured data, internal linking