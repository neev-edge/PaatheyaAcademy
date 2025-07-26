/**
 * Main Entry Point for Paatheya Academy Website
 * This file loads and initializes all required JavaScript components
 */

// Initialize common components
document.addEventListener('DOMContentLoaded', function() {
    // Apply fade-in animations
    initAOS();
    
    // Initialize common functionality
    initCommonFunctionality();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize FAQ accordion if it exists
    initFAQAccordion();
    
    // Check if we're on contact page and initialize the form if needed
    if (window.location.pathname.includes('contact')) {
        initContactForm();
    }
});

/**
 * Initialize AOS animations
 */
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            offset: 100,
            delay: 50,
            duration: 1000,
            easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
            once: false,
            mirror: true,
            anchorPlacement: 'top-bottom',
            disable: 'mobile'
        });
    }
}

/**
 * Initialize common functionality across the site
 */
function initCommonFunctionality() {
    // Add page load timestamp for performance tracking
    window.pageLoadTime = new Date().getTime();
    
    // Add passive event listeners for better scroll performance
    const supportsPassive = checkPassiveSupport();
    const wheelOpt = supportsPassive ? { passive: true } : false;
    
    window.addEventListener('scroll', function() {
        // Throttled scroll handler for performance
        if (!window.ticking) {
            window.requestAnimationFrame(function() {
                // Handle navbar scroll effects
                handleNavbarScroll();
                window.ticking = false;
            });
            window.ticking = true;
        }
    }, wheelOpt);
    
    // Initialize lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback to Intersection Observer for lazy loading
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(image => imageObserver.observe(image));
    }
}

/**
 * Initialize navigation functionality
 */
function initNavigation() {
    // Get elements
    const hamburgerButton = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const line1 = document.getElementById('line1');
    const line2 = document.getElementById('line2');
    const line3 = document.getElementById('line3');
    
    // Set active nav link
    setActiveNavLink();
    
    // Toggle mobile menu
    if (hamburgerButton && mobileMenu) {
        hamburgerButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            if (mobileMenu.classList.contains('hidden')) {
                // Menu is closed, reset icon
                if (line1) line1.classList.remove('translate-y-1.5', 'rotate-45');
                if (line2) line2.classList.remove('opacity-0');
                if (line3) line3.classList.remove('-translate-y-1.5', '-rotate-45');
                
                // Enable scrolling
                document.body.style.overflow = '';
            } else {
                // Menu is open, show X icon
                if (line1) line1.classList.add('translate-y-1.5', 'rotate-45');
                if (line2) line2.classList.add('opacity-0');
                if (line3) line3.classList.add('-translate-y-1.5', '-rotate-45');
                
                // Disable scrolling when menu is open
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(e.target) && 
                !hamburgerButton.contains(e.target)) {
                
                // Close menu
                mobileMenu.classList.add('hidden');
                
                // Reset hamburger icon
                if (line1) line1.classList.remove('translate-y-1.5', 'rotate-45');
                if (line2) line2.classList.remove('opacity-0');
                if (line3) line3.classList.remove('-translate-y-1.5', '-rotate-45');
                
                // Enable scrolling
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when pressing escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                // Close menu
                mobileMenu.classList.add('hidden');
                
                // Reset hamburger icon
                if (line1) line1.classList.remove('translate-y-1.5', 'rotate-45');
                if (line2) line2.classList.remove('opacity-0');
                if (line3) line3.classList.remove('-translate-y-1.5', '-rotate-45');
                
                // Enable scrolling
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when window is resized to desktop size
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
                // Close menu
                mobileMenu.classList.add('hidden');
                
                // Reset hamburger icon
                if (line1) line1.classList.remove('translate-y-1.5', 'rotate-45');
                if (line2) line2.classList.remove('opacity-0');
                if (line3) line3.classList.remove('-translate-y-1.5', '-rotate-45');
                
                // Enable scrolling
                document.body.style.overflow = '';
            }
        });
    }
}

/**
 * Handle navbar scroll effects
 */
// function handleNavbarScroll() {
//     const navbar = document.querySelector('.navbar');
//     if (!navbar) return;
    
//     let lastScrollTop = 0;
//     let scrollDelta = 5;
//     let navbarHeight = navbar.offsetHeight;
    
//     // Initial check
//     toggleNavbarClass();
    
//     // Add scroll event listener with improved performance
//     window.addEventListener('scroll', () => {
//         if (!window.ticking) {
//             window.requestAnimationFrame(() => {
//                 toggleNavbarClass();
//                 window.ticking = false;
//             });
//             window.ticking = true;
//         }
//     });
    
//     function toggleNavbarClass() {
//         const scrollTop = window.scrollY;
        
//         // Navbar color/shadow change on scroll
//         if (scrollTop > 50) {
//             navbar.classList.add('navbar-scrolled');
//             navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
//             navbar.style.backdropFilter = 'blur(10px)';
//             navbar.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
//         } else {
//             navbar.classList.remove('navbar-scrolled');
//             navbar.style.boxShadow = 'none';
//             navbar.style.backdropFilter = 'none';
//         }
        
//         // Hide navbar when scrolling down, show when scrolling up
//         if (Math.abs(lastScrollTop - scrollTop) <= scrollDelta) {
//             return;
//         }
        
//         if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
//             // Scrolling down
//             navbar.classList.add('navbar-hidden');
//             navbar.style.transform = 'translateY(-100%)';
//         } else {
//             // Scrolling up
//             navbar.classList.remove('navbar-hidden');
//             navbar.style.transform = 'translateY(0)';
//         }
        
//         lastScrollTop = scrollTop;
//     }
    
//     // Add smooth scrolling to all anchor links
//     document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//         anchor.addEventListener('click', function(e) {
//             e.preventDefault();
            
//             const targetId = this.getAttribute('href');
//             if (targetId === '#') return;
            
//             const targetElement = document.querySelector(targetId);
//             if (!targetElement) return;
            
//             const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
//             window.scrollTo({
//                 top: offsetTop,
//                 behavior: 'smooth'
//             });
//         });
//     });
// }

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');
    
    // Function to check if link matches current page
    function isActivePage(href) {
        return href === currentPath || 
               (currentPath === '/' && href === '/index.html') ||
               (href !== '/' && href !== '/index.html' && currentPath.includes(href));
    }
    
    // Set active state for desktop menu
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (isActivePage(href)) {
            link.classList.add('active');
        }
    });
    
    // Set active state for mobile menu
    mobileLinks.forEach(link => {
        link.classList.remove('text-[#4361ee]');
        
        const href = link.getAttribute('href');
        if (isActivePage(href)) {
            link.classList.add('text-[#4361ee]');
        }
    });
}

/**
 * Initialize FAQ accordion if it exists on the page
 */
function initFAQAccordion() {
    const faqButtons = document.querySelectorAll('.faq-button');
    
    if (faqButtons.length === 0) return;
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = button.querySelector('svg');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('faq-active')) {
                    const otherAnswer = item.querySelector('.faq-answer');
                    const otherIcon = item.querySelector('.faq-button svg');
                    
                    // Close this FAQ with smooth animation
                    item.classList.remove('faq-active');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = otherAnswer.scrollHeight + 'px';
                        setTimeout(() => {
                            otherAnswer.style.maxHeight = '0';
                        }, 10);
                    }
                    if (otherIcon) {
                        otherIcon.style.transform = 'rotate(0deg)';
                        otherIcon.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                    }
                }
            });
            
            // Toggle current FAQ with enhanced animation
            faqItem.classList.toggle('faq-active');
            
            if (faqItem.classList.contains('faq-active')) {
                // Add a slight delay for smoother expansion animation
                setTimeout(() => {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    answer.style.opacity = '1';
                }, 10);
                
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                    icon.style.transition = 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
                }
                
                // Add active style to the FAQ item for enhanced visual feedback
                faqItem.style.transform = 'translateY(-5px)';
                faqItem.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                faqItem.style.transition = 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)';
            } else {
                answer.style.maxHeight = '0';
                answer.style.opacity = '0';
                
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
                
                // Reset active styles
                faqItem.style.transform = 'translateY(0)';
                faqItem.style.boxShadow = 'none';
            }
        });
    });
    
    // Add styles for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s cubic-bezier(0.19, 1, 0.22, 1), 
                        opacity 0.4s cubic-bezier(0.19, 1, 0.22, 1),
                        margin 0.4s ease;
            opacity: 0;
        }
        .faq-item {
            transition: transform 0.4s cubic-bezier(0.19, 1, 0.22, 1),
                        box-shadow 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .faq-button svg {
            transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .faq-item.faq-active .faq-answer {
            opacity: 1;
            margin-top: 1rem;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Check if passive event listeners are supported
 */
function checkPassiveSupport() {
    let supportsPassive = false;
    try {
        const opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
                return true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}
    return supportsPassive;
}

/**
 * Initialize contact form functionality
 * Only loads if the current page is contact.html
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Form validation will be handled by contact-form.js
    console.log('Contact form initialized');
}
