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

→ JSON to OnCraft: Developer tool & VSCode extension (Live)
→ DevDNA: AI-powered developer profiling platform (Live)
→ Syraa AI: Healthcare AI receptionist (Live)
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
        right: 15px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid rgba(255, 255, 255, 0.3);
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transition: all 0.3s ease;
        opacity: 0.85;
        backdrop-filter: blur(10px);
    `;
    terminalBtn.title = 'Open Terminal (Play Games & Explore)';
    document.body.appendChild(terminalBtn);

    // Button hover effect
    terminalBtn.addEventListener('mouseenter', () => {
        terminalBtn.style.transform = 'scale(1.1)';
        terminalBtn.style.boxShadow = '0 6px 30px rgba(255, 255, 255, 0.4)';
        terminalBtn.style.background = 'rgba(0, 0, 0, 0.8)';
        terminalBtn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        terminalBtn.style.opacity = '1';
    });
    terminalBtn.addEventListener('mouseleave', () => {
        terminalBtn.style.transform = 'scale(1)';
        terminalBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        terminalBtn.style.background = 'rgba(0, 0, 0, 0.6)';
        terminalBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        terminalBtn.style.opacity = '0.85';
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

        const isMobile = window.innerWidth < BREAKPOINTS.MOBILE;
        terminal.innerHTML = `
            <div style="${isMobile ? `
                margin: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
            ` : `
                max-width: 1000px;
                margin: 50px auto;
                height: calc(100vh - 100px);
                border-radius: 12px;
            `} display: flex; flex-direction: column; background: #0a0a0a; border: 2px solid #00ff88; overflow: hidden; box-shadow: 0 0 50px rgba(0, 255, 136, 0.3);">
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

Controls: WASD or Arrow Keys
Goal: Eat the food (●) and grow!
Press ESC to quit
        `);

        const gridSize = 20;
        let snake = [{x: 10, y: 10}];
        let food = {x: 15, y: 15};
        let direction = {x: 1, y: 0};
        let score = 0;
        let gameOver = false;
        let gameInterval = null;

        // Render game board
        function renderGame() {
            let board = '\n';
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    const isSnake = snake.some(s => s.x === x && s.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    if (isHead) {
                        board += '🟢 ';
                    } else if (isSnake) {
                        board += '🟩 ';
                    } else if (isFood) {
                        board += '🔴 ';
                    } else {
                        board += '⬛ ';
                    }
                }
                board += '\n';
            }
            board += `\nScore: ${score} | Length: ${snake.length}`;
            return board;
        }

        // Spawn food
        function spawnFood() {
            do {
                food = {
                    x: Math.floor(Math.random() * gridSize),
                    y: Math.floor(Math.random() * gridSize)
                };
            } while (snake.some(s => s.x === food.x && s.y === food.y));
        }

        // Game loop
        function gameLoop() {
            if (gameOver) return;

            // Move snake
            const newHead = {
                x: snake[0].x + direction.x,
                y: snake[0].y + direction.y
            };

            // Check collisions
            if (newHead.x < 0 || newHead.x >= gridSize ||
                newHead.y < 0 || newHead.y >= gridSize ||
                snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
                gameOver = true;
                clearInterval(gameInterval);
                clearTerminal();
                printToTerminal(`
╔══════════════════════════════════════════════════════════╗
║                   GAME OVER!                             ║
╚══════════════════════════════════════════════════════════╝

Final Score: ${score}
Snake Length: ${snake.length}

Type any command to continue...
                `, '#ff4444');
                currentGame = null;
                return;
            }

            snake.unshift(newHead);

            // Check if ate food
            if (newHead.x === food.x && newHead.y === food.y) {
                score += 10;
                spawnFood();
            } else {
                snake.pop();
            }

            // Render
            clearTerminal();
            printToTerminal(renderGame(), '#00ff88');
        }

        // Keyboard handler
        function handleSnakeKeys(e) {
            if (gameOver) return;

            const key = e.key.toLowerCase();

            if (key === 'escape') {
                gameOver = true;
                clearInterval(gameInterval);
                clearTerminal();
                printToTerminal('Game quit. Type any command to continue...', '#888');
                document.removeEventListener('keydown', handleSnakeKeys);
                currentGame = null;
                return;
            }

            // Prevent opposite direction
            if ((key === 'w' || key === 'arrowup') && direction.y === 0) {
                direction = {x: 0, y: -1};
            } else if ((key === 's' || key === 'arrowdown') && direction.y === 0) {
                direction = {x: 0, y: 1};
            } else if ((key === 'a' || key === 'arrowleft') && direction.x === 0) {
                direction = {x: -1, y: 0};
            } else if ((key === 'd' || key === 'arrowright') && direction.x === 0) {
                direction = {x: 1, y: 0};
            }
        }

        document.addEventListener('keydown', handleSnakeKeys);

        currentGame = {
            type: 'snake',
            process: () => {} // Snake uses keyboard events
        };

        // Start game
        printToTerminal('\nStarting in 2 seconds...', '#888');
        setTimeout(() => {
            clearTerminal();
            printToTerminal(renderGame(), '#00ff88');
            gameInterval = setInterval(gameLoop, 200);
        }, 2000);
    }

    // Tic-Tac-Toe Game
    function startTicTacToe() {
        printToTerminal(`
╔══════════════════════════════════════════════════════════╗
║                 TIC-TAC-TOE vs AI                        ║
╚══════════════════════════════════════════════════════════╝

You are X, AI is O
Enter position (1-9):

 1 | 2 | 3
-----------
 4 | 5 | 6
-----------
 7 | 8 | 9
        `);

        let board = ['', '', '', '', '', '', '', '', ''];
        let playerSymbol = 'X';
        let aiSymbol = 'O';

        function renderBoard() {
            const display = `
 ${board[0] || '1'} │ ${board[1] || '2'} │ ${board[2] || '3'}
───┼───┼───
 ${board[3] || '4'} │ ${board[4] || '5'} │ ${board[5] || '6'}
───┼───┼───
 ${board[6] || '7'} │ ${board[7] || '8'} │ ${board[8] || '9'}
            `;
            return display;
        }

        function checkWinner() {
            const wins = [
                [0,1,2], [3,4,5], [6,7,8], // rows
                [0,3,6], [1,4,7], [2,5,8], // cols
                [0,4,8], [2,4,6] // diagonals
            ];

            for (let win of wins) {
                const [a, b, c] = win;
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    return board[a];
                }
            }

            if (board.every(cell => cell !== '')) {
                return 'tie';
            }

            return null;
        }

        function aiMove() {
            // Simple AI: Try to win, block player, or random
            const emptySpots = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);

            // Check if AI can win
            for (let spot of emptySpots) {
                board[spot] = aiSymbol;
                if (checkWinner() === aiSymbol) {
                    return; // AI wins
                }
                board[spot] = '';
            }

            // Block player from winning
            for (let spot of emptySpots) {
                board[spot] = playerSymbol;
                if (checkWinner() === playerSymbol) {
                    board[spot] = aiSymbol;
                    return;
                }
                board[spot] = '';
            }

            // Take center if available
            if (board[4] === '') {
                board[4] = aiSymbol;
                return;
            }

            // Random move
            const randomSpot = emptySpots[Math.floor(Math.random() * emptySpots.length)];
            board[randomSpot] = aiSymbol;
        }

        currentGame = {
            type: 'tictactoe',
            process: (input) => {
                const position = parseInt(input) - 1;

                if (isNaN(position) || position < 0 || position > 8) {
                    printToTerminal('Invalid input! Enter 1-9', '#ff4444');
                    return;
                }

                if (board[position] !== '') {
                    printToTerminal('Spot already taken!', '#ff4444');
                    return;
                }

                // Player move
                board[position] = playerSymbol;
                printToTerminal(renderBoard(), '#00d4ff');

                let winner = checkWinner();
                if (winner) {
                    if (winner === 'tie') {
                        printToTerminal("\n🤝 It's a tie!", '#ffaa00');
                    } else if (winner === playerSymbol) {
                        printToTerminal('\n🎉 You win!', '#00ff88');
                    }
                    printToTerminal('\nType any command to continue...', '#888');
                    currentGame = null;
                    return;
                }

                // AI move
                printToTerminal('\nAI is thinking...', '#888');
                setTimeout(() => {
                    aiMove();
                    printToTerminal(renderBoard(), '#00d4ff');

                    winner = checkWinner();
                    if (winner) {
                        if (winner === 'tie') {
                            printToTerminal("\n🤝 It's a tie!", '#ffaa00');
                        } else if (winner === aiSymbol) {
                            printToTerminal('\n😈 AI wins!', '#ff4444');
                        }
                        printToTerminal('\nType any command to continue...', '#888');
                        currentGame = null;
                    } else {
                        printToTerminal('\nYour turn! Enter position (1-9):', '#00ff88');
                    }
                }, 500);
            }
        };

        printToTerminal('\nYour turn! Enter position (1-9):', '#00ff88');
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

// ==================== AI CHATBOT ====================
(function() {
    // Chatbot state
    let chatHistory = [];
    let isOpen = false;

    // Knowledge base from portfolio
    const knowledgeBase = {
        name: 'Mohana Krishna Padda',
        nickname: 'Krish',
        role: 'Head of Engineering',
        company: 'Jivi AI',
        experience: '15 years',
        unicorns: ['BharatPe ($2.8B)', 'Blinkit ($800M)'],
        achievements: [
            'National Ethical Hacking Champion (2013)',
            '23K+ LinkedIn Followers',
            'Founded GrowJS Community',
            '5 Startups Founded',
            '8+ NPM Packages Published'
        ],
        skills: {
            frontend: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'React Native'],
            backend: ['Node.js', 'Java', 'Spring Boot', 'Python', 'FastAPI'],
            database: ['PostgreSQL', 'MongoDB', 'Redis'],
            cloud: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
            ai: ['OpenAI', 'LangChain', 'Pinecone', 'AI Agents'],
            other: ['GraphQL', 'Kafka', 'ElasticSearch', 'Microservices']
        },
        projects: [
            'JSON to OnCraft: Developer tool & VSCode extension for schema conversion (Live)',
            'DevDNA: AI-powered developer profiling platform (Live)',
            'Syraa AI: Healthcare AI receptionist (Live)',
            'BharatSwipe: India\'s First ZERO Commission POS (700+ Cr transactions)',
            'AI Agents Platform with LangChain & OpenAI',
            'GrowJS Community in Delhi NCR'
        ],
        contact: {
            email: 'krishcdbry@gmail.com',
            linkedin: 'linkedin.com/in/krishcdbry',
            github: 'github.com/krishcdbry',
            twitter: '@krishcdbry',
            topmate: 'topmate.io/krishcdbry'
        }
    };

    // Pattern matching engine
    function findBestMatch(message) {
        const msg = message.toLowerCase();

        // Greeting patterns
        if (/^(hi|hello|hey|greetings|sup|yo)\b/.test(msg)) {
            return {
                type: 'greeting',
                response: `Hey there! 👋 I'm Krish's AI assistant. I can help you learn about his experience, skills, projects, or how to connect with him. What would you like to know?`,
                suggestions: ['Tell me about his experience', 'What are his skills?', 'Show me projects', 'How to contact?']
            };
        }

        // About/Bio patterns
        if (/\b(who|about|bio|tell me about|introduce)\b/.test(msg)) {
            return {
                type: 'about',
                response: `${knowledgeBase.name} (Krish) is a ${knowledgeBase.role} at ${knowledgeBase.company} with ${knowledgeBase.experience} of experience. He's worked at 2 unicorns: ${knowledgeBase.unicorns.join(' and ')}.

He's a National Ethical Hacking Champion with 23K+ LinkedIn followers and has founded 5 startups! 🚀`,
                suggestions: ['What technologies does he use?', 'Tell me about his projects', 'How to reach him?']
            };
        }

        // Experience patterns
        if (/\b(experience|work|career|job|position|role)\b/.test(msg)) {
            return {
                type: 'experience',
                response: `Krish has ${knowledgeBase.experience} of full-stack development experience:

🎯 Current: Head of Engineering at Jivi AI
💰 Previous: Director of Engineering at BharatPe ($2.8B unicorn)
🚀 Before that: Engineering Lead at Blinkit/Grofers ($800M)

He built BharatSwipe (India's First ZERO Commission POS) which processed 700+ Cr in transactions! He's also optimized deployments with 12x speed improvements.`,
                suggestions: ['What skills does he have?', 'Show me his projects', 'His achievements?']
            };
        }

        // Skills patterns
        if (/\b(skill|tech|technology|stack|know|language|framework)\b/.test(msg)) {
            const specificTech = /\b(react|node|java|python|aws|docker|ai|typescript|mongodb|postgres)\b/i.exec(msg);

            if (specificTech) {
                const tech = specificTech[0].toLowerCase();
                let hasSkill = false;
                let category = '';

                for (const [cat, skills] of Object.entries(knowledgeBase.skills)) {
                    if (skills.some(s => s.toLowerCase().includes(tech))) {
                        hasSkill = true;
                        category = cat;
                        break;
                    }
                }

                if (hasSkill) {
                    return {
                        type: 'skill_specific',
                        response: `Yes! Krish is experienced with ${specificTech[0]}. It's part of his ${category} stack. 💪`,
                        suggestions: ['Show all skills', 'His projects', 'Work experience']
                    };
                }
            }

            return {
                type: 'skills',
                response: `Krish's tech arsenal is impressive! Here's a breakdown:

🎨 Frontend: ${knowledgeBase.skills.frontend.join(', ')}
⚙️ Backend: ${knowledgeBase.skills.backend.join(', ')}
💾 Database: ${knowledgeBase.skills.database.join(', ')}
☁️ Cloud: ${knowledgeBase.skills.cloud.join(', ')}
🤖 AI/ML: ${knowledgeBase.skills.ai.join(', ')}
🔧 Other: ${knowledgeBase.skills.other.join(', ')}`,
                suggestions: ['See his projects', 'Work experience', 'Contact info']
            };
        }

        // Projects patterns
        if (/\b(project|built|created|made|portfolio|work)\b/.test(msg)) {
            return {
                type: 'projects',
                response: `Here are some of Krish's notable projects:

${knowledgeBase.projects.map((p, i) => `${i + 1}. ${p}`).join('\n')}

He's also published 8+ NPM packages and has multiple open-source contributions! 📦`,
                suggestions: ['Tell me about BharatPe', 'His skills?', 'How to contact?']
            };
        }

        // Contact patterns
        if (/\b(contact|reach|email|linkedin|connect|hire|available)\b/.test(msg)) {
            return {
                type: 'contact',
                response: `Here's how you can connect with Krish:

📧 Email: ${knowledgeBase.contact.email}
💼 LinkedIn: ${knowledgeBase.contact.linkedin}
🐙 GitHub: ${knowledgeBase.contact.github}
🐦 Twitter: ${knowledgeBase.contact.twitter}
📅 Book a session: ${knowledgeBase.contact.topmate}

He's available for advisory & consulting! 🤝`,
                suggestions: ['See his experience', 'His projects', 'His skills']
            };
        }

        // Achievements patterns
        if (/\b(achievement|award|recognition|accomplishment|won)\b/.test(msg)) {
            return {
                type: 'achievements',
                response: `Krish's achievements include:

${knowledgeBase.achievements.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Plus he's worked at 2 unicorns with a combined valuation of $3.6 billion! 🦄`,
                suggestions: ['See his skills', 'His projects', 'Contact him']
            };
        }

        // BharatPe specific
        if (/bharatpe|bharat\s*pe/i.test(msg)) {
            return {
                type: 'bharatpe',
                response: `At BharatPe, Krish was Director of Engineering and built BharatSwipe - India's First ZERO Commission POS system. It processed over 700 Crore rupees in transactions! BharatPe is a $2.8B fintech unicorn. 💰`,
                suggestions: ['Other projects?', 'His current role?', 'Tech stack?']
            };
        }

        // Thanks patterns
        if (/\b(thanks|thank you|appreciate)\b/.test(msg)) {
            return {
                type: 'thanks',
                response: `You're welcome! 😊 Feel free to ask me anything else about Krish's experience, skills, or projects. Want to connect with him?`,
                suggestions: ['Contact info', 'See projects', 'His experience']
            };
        }

        // Default fallback
        return {
            type: 'fallback',
            response: `I can help you learn about Krish! Try asking about:

• His experience and work history
• Technical skills and stack
• Projects he's built
• How to contact him
• His achievements

What would you like to know?`,
            suggestions: ['Tell me about him', 'His experience', 'Contact info', 'Show projects']
        };
    }

    // Create chat button
    const chatBtn = document.createElement('button');
    chatBtn.innerHTML = '💬';
    chatBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 15px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
        border: 2px solid rgba(255, 255, 255, 0.3);
        font-size: 28px;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transition: all 0.3s ease;
        opacity: 0.85;
        backdrop-filter: blur(10px);
    `;
    chatBtn.title = 'Chat with AI Assistant';
    document.body.appendChild(chatBtn);

    // Button hover effect
    chatBtn.addEventListener('mouseenter', () => {
        chatBtn.style.transform = 'scale(1.1)';
        chatBtn.style.boxShadow = '0 6px 30px rgba(255, 255, 255, 0.4)';
        chatBtn.style.background = 'rgba(0, 0, 0, 0.8)';
        chatBtn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        chatBtn.style.opacity = '1';
    });
    chatBtn.addEventListener('mouseleave', () => {
        chatBtn.style.transform = 'scale(1)';
        chatBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        chatBtn.style.background = 'rgba(0, 0, 0, 0.6)';
        chatBtn.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        chatBtn.style.opacity = '0.85';
    });

    // Create chat window
    function createChatWindow() {
        const chatWindow = document.createElement('div');
        chatWindow.id = 'krish-chatbot';
        const isMobile = window.innerWidth < BREAKPOINTS.MOBILE;
        chatWindow.style.cssText = `
            position: fixed;
            ${isMobile ? `
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                width: 100%;
                height: 100%;
                border-radius: 0;
            ` : `
                bottom: 100px;
                left: 15px;
                width: 380px;
                height: 550px;
                border-radius: 20px;
            `}
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
            border: 2px solid #7c3aed;
            box-shadow: 0 10px 50px rgba(124, 58, 237, 0.3);
            z-index: 10001;
            display: none;
            flex-direction: column;
            overflow: hidden;
        `;

        chatWindow.innerHTML = `
            <div style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); color: white; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; font-family: 'Space Grotesk', sans-serif;">
                <div>
                    <div style="font-weight: 700; font-size: 16px;">🤖 AI Assistant</div>
                    <div style="font-size: 11px; opacity: 0.9;">Ask me about Krish!</div>
                </div>
                <button id="close-chat" style="background: transparent; border: none; color: white; font-size: 24px; cursor: pointer; width: 30px; height: 30px;">×</button>
            </div>

            <div id="chat-messages" style="flex: 1; overflow-y: auto; padding: 20px; font-family: 'Space Grotesk', sans-serif; font-size: 14px; line-height: 1.6; display: flex; flex-direction: column; gap: 12px;">
                <div style="background: rgba(124, 58, 237, 0.2); padding: 12px 16px; border-radius: 12px; border-left: 3px solid #7c3aed;">
                    <div style="color: #7c3aed; font-weight: 600; margin-bottom: 4px;">AI Assistant</div>
                    <div style="color: #00ff88;">Hello! 👋 I'm here to help you learn about Krish. Ask me anything about his experience, skills, projects, or how to connect with him!</div>
                </div>
            </div>

            <div id="chat-suggestions" style="padding: 10px 20px; display: flex; flex-wrap: wrap; gap: 8px; border-top: 1px solid #333;"></div>

            <div style="padding: 15px 20px; background: #0f0f0f; border-top: 1px solid #7c3aed; display: flex; gap: 10px;">
                <input
                    id="chat-input"
                    type="text"
                    placeholder="Ask me anything..."
                    autocomplete="off"
                    style="flex: 1; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; padding: 10px 12px; color: #00ff88; font-family: 'Space Grotesk', sans-serif; font-size: 14px; outline: none;"
                />
                <button
                    id="chat-send"
                    style="background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); border: none; border-radius: 8px; padding: 10px 16px; color: white; font-weight: 600; cursor: pointer; transition: transform 0.2s;"
                >
                    Send
                </button>
            </div>
        `;

        document.body.appendChild(chatWindow);
        return chatWindow;
    }

    const chatWindow = createChatWindow();
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const chatSuggestions = document.getElementById('chat-suggestions');

    // Add message to chat
    function addMessage(text, isUser = false, suggestions = []) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = isUser
            ? 'background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); padding: 12px 16px; border-radius: 12px; align-self: flex-end; max-width: 80%;'
            : 'background: rgba(124, 58, 237, 0.2); padding: 12px 16px; border-radius: 12px; border-left: 3px solid #7c3aed; max-width: 90%;';

        if (!isUser) {
            messageDiv.innerHTML = `
                <div style="color: #7c3aed; font-weight: 600; margin-bottom: 4px;">AI Assistant</div>
                <div style="color: ${isUser ? 'white' : '#00ff88'}; white-space: pre-wrap;">${text}</div>
            `;
        } else {
            messageDiv.innerHTML = `<div style="color: white;">${text}</div>`;
        }

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Update suggestions
        if (suggestions.length > 0) {
            updateSuggestions(suggestions);
        }
    }

    // Update suggestion chips
    function updateSuggestions(suggestions) {
        chatSuggestions.innerHTML = '';
        suggestions.forEach(suggestion => {
            const chip = document.createElement('button');
            chip.textContent = suggestion;
            chip.style.cssText = `
                background: rgba(124, 58, 237, 0.2);
                border: 1px solid #7c3aed;
                border-radius: 16px;
                padding: 6px 12px;
                font-size: 12px;
                color: #7c3aed;
                cursor: pointer;
                transition: all 0.2s;
                font-family: 'Space Grotesk', sans-serif;
            `;
            chip.addEventListener('mouseenter', () => {
                chip.style.background = '#7c3aed';
                chip.style.color = 'white';
            });
            chip.addEventListener('mouseleave', () => {
                chip.style.background = 'rgba(124, 58, 237, 0.2)';
                chip.style.color = '#7c3aed';
            });
            chip.addEventListener('click', () => {
                chatInput.value = suggestion;
                sendMessage();
            });
            chatSuggestions.appendChild(chip);
        });
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatInput.value = '';

        // Get AI response
        setTimeout(() => {
            const response = findBestMatch(message);
            addMessage(response.response, false, response.suggestions || []);

            chatHistory.push({ user: message, bot: response.response });
        }, 500);
    }

    // Event listeners
    chatBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.style.display = isOpen ? 'flex' : 'none';
        if (isOpen) {
            chatInput.focus();
        }
    });

    document.getElementById('close-chat').addEventListener('click', () => {
        isOpen = false;
        chatWindow.style.display = 'none';
    });

    document.getElementById('chat-send').addEventListener('click', sendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial suggestions
    updateSuggestions(['Tell me about Krish', 'His experience', 'What are his skills?', 'Contact info']);
})();


