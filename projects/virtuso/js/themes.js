/**
 * Fantasy Theme Configurations
 * Different realms the ship travels through
 */

const THEMES = {
    mystical: {
        name: 'Mystical Waters',
        description: 'Begin your journey through the enchanted seas of wonder, where magic flows like water and dreams take sail.',
        colors: {
            sky: 0x1a3a52,
            fog: 0x0ea5e9,
            ambient: 0x4da8da,
            directional: 0xffffff,
            particles: 0x0ea5e9
        },
        fog: {
            near: 10,
            far: 100
        },
        particles: {
            count: 1000,
            spread: 50,
            speed: 0.02
        },
        camera: {
            position: { x: 0, y: 5, z: 15 }
        },
        icon: '🌊'
    },

    enchanted: {
        name: 'Enchanted Forest',
        description: 'Sail through mystical woodlands where ancient trees whisper secrets and fireflies dance in emerald light.',
        colors: {
            sky: 0x1a3d1a,
            fog: 0x10b981,
            ambient: 0x4ade80,
            directional: 0xffffff,
            particles: 0x22c55e
        },
        fog: {
            near: 8,
            far: 80
        },
        particles: {
            count: 1500,
            spread: 60,
            speed: 0.015
        },
        camera: {
            position: { x: 5, y: 6, z: 12 }
        },
        icon: '🌲'
    },

    celestial: {
        name: 'Celestial Skies',
        description: 'Ascend to the realm of stars, where constellations guide your path and cosmic winds fill your sails.',
        colors: {
            sky: 0x1e1b4b,
            fog: 0x8b5cf6,
            ambient: 0xa78bfa,
            directional: 0xffffff,
            particles: 0xc4b5fd
        },
        fog: {
            near: 15,
            far: 120
        },
        particles: {
            count: 2000,
            spread: 80,
            speed: 0.01
        },
        camera: {
            position: { x: -5, y: 8, z: 15 }
        },
        icon: '⭐'
    },

    crystal: {
        name: 'Crystal Caves',
        description: 'Navigate through glittering caverns of precious gems, where light refracts into a thousand rainbows.',
        colors: {
            sky: 0x164e63,
            fog: 0x06b6d4,
            ambient: 0x22d3ee,
            directional: 0xffffff,
            particles: 0x67e8f9
        },
        fog: {
            near: 5,
            far: 60
        },
        particles: {
            count: 1200,
            spread: 45,
            speed: 0.025
        },
        camera: {
            position: { x: 3, y: 4, z: 10 }
        },
        icon: '💎'
    },

    fire: {
        name: 'Fire Mountains',
        description: 'Brave the volcanic peaks where flames dance and molten rivers carve paths through the darkness.',
        colors: {
            sky: 0x431407,
            fog: 0xf59e0b,
            ambient: 0xfbbf24,
            directional: 0xffffff,
            particles: 0xfb923c
        },
        fog: {
            near: 12,
            far: 90
        },
        particles: {
            count: 1800,
            spread: 70,
            speed: 0.03
        },
        camera: {
            position: { x: -3, y: 7, z: 14 }
        },
        icon: '🔥'
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = THEMES;
}
