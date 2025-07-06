/**
 * Automatic Seasonal Theme Detection with Manual Override
 * Detects user's season and applies appropriate theme
 */

(function() {
  'use strict';
  
  // Theme configuration
  const THEMES = {
    SUMMER: 'summer',
    AUTUMN: 'autumn',
    WINTER: 'winter'
  };
  
  // Storage key for manual override
  const STORAGE_KEY = 'park-city-theme-override';
  
  /**
   * Get current season based on month
   * Spring (March-May) maps to Summer theme
   * Summer (June-August) maps to Summer theme
   * Fall (September-November) maps to Autumn theme
   * Winter (December-February) maps to Winter theme
   */
  function getCurrentSeason() {
    const month = new Date().getMonth(); // 0-11
    
    if (month >= 2 && month <= 7) {
      // March through August = Summer
      return THEMES.SUMMER;
    } else if (month >= 8 && month <= 10) {
      // September through November = Autumn
      return THEMES.AUTUMN;
    } else {
      // December through February = Winter
      return THEMES.WINTER;
    }
  }
  
  /**
   * Get theme from localStorage override or detect from season
   */
  function getActiveTheme() {
    const override = localStorage.getItem(STORAGE_KEY);
    if (override && Object.values(THEMES).includes(override)) {
      return override;
    }
    return getCurrentSeason();
  }
  
  /**
   * Apply theme to body element and update images
   */
  function applyTheme(theme) {
    // Remove all theme classes
    Object.values(THEMES).forEach(t => {
      document.body.classList.remove(`theme-${t}`);
    });
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Update data attribute for CSS/JS reference
    document.body.setAttribute('data-theme', theme);
    
    // Update theme-aware images
    updateThemeImages(theme);
  }
  
  /**
   * Update all theme-aware images
   */
  function updateThemeImages(theme) {
    const images = document.querySelectorAll('.theme-aware-image');
    images.forEach(img => {
      const newSrc = img.getAttribute(`data-theme-${theme}`);
      const newAlt = img.getAttribute(`data-alt-${theme}`);
      
      if (newSrc && img.src !== newSrc) {
        img.src = newSrc;
      }
      
      if (newAlt) {
        img.alt = newAlt;
      }
    });
  }
  
  /**
   * Set manual theme override
   */
  function setThemeOverride(theme) {
    if (Object.values(THEMES).includes(theme)) {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    }
  }
  
  /**
   * Clear manual theme override
   */
  function clearThemeOverride() {
    localStorage.removeItem(STORAGE_KEY);
    applyTheme(getCurrentSeason());
  }
  
  /**
   * Initialize theme on page load
   */
  function initializeTheme() {
    const theme = getActiveTheme();
    applyTheme(theme);
  }
  
  // Apply theme immediately to prevent flash
  initializeTheme();
  
  // Re-apply after DOM content loaded to ensure body classes persist
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeTheme);
  }
  
  // Export functions for manual theme control
  window.parkCityTheme = {
    getCurrentSeason,
    getActiveTheme,
    setTheme: setThemeOverride,
    clearOverride: clearThemeOverride,
    themes: THEMES
  };
})();