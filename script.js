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
