// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initFaqAccordion();
    initNewsletterForm();
});

/**
 * Navbar Functionality
 * - Handles active link highlighting
 * - Implements scroll effect for navbar
 */
function initNavbar() {
    // Set active class on current page link
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentLocation.includes(linkPath) && linkPath !== '/') {
            link.classList.add('active');
        } else if (currentLocation === '/' && linkPath === '/index.html') {
            link.classList.add('active');
        }
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.add('shadow-md');
            navbar.classList.add('bg-white/95');
            navbar.classList.add('backdrop-blur-sm');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('bg-white/95');
            navbar.classList.remove('backdrop-blur-sm');
        }
    });
}

/**
 * Mobile Menu Functionality
 * - Toggles mobile menu visibility
 * - Handles hamburger button animation
 * - Manages body scroll locking
 */
function initMobileMenu() {
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const body = document.body;
    
    if (!hamburgerButton || !mobileMenu) return;
    
    hamburgerButton.addEventListener('click', () => {
        // Toggle mobile menu visibility
        mobileMenu.classList.toggle('hidden');
        
        // Toggle hamburger button animation class
        hamburgerButton.classList.toggle('mobile-menu-open');
        
        // Prevent scrolling when menu is open
        if (!mobileMenu.classList.contains('hidden')) {
            body.style.overflow = 'hidden';
            
            // Animation coordinates for hamburger to X
            line1.classList.add('translate-y-1.5', 'rotate-45');
            line2.classList.add('opacity-0');
            line3.classList.add('-translate-y-1.5', '-rotate-45');
        } else {
            body.style.overflow = '';
            
            // Revert animation
            line1.classList.remove('translate-y-1.5', 'rotate-45');
            line2.classList.remove('opacity-0');
            line3.classList.remove('-translate-y-1.5', '-rotate-45');
        }
    });
    
    // Get hamburger button lines
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
}

/**
 * FAQ Accordion Functionality
 * - Toggles visibility of FAQ answers
 * - Handles accordion animation
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (!question) return;
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('faq-item-active')) {
                    otherItem.classList.remove('faq-item-active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('faq-item-active');
        });
    });
}

/**
 * Newsletter Form Functionality
 * - Validates email input
 * - Handles form submission with loading state
 * - Shows success message
 */
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (!newsletterForm) return;
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button[type="submit"]');
    const errorMessage = newsletterForm.querySelector('.form-error-message');
    
    if (!emailInput || !submitButton) return;
    
    // Email validation
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };
    
    // Real-time validation
    emailInput.addEventListener('input', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            if (errorMessage) errorMessage.classList.add('show');
        } else {
            if (errorMessage) errorMessage.classList.remove('show');
        }
    });
    
    // Form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate email
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            if (errorMessage) errorMessage.classList.add('show');
            return;
        }
        
        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Subscribing...';
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            emailInput.value = '';
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Show success message
            alert('Thanks for subscribing to our newsletter!');
        }, 1500);
    });
}

/**
 * Contact Form Functionality
 * - Validates form inputs
 * - Handles form submission
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form elements
        const firstNameInput = contactForm.querySelector('#first_name');
        const lastNameInput = contactForm.querySelector('#last_name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');
        
        // Basic validation
        if (!firstNameInput.value || !lastNameInput.value || !emailInput.value || !messageInput.value) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            
            // Show success message
            alert('Your message has been sent successfully!');
        }, 1500);
    });
}

/**
 * Google Maps Initialization
 * Called by the Google Maps API callback
 */
function initMap() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) return;
    
    // Use actual coordinates for your location
    const location = { lat: 23.0334353, lng: 72.5246514 };
    
    const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: location,
    });
    
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Paatheya Academy'
    });
} 