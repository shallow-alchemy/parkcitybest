// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.main-nav')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and content sections
    document.querySelectorAll('.card, .content-section').forEach(el => {
        observer.observe(el);
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Theme Switcher UI
document.addEventListener('DOMContentLoaded', function() {
    // Create theme switcher button
    const themeSwitcher = document.createElement('div');
    themeSwitcher.className = 'theme-switcher';
    themeSwitcher.innerHTML = `
        <button class="theme-switcher-toggle" aria-label="Toggle theme selector">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        </button>
        <div class="theme-switcher-menu">
            <h4>Choose Theme</h4>
            <button data-theme="summer" class="theme-option">
                <span class="theme-icon">☀️</span>
                <span>Summer</span>
            </button>
            <button data-theme="autumn" class="theme-option">
                <span class="theme-icon">🍂</span>
                <span>Autumn</span>
            </button>
            <button data-theme="winter" class="theme-option">
                <span class="theme-icon">❄️</span>
                <span>Winter</span>
            </button>
            <button data-theme="auto" class="theme-option">
                <span class="theme-icon">🔄</span>
                <span>Auto (Seasonal)</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(themeSwitcher);
    
    const toggle = themeSwitcher.querySelector('.theme-switcher-toggle');
    const menu = themeSwitcher.querySelector('.theme-switcher-menu');
    const options = themeSwitcher.querySelectorAll('.theme-option');
    
    // Toggle menu
    toggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!themeSwitcher.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
    
    // Handle theme selection
    options.forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            
            if (theme === 'auto') {
                // Clear override to use seasonal theme
                window.parkCityTheme.clearOverride();
            } else {
                // Set manual theme
                window.parkCityTheme.setTheme(theme);
            }
            
            // Update active state
            options.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Close menu
            menu.classList.remove('active');
        });
    });
    
    // Set initial active state
    function updateActiveTheme() {
        const currentTheme = window.parkCityTheme.getActiveTheme();
        const isAuto = !localStorage.getItem('park-city-theme-override');
        
        options.forEach(opt => {
            opt.classList.remove('active');
            if (isAuto && opt.getAttribute('data-theme') === 'auto') {
                opt.classList.add('active');
            } else if (!isAuto && opt.getAttribute('data-theme') === currentTheme) {
                opt.classList.add('active');
            }
        });
    }
    
    // Initial update
    updateActiveTheme();
});

// Newsletter Subscription Handler
document.addEventListener('DOMContentLoaded', function() {
    const STORAGE_KEY = 'park-city-newsletter-subscribed';
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    const formRow = newsletterForm.querySelector('.form-row');
    const emailInput = newsletterForm.querySelector('input[name="email"]');
    
    // Check if user is already subscribed
    function checkSubscriptionStatus() {
        const isSubscribed = localStorage.getItem(STORAGE_KEY) === 'true';
        if (isSubscribed) {
            showSubscribedState();
        }
    }
    
    // Show subscribed confirmation state
    function showSubscribedState() {
        formRow.innerHTML = `
            <div class="subscription-confirmed">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span>You are subscribed!</span>
            </div>
        `;
    }
    
    // Handle form submission
    newsletterForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = emailInput.value;
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        
        // Disable form while submitting
        emailInput.disabled = true;
        submitButton.disabled = true;
        submitButton.textContent = 'Subscribing...';
        
        try {
            // Submit to Netlify Forms
            const response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    'form-name': 'newsletter',
                    'email': email
                }).toString()
            });
            
            if (response.ok) {
                // Save subscription status
                localStorage.setItem(STORAGE_KEY, 'true');
                
                // Show success state
                showSubscribedState();
                
                // Optional: Track event if analytics is set up
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'newsletter_signup', {
                        'event_category': 'engagement',
                        'event_label': 'newsletter'
                    });
                }
            } else {
                throw new Error('Subscription failed');
            }
        } catch (error) {
            // Re-enable form on error
            emailInput.disabled = false;
            submitButton.disabled = false;
            submitButton.textContent = 'Subscribe';
            
            // Show error message
            alert('Sorry, there was an error subscribing. Please try again.');
            console.error('Newsletter subscription error:', error);
        }
    });
    
    // Check subscription status on page load
    checkSubscriptionStatus();
});