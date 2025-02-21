// DOM Elements
const hamburgerMenu = document.querySelector('.hamburger-menu');
const navigation = document.querySelector('.navigation');
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

// Mobile Navigation Toggle
hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    navigation.classList.toggle('active');
    
    // Transform hamburger to X
    const bars = hamburgerMenu.querySelectorAll('.bar');
    if (hamburgerMenu.classList.contains('active')) {
        bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
    }
});

// Tab Navigation
tabLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        
        // Close mobile menu if open
        if (navigation.classList.contains('active')) {
            hamburgerMenu.click();
        }
        
        // Remove active class from all tabs
        tabLinks.forEach(tab => tab.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to current tab
        link.classList.add('active');
        const tabId = link.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Scroll to tab content
        setTimeout(() => {
            document.getElementById(tabId).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    });
});

// Footer link navigation
document.querySelectorAll('.footer-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const linkText = link.textContent.toLowerCase();
        
        // Find corresponding tab
        tabLinks.forEach(tab => {
            if (tab.textContent.toLowerCase() === linkText) {
                tab.click();
            }
        });
    });
});

// Scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe elements to animate
    const elementsToAnimate = [
        '.profile-card',
        '.highlight-card',
        '.skill-category',
        '.timeline-item',
        '.education-card',
        '.project-card',
        '.certification-card'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            observer.observe(element);
            // Add base animation class
            element.classList.add('animate-element');
        });
    });
    
    // Add CSS animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form functionality (for email icon)
document.querySelectorAll('.social-icon .fas.fa-envelope').forEach(icon => {
    icon.parentElement.addEventListener('click', e => {
        e.preventDefault();
        
        // Replace with your actual email
        const email = 'yourname@example.com';
        window.location.href = `mailto:${email}`;
    });
});

// Add year count to experience (current year - start year)
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const startYear = 2022; // Based on your first work experience
    const yearsOfExperience = currentYear - startYear;
    
    // Update the "with X years of experience" text if it exists
    const experienceText = document.querySelector('.intro-text p:first-child');
    if (experienceText) {
        experienceText.textContent = experienceText.textContent.replace(
            'over 2 years of experience',
            `over ${yearsOfExperience} years of experience`
        );
    }
});

// Projects filter functionality (if you add more projects later)
function setupProjectFilters() {
    const projectsSection = document.getElementById('projects');
    
    // Only add filters if there are multiple projects
    const projectCards = projectsSection.querySelectorAll('.project-card');
    if (projectCards.length <= 1) return;
    
    // Get all unique tech tags
    const allTags = new Set();
    projectCards.forEach(card => {
        const tags = card.querySelectorAll('.tech-tag');
        tags.forEach(tag => allTags.add(tag.textContent));
    });
    
    // Create filter buttons
    const filterContainer = document.createElement('div');
    filterContainer.className = 'project-filters';
    
    // Add "All" filter
    const allButton = document.createElement('button');
    allButton.className = 'filter-btn active';
    allButton.textContent = 'All';
    allButton.dataset.filter = 'all';
    filterContainer.appendChild(allButton);
    
    // Add filter for each tag
    allTags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = tag;
        button.dataset.filter = tag;
        filterContainer.appendChild(button);
    });
    
    // Insert after section header
    const sectionHeader = projectsSection.querySelector('.section-header');
    sectionHeader.after(filterContainer);
    
    // Add filter functionality
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            projectCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'flex';
                    return;
                }
                
                const hasTag = Array.from(card.querySelectorAll('.tech-tag'))
                    .some(tag => tag.textContent === filter);
                
                card.style.display = hasTag ? 'flex' : 'none';
            });
        });
    });
    
    // Add CSS for filters
    const style = document.createElement('style');
    style.textContent = `
        .project-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 25px;
        }
        
        .filter-btn {
            background-color: var(--background-color);
            border: 1px solid var(--border-color);
            color: var(--light-text);
            border-radius: 6px;
            padding: 8px 15px;
            font-size: 0.85rem;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .filter-btn:hover {
            background-color: var(--accent-color);
            color: var(--primary-color);
        }
        
        .filter-btn.active {
            background-color: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    // Check if page should load a specific tab from URL hash
    const hash = window.location.hash;
    if (hash) {
        const targetTab = document.querySelector(`.tab-link[data-tab="${hash.substring(1)}"]`);
        if (targetTab) {
            setTimeout(() => targetTab.click(), 100);
        }
    }
    
    // Setup project filters if needed
    setupProjectFilters();
});