/**
 * 3D Ship Creation and Scene Management
 * Fantasy sailing ship for the journey
 */

class FantasyShip {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.ship = null;
        this.particles = null;
        this.controls = {
            mouseX: 0,
            mouseY: 0,
            targetRotationX: 0,
            targetRotationY: 0
        };
    }

    /**
     * Create the fantasy ship model
     */
    createShip() {
        const shipGroup = new THREE.Group();

        // Ship hull
        const hullGeometry = new THREE.CylinderGeometry(0.5, 1.2, 4, 8);
        const hullMaterial = new THREE.MeshPhongMaterial({
            color: 0x8b4513,
            shininess: 30
        });
        const hull = new THREE.Mesh(hullGeometry, hullMaterial);
        hull.scale.set(2, 1, 3);
        hull.position.y = 0;
        shipGroup.add(hull);

        // Ship deck
        const deckGeometry = new THREE.BoxGeometry(3, 0.3, 5);
        const deckMaterial = new THREE.MeshPhongMaterial({
            color: 0xa0522d,
            shininess: 20
        });
        const deck = new THREE.Mesh(deckGeometry, deckMaterial);
        deck.position.y = 2;
        shipGroup.add(deck);

        // Main mast
        const mastGeometry = new THREE.CylinderGeometry(0.15, 0.15, 6);
        const mastMaterial = new THREE.MeshPhongMaterial({
            color: 0x654321
        });
        const mast = new THREE.Mesh(mastGeometry, mastMaterial);
        mast.position.y = 5;
        shipGroup.add(mast);

        // Main sail
        const sailGeometry = new THREE.PlaneGeometry(3, 4);
        const sailMaterial = new THREE.MeshPhongMaterial({
            color: 0xf0f0f0,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9
        });
        const sail = new THREE.Mesh(sailGeometry, sailMaterial);
        sail.position.set(0, 5, 0.5);
        sail.rotation.y = Math.PI / 2;
        shipGroup.add(sail);

        // Front mast
        const frontMast = mast.clone();
        frontMast.scale.set(0.7, 0.7, 0.7);
        frontMast.position.set(0, 4, 2);
        shipGroup.add(frontMast);

        // Front sail
        const frontSail = sail.clone();
        frontSail.scale.set(0.7, 0.7, 0.7);
        frontSail.position.set(0, 4, 2.5);
        shipGroup.add(frontSail);

        // Ship bow decoration
        const bowGeometry = new THREE.ConeGeometry(0.3, 1, 8);
        const bowMaterial = new THREE.MeshPhongMaterial({
            color: 0xffd700,
            emissive: 0xffa500,
            emissiveIntensity: 0.5
        });
        const bow = new THREE.Mesh(bowGeometry, bowMaterial);
        bow.rotation.x = Math.PI / 2;
        bow.position.set(0, 1.5, 2.8);
        shipGroup.add(bow);

        // Lanterns on ship
        const lanternGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const lanternMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.8
        });

        const lantern1 = new THREE.Mesh(lanternGeometry, lanternMaterial);
        lantern1.position.set(1.5, 2.5, 2);
        shipGroup.add(lantern1);

        const lantern2 = new THREE.Mesh(lanternGeometry, lanternMaterial);
        lantern2.position.set(-1.5, 2.5, 2);
        shipGroup.add(lantern2);

        // Add glow to lanterns
        const lanternLight1 = new THREE.PointLight(0xffaa00, 1, 5);
        lanternLight1.position.copy(lantern1.position);
        shipGroup.add(lanternLight1);

        const lanternLight2 = new THREE.PointLight(0xffaa00, 1, 5);
        lanternLight2.position.copy(lantern2.position);
        shipGroup.add(lanternLight2);

        // Flag at the top of mast
        const flagGeometry = new THREE.PlaneGeometry(1, 0.7);
        const flagMaterial = new THREE.MeshPhongMaterial({
            color: 0x6366f1,
            side: THREE.DoubleSide
        });
        const flag = new THREE.Mesh(flagGeometry, flagMaterial);
        flag.position.set(0, 8, 0);
        flag.rotation.y = Math.PI / 4;
        shipGroup.add(flag);

        // Position the ship
        shipGroup.position.y = 0;
        shipGroup.rotation.y = Math.PI;

        return shipGroup;
    }

    /**
     * Create particle system for atmospheric effects
     */
    createParticles(theme) {
        const particleCount = theme.particles.count;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * theme.particles.spread;
            positions[i + 1] = (Math.random() - 0.5) * theme.particles.spread;
            positions[i + 2] = (Math.random() - 0.5) * theme.particles.spread;

            velocities.push({
                x: (Math.random() - 0.5) * theme.particles.speed,
                y: (Math.random() - 0.5) * theme.particles.speed,
                z: (Math.random() - 0.5) * theme.particles.speed
            });
        }

        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({
            color: theme.colors.particles,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, particleMaterial);
        particleSystem.userData.velocities = velocities;

        return particleSystem;
    }

    /**
     * Create ocean waves (simple plane with animation)
     */
    createOcean() {
        const oceanGeometry = new THREE.PlaneGeometry(100, 100, 50, 50);
        const oceanMaterial = new THREE.MeshPhongMaterial({
            color: 0x0077be,
            transparent: true,
            opacity: 0.7,
            shininess: 100,
            side: THREE.DoubleSide
        });

        const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
        ocean.rotation.x = -Math.PI / 2;
        ocean.position.y = -2;

        // Store original positions for animation
        const positions = oceanGeometry.attributes.position.array;
        ocean.userData.originalPositions = new Float32Array(positions);

        return ocean;
    }

    /**
     * Animate ocean waves
     */
    animateOcean(ocean, time) {
        const positions = ocean.geometry.attributes.position.array;
        const original = ocean.userData.originalPositions;

        for (let i = 0; i < positions.length; i += 3) {
            const x = original[i];
            const z = original[i + 2];

            positions[i + 1] =
                Math.sin(x * 0.2 + time) * 0.3 +
                Math.cos(z * 0.3 + time * 0.5) * 0.3;
        }

        ocean.geometry.attributes.position.needsUpdate = true;
        ocean.geometry.computeVertexNormals();
    }

    /**
     * Animate particles
     */
    animateParticles(particleSystem) {
        const positions = particleSystem.geometry.attributes.position.array;
        const velocities = particleSystem.userData.velocities;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += velocities[i / 3].x;
            positions[i + 1] += velocities[i / 3].y;
            positions[i + 2] += velocities[i / 3].z;

            // Wrap around
            const limit = 25;
            if (positions[i] > limit) positions[i] = -limit;
            if (positions[i] < -limit) positions[i] = limit;
            if (positions[i + 1] > limit) positions[i + 1] = -limit;
            if (positions[i + 1] < -limit) positions[i + 1] = limit;
            if (positions[i + 2] > limit) positions[i + 2] = -limit;
            if (positions[i + 2] < -limit) positions[i + 2] = limit;
        }

        particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    /**
     * Animate ship (gentle rocking motion)
     */
    animateShip(ship, time) {
        ship.rotation.z = Math.sin(time * 0.5) * 0.05;
        ship.rotation.x = Math.cos(time * 0.3) * 0.03;
        ship.position.y = Math.sin(time * 0.7) * 0.3;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FantasyShip;
}
