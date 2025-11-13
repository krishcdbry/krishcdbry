// ==================== CONSTANTS ====================
const ANIMATION_CONFIG = {
    CURSOR_SPEED: 0.3,
    FOLLOWER_SPEED: 0.1,
    CURSOR_SCALE: 2,
    FOLLOWER_SCALE: 1.5,
    CARD_STAGGER_DELAY: 0.1,
    TAG_STAGGER_DELAY: 50,
    PARALLAX_SPEED: 0.3,
    PARALLAX_FADE_DISTANCE: 500,
    MAGNETIC_STRENGTH: 0.3
};

const BREAKPOINTS = {
    MOBILE: 768
};

// ==================== REDUCED MOTION CHECK ====================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

if (cursor && cursorFollower && !prefersReducedMotion) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for cursor
        const distX = mouseX - cursorX;
        const distY = mouseY - cursorY;

        cursorX = cursorX + distX * ANIMATION_CONFIG.CURSOR_SPEED;
        cursorY = cursorY + distY * ANIMATION_CONFIG.CURSOR_SPEED;

        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Slower follow for follower
        const followerDistX = mouseX - followerX;
        const followerDistY = mouseY - followerY;

        followerX = followerX + followerDistX * ANIMATION_CONFIG.FOLLOWER_SPEED;
        followerY = followerY + followerDistY * ANIMATION_CONFIG.FOLLOWER_SPEED;

        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// Cursor interactions
if (cursor && cursorFollower && !prefersReducedMotion) {
    const interactiveElements = document.querySelectorAll('a, button, .work-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = `scale(${ANIMATION_CONFIG.CURSOR_SCALE})`;
            cursorFollower.style.transform = `scale(${ANIMATION_CONFIG.FOLLOWER_SCALE})`;
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
    });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== SCROLL ANIMATIONS ====================
if (!prefersReducedMotion) {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe work cards
    document.querySelectorAll('.work-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${index * ANIMATION_CONFIG.CARD_STAGGER_DELAY}s`;
        observer.observe(card);
    });
}

// ==================== WORK CARD HOVER EFFECTS ====================
document.querySelectorAll('.work-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const color = this.getAttribute('data-color');
        if (color) {
            this.style.boxShadow = `0 20px 60px ${color}33`;
        }
    });

    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = 'none';
    });
});

// ==================== PARALLAX SCROLL ====================
if (!prefersReducedMotion) {
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Parallax for hero elements
                const heroTitle = document.querySelector('.hero-title');
                if (heroTitle) {
                    heroTitle.style.transform = `translateY(${scrolled * ANIMATION_CONFIG.PARALLAX_SPEED}px)`;
                    heroTitle.style.opacity = 1 - (scrolled / ANIMATION_CONFIG.PARALLAX_FADE_DISTANCE);
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== TECH TAGS SHUFFLE ====================
if (!prefersReducedMotion) {
    const techTags = document.querySelectorAll('.tech-tags span');
    techTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';

        setTimeout(() => {
            tag.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * ANIMATION_CONFIG.TAG_STAGGER_DELAY);
    });
}

// ==================== MAGNETIC BUTTONS ====================
if (!prefersReducedMotion) {
    const magneticElements = document.querySelectorAll('.nav-email, .contact-link-primary');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * ANIMATION_CONFIG.MAGNETIC_STRENGTH}px, ${y * ANIMATION_CONFIG.MAGNETIC_STRENGTH}px)`;
        });

        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// ==================== SCROLL PROGRESS ====================
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #00ff88);
    z-index: 10001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ==================== WORK CARD EXPAND/COLLAPSE ====================
document.querySelectorAll('.view-more-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        const workCard = this.closest('.work-card');
        const isExpanded = workCard.classList.contains('expanded');

        if (isExpanded) {
            workCard.classList.remove('expanded');
            this.textContent = 'View More ↓';
        } else {
            workCard.classList.add('expanded');
            this.textContent = 'View Less ↑';
        }
    });
});

// ==================== CONSOLE MESSAGE ====================
if (typeof console !== 'undefined' && console.log) {
    console.log('%cKrish.', 'font-size: 48px; font-weight: 700; color: #00ff88; font-family: monospace;');
    console.log('%cBuilding the future, one line at a time.', 'font-size: 16px; color: #888; font-family: sans-serif;');
    console.log('%c\nInterested in the code? Let\'s talk.', 'font-size: 14px; color: #00d4ff;');
}

// ==================== PERFORMANCE OPTIMIZATION ====================
// Disable cursor on mobile
if (window.innerWidth < BREAKPOINTS.MOBILE) {
    if (cursor) cursor.style.display = 'none';
    if (cursorFollower) cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
}
