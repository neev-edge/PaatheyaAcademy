/**
 * Contact Form Validation & Submission
 * This file manages form validation and submission logic specifically for the contact page
 */
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
});

/**
 * Initializes the contact form validation and submission handling
 */
function initContactForm() {
    const contactForm = document.querySelector('form[action="#"]');
    
    if (!contactForm) return;
    
    // Add contact-form class for styling
    contactForm.classList.add('contact-form');
    
    // Get form elements
    const firstNameInput = contactForm.querySelector('#first_name');
    const lastNameInput = contactForm.querySelector('#last_name');
    const emailInput = contactForm.querySelector('#email');
    const phoneInput = contactForm.querySelector('#phone');
    const courseSelect = contactForm.querySelector('#course');
    const messageInput = contactForm.querySelector('#message');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    
    // Add form-input class to all inputs for styling
    contactForm.querySelectorAll('input, textarea, select').forEach(el => {
        el.classList.add('form-input');
    });
    
    // Email validation function
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };
    
    // Phone validation function
    const validatePhone = (phone) => {
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phone === '' || re.test(phone);
    };
    
    // Create error message elements
    const createErrorElement = (inputElement, message) => {
        // Check if error element already exists
        let errorElement = inputElement.parentElement.querySelector('.form-error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'form-error-message';
            inputElement.parentElement.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        return errorElement;
    };
    
    // Real-time validation for email
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const errorElement = createErrorElement(emailInput, 'Please enter a valid email address');
            
            if (emailInput.value && !validateEmail(emailInput.value)) {
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
        });
    }
    
    // Real-time validation for phone
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            const errorElement = createErrorElement(phoneInput, 'Please enter a valid phone number or leave empty');
            
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                errorElement.classList.add('show');
            } else {
                errorElement.classList.remove('show');
            }
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate first name
        if (!firstNameInput.value) {
            const errorElement = createErrorElement(firstNameInput, 'First name is required');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // Validate last name
        if (!lastNameInput.value) {
            const errorElement = createErrorElement(lastNameInput, 'Last name is required');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // Validate email
        if (!emailInput.value || !validateEmail(emailInput.value)) {
            const errorElement = createErrorElement(emailInput, 'Valid email is required');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // Validate phone
        if (phoneInput.value && !validatePhone(phoneInput.value)) {
            const errorElement = createErrorElement(phoneInput, 'Please enter a valid phone number');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // Validate course selection
        if (courseSelect && !courseSelect.value) {
            const errorElement = createErrorElement(courseSelect, 'Please select a course');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value) {
            const errorElement = createErrorElement(messageInput, 'Message is required');
            errorElement.classList.add('show');
            isValid = false;
        }
        
        // If all validations pass
        if (isValid) {
            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...';
            
            // Simulate API call - Replace with actual API call in production
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                
                // Show success message
                alert('Thank you for your message! We will get back to you shortly.');
                
                // Reset all error messages
                contactForm.querySelectorAll('.form-error-message').forEach(el => {
                    el.classList.remove('show');
                });
            }, 1500);
        }
    });
} 