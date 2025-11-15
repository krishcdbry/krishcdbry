/**
 * Virtuso - Main Application
 * Fantasy Ship Journey Event Platform
 * By Mohana Krishna Padda
 */

// Application State
const app = {
    currentTheme: 'mystical',
    scene: null,
    camera: null,
    renderer: null,
    ship: null,
    ocean: null,
    particles: null,
    fantasyShip: new FantasyShip(),
    time: 0,
    isTransitioning: false,
    registrations: []
};

/**
 * Initialize Three.js scene
 */
function initScene() {
    const canvas = document.getElementById('webgl-canvas');

    // Scene
    app.scene = new THREE.Scene();

    // Camera
    app.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    const theme = THEMES[app.currentTheme];
    app.camera.position.set(
        theme.camera.position.x,
        theme.camera.position.y,
        theme.camera.position.z
    );
    app.camera.lookAt(0, 0, 0);

    // Renderer
    app.renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    app.renderer.setSize(window.innerWidth, window.innerHeight);
    app.renderer.setPixelRatio(window.devicePixelRatio);

    // Apply theme
    applyTheme(app.currentTheme);

    // Lights
    const ambientLight = new THREE.AmbientLight(theme.colors.ambient, 0.6);
    app.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(theme.colors.directional, 0.8);
    directionalLight.position.set(5, 10, 5);
    app.scene.add(directionalLight);

    // Create ship
    app.ship = app.fantasyShip.createShip();
    app.scene.add(app.ship);

    // Create ocean
    app.ocean = app.fantasyShip.createOcean();
    app.scene.add(app.ocean);

    // Create particles
    app.particles = app.fantasyShip.createParticles(theme);
    app.scene.add(app.particles);
}

/**
 * Apply theme to scene
 */
function applyTheme(themeName, animate = false) {
    const theme = THEMES[themeName];

    if (animate) {
        // Smooth transition
        app.isTransitioning = true;
        setTimeout(() => {
            app.isTransitioning = false;
        }, 1000);
    }

    // Update scene
    app.scene.background = new THREE.Color(theme.colors.sky);
    app.scene.fog = new THREE.Fog(theme.colors.fog, theme.fog.near, theme.fog.far);

    // Update particles
    if (app.particles) {
        app.scene.remove(app.particles);
        app.particles = app.fantasyShip.createParticles(theme);
        app.scene.add(app.particles);
    }

    // Update theme panel
    document.getElementById('theme-title').textContent = theme.name;
    document.getElementById('theme-description').textContent = theme.description;
}

/**
 * Animation loop
 */
function animate() {
    requestAnimationFrame(animate);

    app.time += 0.01;

    // Animate ship
    if (app.ship) {
        app.fantasyShip.animateShip(app.ship, app.time);
    }

    // Animate ocean
    if (app.ocean) {
        app.fantasyShip.animateOcean(app.ocean, app.time);
    }

    // Animate particles
    if (app.particles) {
        app.fantasyShip.animateParticles(app.particles);
    }

    // Smooth camera rotation based on mouse
    if (!app.isTransitioning) {
        app.camera.position.x += (app.fantasyShip.controls.mouseX * 0.05 - app.camera.position.x) * 0.05;
        app.camera.position.y += (app.fantasyShip.controls.mouseY * 0.05 + 5 - app.camera.position.y) * 0.05;
        app.camera.lookAt(0, 0, 0);
    }

    app.renderer.render(app.scene, app.camera);
}

/**
 * Handle window resize
 */
function onWindowResize() {
    app.camera.aspect = window.innerWidth / window.innerHeight;
    app.camera.updateProjectionMatrix();
    app.renderer.setSize(window.innerWidth, window.innerHeight);
}

/**
 * Handle mouse movement
 */
function onMouseMove(event) {
    app.fantasyShip.controls.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    app.fantasyShip.controls.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * Handle theme change
 */
function changeTheme(themeName) {
    if (app.currentTheme === themeName) return;

    app.currentTheme = themeName;
    applyTheme(themeName, true);

    // Update active dot
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
        if (dot.dataset.theme === themeName) {
            dot.classList.add('active');
        }
    });
}

/**
 * Navigate to next theme
 */
function nextTheme() {
    const themeKeys = Object.keys(THEMES);
    const currentIndex = themeKeys.indexOf(app.currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    changeTheme(themeKeys[nextIndex]);
}

/**
 * Show/Hide modals
 */
function showModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

/**
 * Handle registration form submission
 */
function handleRegistration(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const registration = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        college: formData.get('college'),
        year: formData.get('year'),
        events: formData.getAll('events'),
        timestamp: new Date().toISOString()
    };

    // Store registration (in real app, would send to server)
    app.registrations.push(registration);
    console.log('New Registration:', registration);

    // Show success message
    document.getElementById('registration-form').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');

    // Reset after 3 seconds
    setTimeout(() => {
        document.getElementById('registration-form').classList.remove('hidden');
        document.getElementById('success-message').classList.add('hidden');
        document.getElementById('registration-form').reset();
        hideModal('registration-modal');
    }, 3000);
}

/**
 * Initialize loading screen
 */
function initLoading() {
    let progress = 0;
    const progressBar = document.getElementById('loading-progress');
    const loadingText = document.getElementById('loading-text');

    const messages = [
        'Preparing your voyage...',
        'Raising the sails...',
        'Charting the course...',
        'Loading magical realms...',
        'Almost ready to embark...'
    ];

    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            setTimeout(() => {
                document.getElementById('loading-screen').classList.add('fade-out');
                setTimeout(() => {
                    document.getElementById('loading-screen').style.display = 'none';
                }, 500);
            }, 500);
        }

        progressBar.style.width = progress + '%';
        const messageIndex = Math.min(Math.floor(progress / 20), messages.length - 1);
        loadingText.textContent = messages[messageIndex];
    }, 200);
}

/**
 * Initialize event listeners
 */
function initEventListeners() {
    // Window events
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('mousemove', onMouseMove);

    // Theme navigation
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', () => {
            changeTheme(dot.dataset.theme);
        });
    });

    document.getElementById('next-theme-btn').addEventListener('click', nextTheme);

    // Navigation buttons
    document.getElementById('explore-btn').addEventListener('click', () => {
        nextTheme();
    });

    document.getElementById('register-btn').addEventListener('click', () => {
        showModal('registration-modal');
    });

    document.getElementById('info-btn').addEventListener('click', () => {
        showModal('info-modal');
    });

    // Modal close buttons
    document.getElementById('info-close').addEventListener('click', () => {
        hideModal('info-modal');
    });

    document.getElementById('registration-close').addEventListener('click', () => {
        hideModal('registration-modal');
    });

    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                hideModal(modal.id);
            }
        });
    });

    // Registration form
    document.getElementById('registration-form').addEventListener('submit', handleRegistration);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                nextTheme();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                // Previous theme
                const themeKeys = Object.keys(THEMES);
                const currentIndex = themeKeys.indexOf(app.currentTheme);
                const prevIndex = (currentIndex - 1 + themeKeys.length) % themeKeys.length;
                changeTheme(themeKeys[prevIndex]);
                break;
            case 'Escape':
                // Close all modals
                hideModal('info-modal');
                hideModal('registration-modal');
                break;
        }
    });
}

/**
 * Initialize application
 */
function init() {
    console.log('🚢 Virtuso - Fantasy Journey Starting...');

    // Start loading screen
    initLoading();

    // Initialize Three.js scene
    initScene();

    // Initialize event listeners
    initEventListeners();

    // Start animation loop
    animate();

    console.log('⛵ Voyage has begun!');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Expose app for debugging
if (typeof window !== 'undefined') {
    window.virtusoApp = app;
}
