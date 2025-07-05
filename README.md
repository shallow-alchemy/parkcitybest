# Park City Utah Guide

A comprehensive 10-page guide to Park City, Utah built with Eleventy (11ty) static site generator. Features skiing, hiking, dining, accommodations, events, and more.

## 🏔️ Features

- **Fast & SEO-Optimized**: Built with 11ty for lightning-fast performance
- **Mobile-First Responsive**: Works perfectly on all devices
- **10 Comprehensive Pages**: Complete guide to Park City activities
- **Modern Design**: Clean, accessible interface with smooth animations
- **Netlify Ready**: One-click deployment to Netlify

## 📄 Site Structure

1. **Homepage** - Overview and navigation to all sections
2. **Skiing & Snowboarding** - Complete resort guide, trails, tips
3. **Hiking & Trails** - Trail maps, difficulty guides, seasonal info
4. **Mountain Biking** - Bike trails, rentals, guided tours
5. **Dining & Nightlife** - Restaurant guides, bars, entertainment
6. **Events & Festivals** - Annual events, calendars, tickets
7. **Accommodations** - Hotels, resorts, vacation rentals
8. **Family Activities** - Kid-friendly attractions and activities
9. **Shopping & Spas** - Boutiques, outlets, wellness centers
10. **Plan Your Visit** - Transportation, weather, practical info

## 🚀 Quick Start

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### Deploy to Netlify

1. **Connect Repository**: Link your GitHub repo to Netlify
2. **Build Settings**: 
   - Build command: `npm run build`
   - Publish directory: `_site`
3. **Deploy**: Netlify will auto-deploy on every push

Or use Netlify CLI:
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=_site
```

## 🔧 Development

### Tech Stack
- **Static Site Generator**: Eleventy (11ty)
- **Templating**: Nunjucks
- **Styling**: Vanilla CSS with CSS Grid & Flexbox
- **JavaScript**: Vanilla JS for interactions
- **Build Tools**: NPM scripts, HTML minification

### File Structure
```
park_city_best_of/
├── src/
│   ├── layouts/base.njk      # Base template
│   ├── css/main.css          # Styles
│   ├── js/main.js            # JavaScript
│   ├── index.njk             # Homepage
│   └── [page-name]/index.njk # Individual pages
├── _site/                    # Generated site
├── .eleventy.js              # 11ty configuration
└── netlify.toml              # Netlify settings
```

## 📱 Performance Features

- **Fast Loading**: Optimized CSS/JS, HTML minification
- **SEO Ready**: Meta tags, Open Graph, structured data
- **Accessibility**: Semantic HTML, proper ARIA labels
- **Mobile Responsive**: Mobile-first CSS design
- **Progressive Enhancement**: Works without JavaScript

## 🎯 SEO Optimization

- Semantic HTML structure
- Comprehensive meta tags
- Open Graph social sharing
- XML sitemap
- Robots.txt
- Structured data (JSON-LD)
- Fast loading times
- Mobile-friendly design

## 🔍 Local Testing

```bash
# Build and serve locally
npm run build
npx serve _site

# Or use development server
npm start
```

Visit `http://localhost:8080` to view the site.

## 📊 Analytics & Monitoring

Add your analytics code to `src/layouts/base.njk`:
- Google Analytics
- Google Tag Manager
- Any other tracking scripts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📝 Content Updates

Content is stored in individual page files in the `src/` directory. Update any `.njk` file and rebuild to see changes.

## 🆘 Support

For issues with:
- **11ty**: Check [11ty documentation](https://www.11ty.dev/docs/)
- **Netlify**: Check [Netlify docs](https://docs.netlify.com/)
- **Deployment**: Ensure build command and publish directory are correct

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for Park City visitors and adventure seekers!