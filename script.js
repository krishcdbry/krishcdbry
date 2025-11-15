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

// ==================== HERO PARTICLES ====================
if (!prefersReducedMotion) {
    const heroSection = document.querySelector('.hero');

    if (heroSection) {
        // Create particle container
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        `;

        const heroBg = heroSection.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.appendChild(particleContainer);
        }

        // Particle configuration
        const particleCount = window.innerWidth < BREAKPOINTS.MOBILE ? 20 : 40;
        const particles = [];

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const size = Math.random() * 4 + 2;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 5;
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;

            // Random color from palette
            const colors = ['#00ff88', '#00d4ff', '#7c3aed', '#ec4899'];
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${startX}%;
                top: ${startY}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                box-shadow: 0 0 ${size * 2}px ${color};
                animation: float-particle ${duration}s linear ${delay}s infinite;
            `;

            particleContainer.appendChild(particle);
            particles.push(particle);
        }

        // Create floating orbs
        const orbCount = 3;
        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            const size = Math.random() * 300 + 200;
            const duration = Math.random() * 25 + 20;
            const delay = Math.random() * 5;

            const colors = [
                'rgba(0, 255, 136, 0.03)',
                'rgba(0, 212, 255, 0.03)',
                'rgba(124, 58, 237, 0.03)',
                'rgba(236, 72, 153, 0.03)'
            ];
            const color = colors[i % colors.length];

            orb.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, ${color} 0%, transparent 70%);
                border-radius: 50%;
                left: ${Math.random() * 80}%;
                top: ${Math.random() * 80}%;
                animation: float-orb ${duration}s ease-in-out ${delay}s infinite;
                filter: blur(40px);
            `;

            particleContainer.appendChild(orb);
        }

        // Add particle animations
        const particleStyles = document.createElement('style');
        particleStyles.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * -500 - 200}px) rotate(360deg);
                    opacity: 0;
                }
            }

            @keyframes float-orb {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                }
                33% {
                    transform: translate(50px, -50px) scale(1.1);
                }
                66% {
                    transform: translate(-30px, 30px) scale(0.9);
                }
            }
        `;
        document.head.appendChild(particleStyles);
    }
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

// ==================== KONAMI CODE EASTER EGG ====================
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    // Check if device is touch-enabled (mobile/tablet)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    document.addEventListener('keydown', function(e) {
        // Normalize key to lowercase for comparison
        const key = e.key.toLowerCase();
        const expectedKey = konamiCode[konamiIndex].toLowerCase();

        if (key === expectedKey) {
            konamiIndex++;

            // Debug logging (can be removed later)
            console.log(`Konami progress: ${konamiIndex}/${konamiCode.length}`);

            if (konamiIndex === konamiCode.length) {
                activateNinjaMode();
                konamiIndex = 0;
            }
        } else {
            // Reset if wrong key is pressed
            if (konamiIndex > 0) {
                console.log(`Konami reset! Got "${key}", expected "${expectedKey}"`);
            }
            konamiIndex = 0;
        }
    });

    function activateNinjaMode() {
        // Console message
        console.log('%c🥷 NINJA MODE ACTIVATED! 🥷', 'font-size: 24px; font-weight: 700; color: #00ff88; background: #0a0a0a; padding: 10px;');

        // Create achievement popup
        const achievement = document.createElement('div');
        achievement.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                        border: 2px solid #00ff88; border-radius: 20px; padding: 40px 60px;
                        z-index: 100000; text-align: center; box-shadow: 0 0 100px rgba(0, 255, 136, 0.5);
                        animation: popIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);">
                <div style="font-size: 80px; margin-bottom: 20px;">🥷</div>
                <div style="font-size: 28px; font-weight: 700; color: #00ff88; margin-bottom: 10px; font-family: 'Space Grotesk', sans-serif;">
                    ACHIEVEMENT UNLOCKED!
                </div>
                <div style="font-size: 20px; color: #888; font-family: 'Space Grotesk', sans-serif;">
                    Alpha Ninja Mode Activated
                </div>
                <div style="font-size: 14px; color: #00d4ff; margin-top: 20px; font-family: 'JetBrains Mono', monospace;">
                    You found the secret! 🎮
                </div>
            </div>
        `;

        // Add pop-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
            @keyframes confettiFall {
                0% { transform: translateY(-100vh) rotate(0deg); }
                100% { transform: translateY(100vh) rotate(720deg); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(achievement);

        // Create confetti effect
        createConfetti();

        // Add temporary glow effect to body
        document.body.style.transition = 'box-shadow 0.5s';
        document.body.style.boxShadow = 'inset 0 0 100px rgba(0, 255, 136, 0.2)';

        // Remove achievement after 3 seconds
        setTimeout(() => {
            achievement.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                achievement.remove();
                document.body.style.boxShadow = 'none';
            }, 500);
        }, 3000);
    }

    function createConfetti() {
        const colors = ['#00ff88', '#00d4ff', '#7c3aed', '#ec4899', '#10b981', '#f59e0b'];
        const confettiCount = 50;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = 3 + Math.random() * 2;
            const size = 10 + Math.random() * 10;

            confetti.style.cssText = `
                position: fixed;
                top: -20px;
                left: ${left}%;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                z-index: 99999;
                pointer-events: none;
                animation: confettiFall ${duration}s linear ${delay}s forwards;
                opacity: 0.8;
            `;

            document.body.appendChild(confetti);

            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }
    }

    // Mobile/Tablet Bottom Sheet for Konami Code
    if (isTouchDevice) {
        function showKonamiBottomSheet() {
            // Create overlay
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 100001;
                backdrop-filter: blur(10px);
                animation: fadeIn 0.3s ease;
            `;

            // Create bottom sheet
            const bottomSheet = document.createElement('div');
            bottomSheet.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
                border-radius: 24px 24px 0 0;
                padding: 32px 24px;
                z-index: 100002;
                box-shadow: 0 -10px 40px rgba(0, 255, 136, 0.2);
                border-top: 2px solid #00ff88;
                animation: slideUp 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                max-height: 90vh;
                overflow-y: auto;
            `;

            bottomSheet.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 60px; margin-bottom: 16px;">🥷</div>
                    <h2 style="font-size: 24px; color: #00ff88; margin-bottom: 8px; font-family: 'Space Grotesk', sans-serif; font-weight: 700;">
                        Ninja Challenge
                    </h2>
                    <p style="font-size: 14px; color: #888; margin-bottom: 24px; font-family: 'Space Grotesk', sans-serif;">
                        Enter the legendary Konami Code to unlock the secret
                    </p>
                    <div style="margin-bottom: 24px;">
                        <input
                            type="text"
                            id="konami-input"
                            placeholder="Type the code here..."
                            autocomplete="off"
                            style="
                                width: 100%;
                                padding: 16px;
                                font-size: 16px;
                                background: #0a0a0a;
                                border: 2px solid #333;
                                border-radius: 12px;
                                color: #00ff88;
                                font-family: 'JetBrains Mono', monospace;
                                outline: none;
                                transition: all 0.3s ease;
                                text-align: center;
                                letter-spacing: 2px;
                            "
                        />
                    </div>
                    <div style="font-size: 12px; color: #666; margin-bottom: 16px; font-family: 'JetBrains Mono', monospace;">
                        Hint: ↑ ↑ ↓ ↓ ← → ← → B A
                    </div>
                    <button
                        id="check-code-btn"
                        style="
                            width: 100%;
                            padding: 16px;
                            font-size: 16px;
                            background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
                            border: none;
                            border-radius: 12px;
                            color: #0a0a0a;
                            font-family: 'Space Grotesk', sans-serif;
                            font-weight: 700;
                            cursor: pointer;
                            transition: transform 0.2s ease;
                            margin-bottom: 12px;
                        "
                    >
                        Activate Ninja Mode
                    </button>
                    <button
                        id="close-sheet-btn"
                        style="
                            width: 100%;
                            padding: 12px;
                            font-size: 14px;
                            background: transparent;
                            border: 1px solid #333;
                            border-radius: 12px;
                            color: #888;
                            font-family: 'Space Grotesk', sans-serif;
                            cursor: pointer;
                        "
                    >
                        Close
                    </button>
                </div>
            `;

            // Add animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                #konami-input:focus {
                    border-color: #00ff88 !important;
                    box-shadow: 0 0 20px rgba(0, 255, 136, 0.3) !important;
                }
                #check-code-btn:active {
                    transform: scale(0.95) !important;
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(overlay);
            document.body.appendChild(bottomSheet);

            // Focus input
            setTimeout(() => {
                const input = document.getElementById('konami-input');
                input.focus();
            }, 300);

            // Check code function
            function checkKonamiCode() {
                const input = document.getElementById('konami-input');
                const value = input.value.toLowerCase().replace(/\s+/g, '');

                // Accept various formats
                const validCodes = [
                    'uuddlrlrba',
                    '↑↑↓↓←→←→ba',
                    'upupdowndownleftrightleftrightba',
                ];

                if (validCodes.some(code => value.includes(code))) {
                    closeBottomSheet();
                    setTimeout(() => {
                        activateNinjaMode();
                    }, 300);
                } else {
                    // Shake animation for wrong code
                    bottomSheet.style.animation = 'shake 0.5s';
                    input.style.borderColor = '#ff0000';
                    setTimeout(() => {
                        bottomSheet.style.animation = '';
                        input.style.borderColor = '#333';
                    }, 500);
                }
            }

            // Close function
            function closeBottomSheet() {
                bottomSheet.style.animation = 'slideDown 0.3s ease forwards';
                overlay.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    overlay.remove();
                    bottomSheet.remove();
                    style.remove();
                }, 300);
            }

            // Add shake animation
            const shakeStyle = document.createElement('style');
            shakeStyle.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
                @keyframes slideDown {
                    from { transform: translateY(0); }
                    to { transform: translateY(100%); }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(shakeStyle);

            // Event listeners
            document.getElementById('check-code-btn').addEventListener('click', checkKonamiCode);
            document.getElementById('close-sheet-btn').addEventListener('click', closeBottomSheet);
            overlay.addEventListener('click', closeBottomSheet);

            // Enter key to check
            document.getElementById('konami-input').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkKonamiCode();
                }
            });
        }

        // Add click handler to ninja marquee items (after DOM is loaded)
        setTimeout(() => {
            const ninjaItems = document.querySelectorAll('.marquee-item');
            ninjaItems.forEach(item => {
                if (item.textContent.includes('Are you a ninja')) {
                    item.style.cursor = 'pointer';
                    item.addEventListener('click', function(e) {
                        e.preventDefault();
                        showKonamiBottomSheet();
                    });
                }
            });
        }, 1000);
    }
})();

// ==================== INTERACTIVE TERMINAL ====================
(function() {
    // Terminal state
    let commandHistory = [];
    let historyIndex = -1;
    let currentGame = null;

    // Portfolio data
    const portfolioData = {
        about: `
╔══════════════════════════════════════════════════════════╗
║           MOHANA KRISHNA PADDA - Alpha Ninja             ║
╚══════════════════════════════════════════════════════════╝

→ Head of Engineering @ Jivi AI
→ 15 Years of Full-Stack Development
→ 2 Unicorns: BharatPe ($2.8B) & Blinkit ($800M)
→ 23K+ LinkedIn Followers
→ National Ethical Hacking Champion (2013)

"Building the future, one line at a time."
        `,
        skills: `
╔══════════════════════════════════════════════════════════╗
║                    TECH ARSENAL                          ║
╚══════════════════════════════════════════════════════════╝

Frontend:  React, Next.js, TypeScript, Vue.js
Backend:   Node.js, Java, Spring Boot, Python, FastAPI
Database:  PostgreSQL, MongoDB, Redis
Cloud:     AWS, Docker, Kubernetes, Terraform
AI/ML:     OpenAI, LangChain, Pinecone, AI Agents
Other:     GraphQL, Kafka, ElasticSearch, Microservices
        `,
        experience: `
╔══════════════════════════════════════════════════════════╗
║                   CAREER JOURNEY                         ║
╚══════════════════════════════════════════════════════════╝

[Current] Jivi AI
→ Head of Engineering
→ Building AI-powered solutions

[2021-2023] BharatPe
→ Director of Engineering
→ Built BharatSwipe - India's First ZERO Commission POS
→ 700+ Cr transactions processed

[2020-2021] Blinkit (Grofers)
→ Engineering Lead
→ Optimized deployment: 12x speed improvement
→ 5x loading time boost

[Previous] Multiple startups & tech companies
→ Founded GrowJS Community
→ 5 Startups Founded
        `,
        projects: `
╔══════════════════════════════════════════════════════════╗
║                  NOTABLE PROJECTS                        ║
╚══════════════════════════════════════════════════════════╝

→ BharatSwipe: India's First ZERO Commission POS
→ AI Agents Platform: LangChain & OpenAI Integration
→ GrowJS Community: JavaScript Community in Delhi NCR
→ 8+ NPM Packages Published
→ Multiple Open Source Contributions
        `,
        contact: `
╔══════════════════════════════════════════════════════════╗
║                  LET'S CONNECT                           ║
╚══════════════════════════════════════════════════════════╝

Email:          krishcdbry@gmail.com
LinkedIn:       linkedin.com/in/krishcdbry
GitHub:         github.com/krishcdbry
Twitter:        @krishcdbry
Topmate:        topmate.io/krishcdbry

Available for: Advisory & Consulting
        `
    };

    // Create floating terminal button
    const terminalBtn = document.createElement('button');
    terminalBtn.innerHTML = '⌨️';
    terminalBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%);
        border: none;
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4);
        z-index: 10000;
        transition: all 0.3s ease;
    `;
    terminalBtn.title = 'Open Terminal (Play Games & Explore)';
    document.body.appendChild(terminalBtn);

    // Button hover effect
    terminalBtn.addEventListener('mouseenter', () => {
        terminalBtn.style.transform = 'scale(1.1)';
        terminalBtn.style.boxShadow = '0 6px 30px rgba(0, 255, 136, 0.6)';
    });
    terminalBtn.addEventListener('mouseleave', () => {
        terminalBtn.style.transform = 'scale(1)';
        terminalBtn.style.boxShadow = '0 4px 20px rgba(0, 255, 136, 0.4)';
    });

    // Create terminal modal
    function createTerminal() {
        const terminal = document.createElement('div');
        terminal.id = 'krish-terminal';
        terminal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.95);
            z-index: 100003;
            display: none;
            backdrop-filter: blur(10px);
        `;

        terminal.innerHTML = `
            <div style="max-width: 1000px; margin: 50px auto; height: calc(100vh - 100px); display: flex; flex-direction: column; background: #0a0a0a; border: 2px solid #00ff88; border-radius: 12px; overflow: hidden; box-shadow: 0 0 50px rgba(0, 255, 136, 0.3);">
                <!-- Terminal Header -->
                <div style="background: linear-gradient(135deg, #00ff88 0%, #00d4ff 100%); color: #0a0a0a; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; font-family: 'Space Grotesk', sans-serif; font-weight: 600;">
                    <span>⌨️ KRISH.TERMINAL v1.0</span>
                    <button id="close-terminal" style="background: transparent; border: none; color: #0a0a0a; font-size: 24px; cursor: pointer; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">×</button>
                </div>

                <!-- Terminal Output -->
                <div id="terminal-output" style="flex: 1; overflow-y: auto; padding: 20px; font-family: 'JetBrains Mono', monospace; font-size: 14px; line-height: 1.6; color: #00ff88;">
                    <div style="color: #00d4ff; margin-bottom: 10px;">Welcome to Krish Terminal!</div>
                    <div style="color: #888; margin-bottom: 20px;">Type 'help' to see available commands, or try 'snake' to play a game!</div>
                </div>

                <!-- Terminal Input -->
                <div style="padding: 15px 20px; background: #0f0f0f; border-top: 1px solid #00ff88; display: flex; align-items: center; gap: 10px; font-family: 'JetBrains Mono', monospace;">
                    <span style="color: #00ff88;">→</span>
                    <input
                        id="terminal-input"
                        type="text"
                        autocomplete="off"
                        spellcheck="false"
                        style="flex: 1; background: transparent; border: none; outline: none; color: #00ff88; font-family: 'JetBrains Mono', monospace; font-size: 14px;"
                        placeholder="Enter command..."
                    />
                </div>
            </div>
        `;

        document.body.appendChild(terminal);
        return terminal;
    }

    const terminal = createTerminal();
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');

    // Terminal functions
    function printToTerminal(text, color = '#00ff88') {
        const line = document.createElement('div');
        line.style.color = color;
        line.style.whiteSpace = 'pre-wrap';
        line.innerHTML = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function clearTerminal() {
        terminalOutput.innerHTML = '';
    }

    // Command handlers
    const commands = {
        help: () => `
╔══════════════════════════════════════════════════════════╗
║                  AVAILABLE COMMANDS                      ║
╚══════════════════════════════════════════════════════════╝

📋 PORTFOLIO COMMANDS:
  about       - About Mohana Krishna Padda
  skills      - Technical skills & stack
  experience  - Career journey
  projects    - Notable projects
  contact     - Contact information
  resume      - Download resume

🎮 MINI GAMES:
  snake       - Play classic Snake game
  tictactoe   - Tic-Tac-Toe vs AI
  guess       - Number guessing game

🛠️ SYSTEM COMMANDS:
  clear       - Clear terminal
  help        - Show this help message
  exit        - Close terminal

🥷 EASTER EGGS:
  sudo rm -rf /  - Try it! (Don't worry, it's safe)
  hack           - Activate hacker mode
  matrix         - Enter the Matrix
        `,
        about: () => portfolioData.about,
        skills: () => portfolioData.skills,
        experience: () => portfolioData.experience,
        projects: () => portfolioData.projects,
        contact: () => portfolioData.contact,
        resume: () => {
            window.open('/MohanaKrishnaPadda-Resume.pdf', '_blank');
            return '📄 Opening resume in new tab...';
        },
        clear: () => {
            clearTerminal();
            return '';
        },
        exit: () => {
            terminal.style.display = 'none';
            return '';
        },

        // Easter eggs
        'sudo rm -rf /': () => `
🚨 CRITICAL ERROR DETECTED! 🚨

Just kidding! I'm not that kind of ninja 😄
Your system is safe. Always be careful with commands though!
        `,
        hack: () => `
> Initiating hack sequence...
> Accessing mainframe... ███████████ 100%
> Bypassing firewall... ███████████ 100%
> Downloading data... ███████████ 100%

🥷 HACK SUCCESSFUL! You're now an honorary Alpha Ninja!
        `,
        matrix: () => {
            // Trigger brief Matrix effect
            const matrixColors = ['#00ff88', '#00d4ff', '#7c3aed'];
            let count = 0;
            const interval = setInterval(() => {
                const randomText = Math.random().toString(36).substring(7);
                printToTerminal(randomText, matrixColors[count % matrixColors.length]);
                count++;
                if (count > 20) {
                    clearInterval(interval);
                    printToTerminal('\nWelcome to the Matrix, Neo... 😎', '#00ff88');
                }
            }, 100);
            return 'Loading Matrix...';
        }
    };

    // Process command
    function processCommand(input) {
        const cmd = input.trim().toLowerCase();

        if (cmd === '') return;

        printToTerminal(`→ ${input}`, '#00d4ff');

        if (commands[cmd]) {
            const output = commands[cmd]();
            if (output) printToTerminal(output);
        } else if (cmd === 'snake') {
            startSnakeGame();
        } else if (cmd === 'tictactoe') {
            startTicTacToe();
        } else if (cmd === 'guess') {
            startGuessGame();
        } else {
            printToTerminal(`Command not found: ${cmd}\nType 'help' for available commands.`, '#ff4444');
        }

        commandHistory.push(input);
        historyIndex = commandHistory.length;
    }

    // Snake Game
    function startSnakeGame() {
        printToTerminal(`
╔══════════════════════════════════════════════════════════╗
║                    SNAKE GAME                            ║
╚══════════════════════════════════════════════════════════╝

Use WASD or Arrow Keys to move
Press ESC to quit

Starting in 2 seconds...
        `);

        setTimeout(() => {
            printToTerminal('🎮 Snake game coming soon! Stay tuned...', '#00d4ff');
            printToTerminal('Try "tictactoe" or "guess" for now!', '#888');
        }, 2000);
    }

    // Tic-Tac-Toe Game
    function startTicTacToe() {
        printToTerminal('🎮 Tic-Tac-Toe game coming soon!', '#00d4ff');
        printToTerminal('Try "guess" for now!', '#888');
    }

    // Guess the Number Game
    function startGuessGame() {
        const target = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;

        printToTerminal(`
╔══════════════════════════════════════════════════════════╗
║              GUESS THE NUMBER GAME                       ║
╚══════════════════════════════════════════════════════════╝

I'm thinking of a number between 1 and 100.
Type your guess and press Enter!
        `);

        currentGame = {
            type: 'guess',
            target: target,
            attempts: 0,
            process: (guess) => {
                const num = parseInt(guess);
                if (isNaN(num)) {
                    printToTerminal('Please enter a valid number!', '#ff4444');
                    return;
                }

                attempts++;

                if (num === target) {
                    printToTerminal(`
🎉 CORRECT! You guessed it in ${attempts} attempts!
The number was ${target}.

Type any command to continue...
                    `, '#00ff88');
                    currentGame = null;
                } else if (num < target) {
                    printToTerminal(`📈 Too low! Try again. (Attempt ${attempts})`, '#ffaa00');
                } else {
                    printToTerminal(`📉 Too high! Try again. (Attempt ${attempts})`, '#ffaa00');
                }
            }
        };
    }

    // Event listeners
    terminalBtn.addEventListener('click', () => {
        terminal.style.display = 'block';
        terminalInput.focus();
    });

    document.getElementById('close-terminal').addEventListener('click', () => {
        terminal.style.display = 'none';
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const input = terminalInput.value;

            if (currentGame) {
                currentGame.process(input);
            } else {
                processCommand(input);
            }

            terminalInput.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        } else if (e.key === 'Escape') {
            terminal.style.display = 'none';
        }
    });

    // Close terminal on overlay click
    terminal.addEventListener('click', (e) => {
        if (e.target === terminal) {
            terminal.style.display = 'none';
        }
    });
})();

