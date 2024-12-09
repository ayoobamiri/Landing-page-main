/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navigationContainer = document.querySelector('.page__header');
const navigationList = document.createElement('ul');
navigationList.className = 'navbar__list';
const contentSections = document.querySelectorAll('section');
const pageWrapper = document.querySelector('main');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/**
 * Helper function to create intersection observer
 * Determines section visibility and active state
 * @param {Element} section - The section to observe
 * @param {Element} navigationLink - Corresponding navigation link
 * @returns {IntersectionObserver} Created intersection observer
 */
function createSectionObserver(section, navigationLink) {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all sections and links
                contentSections.forEach(s => s.classList.remove('active-section'));
                document.querySelectorAll('.navbar__list a').forEach(link => 
                    link.classList.remove('active-link'));

                // Add active class to current section and link
                section.classList.add('active-section');
                navigationLink.classList.add('active-link');
            }
        });
    }, observerOptions);

    return observer;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
/**
 * Dynamically build navigation menu
 * Creates navigation links based on existing sections
 */
function buildNavigation() {
    contentSections.forEach((section) => {
        const navigationItem = document.createElement('li');
        const navigationLink = document.createElement('a');
        
        navigationLink.textContent = section.dataset.nav || 'Section';
        navigationLink.href = `#${section.id}`;
        navigationLink.className = 'menu__link';

        // Smooth scrolling
        navigationLink.addEventListener('click', (event) => {
            event.preventDefault();
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        });

        navigationItem.appendChild(navigationLink);
        navigationList.appendChild(navigationItem);

        // Create and start observer for this section
        const sectionObserver = createSectionObserver(section, navigationLink);
        sectionObserver.observe(section);
    });

    navigationContainer.appendChild(navigationList);
}

/**
 * Create progress indicator for page scrolling
 */
function createScrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Initialize navigation and scroll progress on page load
document.addEventListener('DOMContentLoaded', () => {
    buildNavigation();
    createScrollProgressIndicator();
});