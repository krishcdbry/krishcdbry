// ==================== CUSTOM CURSOR ====================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

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
    let distX = mouseX - cursorX;
    let distY = mouseY - cursorY;

    cursorX = cursorX + distX * 0.3;
    cursorY = cursorY + distY * 0.3;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    // Slower follow for follower
    let followerDistX = mouseX - followerX;
    let followerDistY = mouseY - followerY;

    followerX = followerX + followerDistX * 0.1;
    followerY = followerY + followerDistY * 0.1;

    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
const interactiveElements = document.querySelectorAll('a, button, .work-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

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
    card.style.transition = `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${index * 0.1}s`;
    observer.observe(card);
});

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
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;

            // Parallax for hero elements
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle) {
                heroTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroTitle.style.opacity = 1 - (scrolled / 500);
            }

            ticking = false;
        });
        ticking = true;
    }
});

// ==================== TECH TAGS SHUFFLE ====================
const techTags = document.querySelectorAll('.tech-tags span');
techTags.forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.05}s`;
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';

    setTimeout(() => {
        tag.style.transition = 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)';
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
    }, index * 50);
});

// ==================== MAGNETIC BUTTONS ====================
const magneticElements = document.querySelectorAll('.nav-email, .contact-link-primary');

magneticElements.forEach(el => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

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

// ==================== CONSOLE MESSAGE ====================
console.log('%cMKP.', 'font-size: 48px; font-weight: 700; color: #00ff88; font-family: monospace;');
console.log('%cBuilding the future, one line at a time.', 'font-size: 16px; color: #888; font-family: sans-serif;');
console.log('%c\nInterested in the code? Let\'s talk.', 'font-size: 14px; color: #00d4ff;');

// ==================== PERFORMANCE OPTIMIZATION ====================
// Disable cursor on mobile
if (window.innerWidth < 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
    document.body.style.cursor = 'auto';
}
