/* ===================================
   TRINIDAD FOOD & CULTURE - MAIN JAVASCRIPT
   =================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    /* ===================================
       HAMBURGER MENU TOGGLE
       =================================== */
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    function toggleMenu() {
        const isOpen = hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Update ARIA attribute for accessibility
        hamburger.setAttribute('aria-expanded', isOpen);
        
        // Prevent body scroll when menu is open
        body.style.overflow = isOpen ? 'hidden' : '';
        
        // Focus on first menu item when opening
        if (isOpen) {
            navMenu.querySelector('a').focus();
        }
    }
    
    // Toggle menu on hamburger click
    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }
    
    // Close menu on overlay click
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }
    
    // Close menu on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // Close menu when clicking navigation links
    if (navMenu) {
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }
    
    
    /* ===================================
       LEARN MORE BUTTON FUNCTIONALITY
       (For Dishes & Culture Pages)
       =================================== */
    
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
    
    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.food-card, .culture-card');
            const fullDescription = card.querySelector('.card-full-description');
            const isExpanded = fullDescription.classList.contains('expanded');
            
            // Toggle expanded state
            fullDescription.classList.toggle('expanded');
            this.classList.toggle('expanded');
            
            // Update button text
            const buttonText = this.querySelector('span:first-child');
            buttonText.textContent = isExpanded ? 'Learn More' : 'Show Less';
            
            // Update ARIA attribute for accessibility
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Smooth scroll to keep card in view when expanding
            if (!isExpanded) {
                setTimeout(() => {
                    card.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
    
});