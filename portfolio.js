// portfolio.js - Comprehensive Fixes

// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('currentYear');
const scrollToTopBtn = document.getElementById('scrollToTop');
const loadingScreen = document.querySelector('.loading-screen');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize project filter
    initProjectFilter();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize skill bars
    initSkillBars();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Initialize animated counters
    initAnimatedCounters();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

// Loading Screen
function initLoadingScreen() {
    if (!loadingScreen) return;
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1200);
}

// Mobile Menu Functionality
function initMobileMenu() {
    if (!mobileMenuBtn || !navLinks || !mobileMenuOverlay) return;
    
    function toggleMobileMenu() {
        navLinks.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        // Change menu icon
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    
    // Set initial aria attributes
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Project Filter Functionality
function initProjectFilter() {
    if (!filterBtns.length || !projectCards.length) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // Add active class to clicked button
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    // Trigger reflow for animation
                    void card.offsetWidth;
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Set initial aria states
    filterBtns.forEach((btn, index) => {
        btn.setAttribute('aria-label', `Filter projects by ${btn.textContent}`);
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    });
}

// Contact Form Functionality
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }
        
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show success message
        showNotification(`Thank you for your message, ${name}! I will get back to you soon at ${email}.`, 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    // Add form validation styling
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.remove('valid');
                this.classList.add('invalid');
            } else {
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.remove('invalid');
                this.classList.add('valid');
            }
        });
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        closeNotification(notification);
        clearTimeout(autoRemove);
    });
    
    // Add keyboard support
    notification.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeNotification(notification);
            clearTimeout(autoRemove);
        }
    });
}

function closeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#') return;
        
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;
    
    let lastScroll = 0;
    let ticking = false;
    
    function updateHeader() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class when not at top
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.progress');
    const skillsSection = document.getElementById('skills');
    
    if (!skillBars.length || !skillsSection) return;
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                bar.style.width = width + '%';
            }
        });
    }
    
    // Intersection Observer for skill bars animation
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 300);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    observer.observe(skillsSection);
}

// Scroll Animations with Staggered Effects
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.getAttribute('data-delay') || 0;
                const animation = element.getAttribute('data-animation') || 'fade-up';
                
                // Add staggered delay based on data-delay attribute
                setTimeout(() => {
                    element.classList.add('animated');
                    element.classList.add(animation);
                }, parseInt(delay));
                
                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Scroll to Top Button
function initScrollToTop() {
    if (!scrollToTopBtn) return;
    
    function updateScrollButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
            scrollToTopBtn.setAttribute('aria-hidden', 'false');
        } else {
            scrollToTopBtn.classList.remove('visible');
            scrollToTopBtn.setAttribute('aria-hidden', 'true');
        }
    }
    
    window.addEventListener('scroll', updateScrollButton);
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        scrollToTopBtn.blur(); // Remove focus after click
    });
    
    // Set initial state
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.setAttribute('aria-hidden', 'true');
    updateScrollButton();
}

// Animated Counters
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const suffix = counter.textContent.includes('+') ? '+' : '';
                const duration = 2000;
                const stepTime = Math.abs(Math.floor(duration / target));
                let current = 0;
                
                const timer = setInterval(() => {
                    current += 1;
                    counter.textContent = current + suffix;
                    
                    if (current >= target) {
                        counter.textContent = target + suffix;
                        clearInterval(timer);
                    }
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random delay to each element
        element.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.2) rotate(15deg)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
        
        // Add accessibility
        element.setAttribute('role', 'presentation');
        element.setAttribute('aria-hidden', 'true');
    });
}

// Parallax Effect for Background Shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.3 + (index * 0.1);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    // Only run on non-mobile devices
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', updateParallax);
        updateParallax(); // Initial call
    }
}

// Performance Optimizations
function initPerformanceOptimizations() {
    // Debounce function for scroll events
    function debounce(func, wait = 20, immediate = true) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll-intensive functions
    const debouncedScroll = debounce(() => {
        const header = document.getElementById('header');
        if (header) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Lazy load images (if any are added in future)
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    if (lazyImage.dataset.src) {
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach((img) => {
            lazyImageObserver.observe(img);
        });
    }
    
    // Add CSS for lazy loading
    const lazyCSS = `
    img.lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    img.lazy.loaded {
        opacity: 1;
    }
    `;
    
    const style = document.createElement('style');
    style.textContent = lazyCSS;
    document.head.appendChild(style);
}

// Initialize project cards animation delay
function initProjectCardsAnimation() {
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Tab key navigation enhancement
        if (e.key === 'Tab') {
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const modal = document.querySelector('.mobile-menu-overlay.active');
            
            if (modal) {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        }
    });
}

// Touch Events for Mobile
function initTouchEvents() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (navLinks.classList.contains('active')) {
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left to close
                toggleMobileMenu();
            }
        }
    }
}

// Initialize all features when window loads
window.addEventListener('load', () => {
    // Add loaded class to body for transition effects
    document.body.classList.add('loaded');
    
    // Initialize project card animations
    initProjectCardsAnimation();
    
    // Initialize keyboard navigation
    initKeyboardNavigation();
    
    // Initialize touch events
    if ('ontouchstart' in window) {
        initTouchEvents();
    }
    
    // Initialize any interactive elements
    const interactiveElements = document.querySelectorAll('.skill-item, .project-card, .stat-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('hover-active');
        });
        el.addEventListener('mouseleave', () => {
            el.classList.remove('hover-active');
        });
    });
    
    // Add CSS for hover-active class
    const hoverActiveCSS = `
    .hover-active {
        z-index: 10;
    }
    
    .contact-form input.valid,
    .contact-form textarea.valid {
        border-color: #10b981 !important;
    }
    
    .contact-form input.invalid,
    .contact-form textarea.invalid {
        border-color: #ef4444 !important;
    }
    `;
    
    const hoverStyle = document.createElement('style');
    hoverStyle.textContent = hoverActiveCSS;
    document.head.appendChild(hoverStyle);
    
    // Add notification CSS
    const notificationCSS = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(150%);
        transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        z-index: 9999;
        border-left: 4px solid #10b981;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-error {
        border-left-color: #ef4444;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-content i {
        font-size: 1.5rem;
        color: #10b981;
    }
    
    .notification-error .notification-content i {
        color: #ef4444;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: #64748b;
        cursor: pointer;
        font-size: 1rem;
        padding: 5px;
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    
    .notification-close:hover {
        color: #1e293b;
        background: #f1f5f9;
    }
    `;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = notificationCSS;
    document.head.appendChild(notificationStyle);
});

// Fallback for older browsers
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
        return setTimeout(callback, 1000 / 60);
    };
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initLoadingScreen,
        initMobileMenu,
        initProjectFilter,
        initContactForm,
        initSmoothScrolling,
        initHeaderScroll,
        initSkillBars,
        initScrollAnimations,
        initScrollToTop,
        initAnimatedCounters,
        initFloatingElements,
        initParallaxEffect
    };
}