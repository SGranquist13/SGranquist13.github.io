// Smooth scroll and navigation functionality

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active navigation state management
    function updateActiveNav() {
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Update active nav on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Set initial active state
    updateActiveNav();
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const headerOffset = 80;
                const elementPosition = aboutSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Skill item interactions (additional hover effects handled by CSS)
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // Scroll-triggered animations
    const animatedSections = document.querySelectorAll('.about, .skills, .experience, .education, .contact');
    
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    animatedSections.forEach(section => {
        scrollObserver.observe(section);
    });
    
    // Check initial visibility for sections already in viewport
    function checkInitialVisibility() {
        animatedSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight * 0.9 && rect.bottom > -100;
            if (isVisible) {
                section.classList.add('visible');
            }
        });
    }
    
    // Check on load
    checkInitialVisibility();
    
    // Also check on scroll for better performance
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                checkInitialVisibility();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Calculate and display experience duration
    function calculateDuration(startDate, endDate) {
        const start = new Date(startDate + '-01');
        const end = endDate === 'present' ? new Date() : new Date(endDate + '-01');
        
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        // Handle case where we're in the same month
        if (months === 0 && years === 0) {
            months = 1; // At least 1 month
        }
        
        const parts = [];
        if (years > 0) {
            parts.push(years === 1 ? '1 year' : `${years} years`);
        }
        if (months > 0) {
            parts.push(months === 1 ? '1 month' : `${months} months`);
        }
        
        return parts.length > 0 ? `(${parts.join(' ')})` : '';
    }
    
    // Calculate durations for all experience items
    const experienceDates = document.querySelectorAll('.experience-date[data-start]');
    experienceDates.forEach(dateElement => {
        const startDate = dateElement.getAttribute('data-start');
        const endDate = dateElement.getAttribute('data-end');
        const durationElement = dateElement.nextElementSibling;
        
        if (durationElement && durationElement.classList.contains('experience-duration')) {
            const duration = calculateDuration(startDate, endDate);
            durationElement.textContent = duration;
        }
    });
});
