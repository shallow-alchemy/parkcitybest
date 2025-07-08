Technology Stack

Framework: 11ty (Eleventy) for static site generation
Templates: Nunjucks for component reusability
Styling: Modern CSS with CSS Grid/Flexbox
Performance: Optimized images, minimal JavaScript
SEO: Semantic HTML, structured data, fast loading

Code Organization Principles
1. Component-Driven Architecture
src/
├── _includes/
│   ├── components/
│   │   ├── restaurant-card.njk
│   │   ├── activity-grid.njk
│   │   ├── hero-section.njk
│   │   └── cta-section.njk
│   ├── layouts/
│   │   ├── base.njk
│   │   ├── page.njk
│   │   └── content.njk
│   └── partials/
│       ├── head.njk
│       ├── header.njk
│       └── footer.njk
2. Data-Driven Content
src/_data/
├── restaurants.json
├── activities.json
├── hotels.json
├── site.json
└── navigation.json
3. Scalable URL Structure
/restaurants/           (main category page)
/activities/
├── /winter/           (seasonal subcategory)
├── /summer/
└── /year-round/
/hotels/
/nightlife/
/seasonal-guides/
/neighborhood-guides/
Performance Standards

Lighthouse Score: 90+ across all metrics
Core Web Vitals: Pass all thresholds
Image Optimization: WebP format, responsive images
CSS: Critical path optimization, no unused styles
JavaScript: Minimal, progressive enhancement only

Component Design Patterns
Reusable Restaurant Card
njk{# _includes/components/restaurant-card.njk #}
<article class="restaurant-card" itemscope itemtype="http://schema.org/Restaurant">
  <div class="restaurant-card__image">
    <img src="{{ restaurant.image }}" alt="{{ restaurant.name }}" loading="lazy">
  </div>
  <div class="restaurant-card__content">
    <h3 itemprop="name">{{ restaurant.name }}</h3>
    <p class="restaurant-card__cuisine">{{ restaurant.cuisine }}</p>
    <div class="restaurant-card__details">
      <span class="price-range">{{ restaurant.priceRange }}</span>
      <span class="rating">{{ restaurant.rating }}/5</span>
    </div>
    <p class="restaurant-card__description">{{ restaurant.description }}</p>
    <div class="restaurant-card__meta">
      <span itemprop="address">{{ restaurant.address }}</span>
      <span itemprop="telephone">{{ restaurant.phone }}</span>
    </div>
  </div>
</article>
Flexible Grid System
njk{# _includes/components/content-grid.njk #}
<section class="content-grid content-grid--{{ layout }}">
  {% for item in items %}
    <div class="content-grid__item">
      {% include "components/" + component + ".njk" %}
    </div>
  {% endfor %}
</section>
SEO Implementation Standards
Structured Data Requirements
json{
  "@context": "http://schema.org",
  "@type": "Restaurant",
  "name": "Restaurant Name",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Park City",
    "addressRegion": "UT",
    "postalCode": "84060"
  },
  "telephone": "+1-435-555-0123",
  "priceRange": "$$$$",
  "servesCuisine": "American"
}
Meta Data Template
njk{# _includes/partials/head.njk #}
<meta name="description" content="{{ description or site.description }}">
<meta property="og:title" content="{{ title }} | {{ site.name }}">
<meta property="og:description" content="{{ description or site.description }}">
<meta property="og:image" content="{{ image or site.defaultImage }}">
<meta property="og:url" content="{{ site.url }}{{ page.url }}">
<meta name="twitter:card" content="summary_large_image">
Content Management Patterns
Data Structure Standards
json{
  "restaurants": [
    {
      "id": "riverhorse-cafe",
      "name": "Riverhorse on Main",
      "cuisine": "Contemporary American",
      "priceRange": "$$$$",
      "rating": 4.6,
      "description": "Upscale dining in historic Main Street building",
      "address": "540 Main St, Park City, UT 84060",
      "phone": "(435) 649-3536",
      "hours": {
        "monday": "5:00 PM - 10:00 PM",
        "tuesday": "5:00 PM - 10:00 PM"
      },
      "features": ["Fine Dining", "Historic Building", "Wine List"],
      "seasonality": "year-round",
      "reservations": "recommended",
      "parkingNotes": "Valet available",
      "insiderTip": "Ask for a table by the fireplace in winter",
      "image": "/images/restaurants/riverhorse-exterior.webp",
      "gallery": [
        "/images/restaurants/riverhorse-interior-1.webp",
        "/images/restaurants/riverhorse-dish-1.webp"
      ]
    }
  ]
}
Mobile-First CSS Architecture
css/* Base mobile styles */
.restaurant-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
}

/* Tablet styles */
@media (min-width: 768px) {
  .restaurant-card {
    flex-direction: row;
    margin-bottom: 2rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
}
Build Configuration
js// .eleventy.js key configurations
module.exports = function(eleventyConfig) {
  // Image optimization
  eleventyConfig.addPlugin(require("@11ty/eleventy-img"));
  
  // Minification
  eleventyConfig.addTransform("htmlmin", require("./src/transforms/htmlmin.js"));
  
  // Collections
  eleventyConfig.addCollection("restaurants", collection => {
    return collection.getFilteredByGlob("src/restaurants/*.md");
  });
  
  // Filters
  eleventyConfig.addFilter("formatPhone", phone => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  });
  
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    }
  };
};