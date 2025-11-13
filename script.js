// ==================== MATRIX RAIN ANIMATION ====================
class MatrixRain {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~';
        this.charArray = this.chars.split('');

        this.fontSize = 14;
        this.columns = this.canvas.width / this.fontSize;
        this.drops = Array(Math.floor(this.columns)).fill(1);

        this.init();
    }

    init() {
        setInterval(() => this.draw(), 50);

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = this.canvas.width / this.fontSize;
            this.drops = Array(Math.floor(this.columns)).fill(1);
        });
    }

    draw() {
        this.ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = '#00d4ff';
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const char = this.charArray[Math.floor(Math.random() * this.charArray.length)];
            this.ctx.fillText(char, i * this.fontSize, this.drops[i] * this.fontSize);

            if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}

// ==================== TYPING ANIMATION ====================
class TypingAnimation {
    constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==================== SCROLL ANIMATIONS ====================
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
    }

    checkElements() {
        const triggerBottom = window.innerHeight * 0.85;

        this.animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('aos-animate');
            }
        });
    }
}

// ==================== NAVIGATION ====================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
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
}

// ==================== STATS COUNTER ====================
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                animated = true;
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ==================== PARALLAX EFFECT ====================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-content');

        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==================== CURSOR TRAIL EFFECT ====================
class CursorTrail {
    constructor() {
        this.coords = { x: 0, y: 0 };
        this.circles = [];
        this.init();
    }

    init() {
        // Create circles
        for (let i = 0; i < 20; i++) {
            const circle = document.createElement('div');
            circle.style.position = 'fixed';
            circle.style.width = '10px';
            circle.style.height = '10px';
            circle.style.borderRadius = '50%';
            circle.style.background = 'rgba(0, 212, 255, 0.5)';
            circle.style.pointerEvents = 'none';
            circle.style.zIndex = '9999';
            circle.style.transition = 'transform 0.1s ease';
            document.body.appendChild(circle);
            this.circles.push(circle);
        }

        // Track mouse movement
        window.addEventListener('mousemove', (e) => {
            this.coords.x = e.clientX;
            this.coords.y = e.clientY;
        });

        // Animate circles
        this.animateCircles();
    }

    animateCircles() {
        let x = this.coords.x;
        let y = this.coords.y;

        this.circles.forEach((circle, index) => {
            circle.style.left = x - 5 + 'px';
            circle.style.top = y - 5 + 'px';
            circle.style.transform = `scale(${(this.circles.length - index) / this.circles.length})`;

            const nextCircle = this.circles[index + 1] || this.circles[0];
            x += (parseInt(nextCircle.style.left) || this.coords.x - 5) * 0.3;
            y += (parseInt(nextCircle.style.top) || this.coords.y - 5) * 0.3;
        });

        requestAnimationFrame(() => this.animateCircles());
    }
}

// ==================== PARTICLE EFFECT ON CLICK ====================
function createParticles(e) {
    const particleCount = 15;
    const colors = ['#00d4ff', '#7c3aed', '#ffffff'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';

        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 2 + Math.random() * 2;

        let x = 0;
        let y = 0;
        let opacity = 1;

        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.02;

            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }
}

// ==================== THEME TOGGLE (Optional) ====================
class ThemeToggle {
    constructor() {
        this.currentTheme = 'dark';
        this.init();
    }

    init() {
        // Add theme toggle button if needed
        // For now, we're keeping it dark mode only
    }
}

// ==================== PRELOADER ====================
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 300);
        }, 1000);
    }
}

// ==================== LAZY LOADING IMAGES ====================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==================== PERFORMANCE OPTIMIZATION ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Matrix Rain Background
    new MatrixRain('matrix-canvas');

    // Initialize Typing Animation
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = [
            'Full Stack Engineer',
            'Director of Engineering',
            'Alpha Ninja',
            'Problem Solver',
            'Team Leader',
            'Code Architect',
            'Innovation Driver'
        ];
        new TypingAnimation(typingElement, texts);
    }

    // Initialize Navigation
    new Navigation();

    // Initialize Smooth Scroll
    initSmoothScroll();

    // Initialize Stats Counter
    initStatsCounter();

    // Initialize Scroll Animations
    new ScrollAnimations();

    // Initialize Parallax
    initParallax();

    // Initialize Cursor Trail (commented out for performance, uncomment if desired)
    // if (window.innerWidth > 768) {
    //     new CursorTrail();
    // }

    // Add particle effect on button clicks
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Don't create particles if it's a link that navigates
            if (!button.getAttribute('href') || button.getAttribute('href').startsWith('#')) {
                // createParticles(e);
            }
        });
    });

    // Initialize Lazy Loading
    initLazyLoading();

    // Hide Preloader
    hidePreloader();

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s both`;
    });

    // Log welcome message
    console.log('%c🥷 Alpha Ninja Portfolio', 'font-size: 20px; font-weight: bold; color: #00d4ff;');
    console.log('%cBuilt with passion and endless coffee ☕️', 'font-size: 14px; color: #7c3aed;');
});

// ==================== SCROLL TO TOP ====================
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show scroll-to-top button on scroll
window.addEventListener('scroll', debounce(() => {
    const scrollTop = document.querySelector('.scroll-to-top');
    if (scrollTop) {
        if (window.pageYOffset > 500) {
            scrollTop.style.display = 'flex';
        } else {
            scrollTop.style.display = 'none';
        }
    }
}, 100));

// ==================== EASTER EGGS ====================
// Konami Code Easter Egg
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateNinjaMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateNinjaMode() {
        console.log('%c🥷 NINJA MODE ACTIVATED! 🥷', 'font-size: 30px; font-weight: bold; color: #00d4ff; text-shadow: 0 0 10px #00d4ff;');
        document.body.style.animation = 'rainbow 2s infinite';

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Reset after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
})();

// ==================== EXPORT FOR MODULES ====================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MatrixRain,
        TypingAnimation,
        Navigation,
        ScrollAnimations
    };
}
