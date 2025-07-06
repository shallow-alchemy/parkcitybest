module.exports = {
  // Current theme - change this single line to switch all site images
  currentTheme: 'winter',
  
  // Theme-to-image mappings
  themes: {
    summer: {
      hero: '/images/parkcity_town.jpg',
      defaultRestaurant: '/images/parkcity_summer.jpg',
      heroAlt: 'Park City summer town view with vibrant green landscapes',
      restaurantAlt: 'Park City summer dining scene'
    },
    autumn: {
      hero: '/images/parkcity_downtown.jpg',
      defaultRestaurant: '/images/parkcity_nightlife.jpg',
      heroAlt: 'Park City downtown Main Street in autumn with fall colors',
      restaurantAlt: 'Park City autumn nightlife and dining scene'
    },
    winter: {
      hero: '/images/parkcity_winter_homes.jpg',
      defaultRestaurant: '/images/parkcity_winter_scene.jpg',
      heroAlt: 'Park City winter homes covered in snow with mountain backdrop',
      restaurantAlt: 'Park City winter dining and snow scene'
    }
  },
  
  // Fallback images for when theme images are missing
  fallbacks: {
    hero: '/images/parkcity_downtown.jpg',
    restaurant: '/images/parkcity_nightlife.jpg',
    heroAlt: 'Park City downtown Main Street',
    restaurantAlt: 'Park City dining scene'
  },
  
  // Helper function to get current theme images
  getCurrentTheme() {
    return this.themes[this.currentTheme] || this.themes.autumn;
  },
  
  // Helper function to get image with fallback
  getImage(category) {
    const currentTheme = this.getCurrentTheme();
    return currentTheme[category] || this.fallbacks[category];
  },
  
  // Helper function to get alt text with fallback
  getAlt(category) {
    const currentTheme = this.getCurrentTheme();
    const altKey = category + 'Alt';
    return currentTheme[altKey] || this.fallbacks[altKey];
  }
};