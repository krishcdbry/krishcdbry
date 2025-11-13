// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== MOBILE NAVIGATION ====================
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-wrapper')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        });
    });
}

// ==================== SCROLL EFFECTS ====================
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ==================== ACTIVE NAVIGATION ====================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Lazy load images if any
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== ACCESSIBILITY ====================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// ==================== ANALYTICS (Optional) ====================
// Track button clicks (can be used with Google Analytics, etc.)
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
        const linkText = this.textContent.trim();
        const linkHref = this.getAttribute('href');

        // Example: console.log for debugging
        // Replace with actual analytics tracking
        if (linkHref && linkHref.startsWith('mailto:')) {
            console.log('Email click tracked:', linkHref);
        }
    });
});

// ==================== CONSOLE MESSAGE ====================
console.log('%cMohana Krishna Padda', 'font-size: 24px; font-weight: 600; color: #0a0a0a;');
console.log('%cHead of Engineering | 15 Years | 2 Unicorns', 'font-size: 14px; color: #666;');
console.log('%cBuilding the future, one line at a time.', 'font-size: 12px; color: #999; font-style: italic;');
