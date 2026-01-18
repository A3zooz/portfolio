/**
 * THREE-BG.JS
 * Three.js wireframe geometric background
 */

(function() {
    'use strict';

    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.warn('Three.js not loaded');
        return;
    }

    const canvas = document.getElementById('threeBg');
    if (!canvas) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Colors
    const primaryColor = 0xff0033; // Accent red
    const secondaryColor = 0x333333; // Dark gray
    const whiteColor = 0xffffff;

    // Wireframe material
    const wireMaterial = new THREE.LineBasicMaterial({ 
        color: secondaryColor,
        transparent: true,
        opacity: 0.4
    });

    const accentMaterial = new THREE.LineBasicMaterial({
        color: primaryColor,
        transparent: true,
        opacity: 0.6
    });

    // Store all shapes for animation
    const shapes = [];

    // Create wireframe shapes
    function createWireframeShape(geometry, material, position, rotation) {
        const edges = new THREE.EdgesGeometry(geometry);
        const wireframe = new THREE.LineSegments(edges, material);
        wireframe.position.set(position.x, position.y, position.z);
        wireframe.rotation.set(rotation.x, rotation.y, rotation.z);
        
        // Store original position for parallax
        wireframe.userData.originalPosition = { ...position };
        wireframe.userData.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.002,
            y: (Math.random() - 0.5) * 0.002,
            z: (Math.random() - 0.5) * 0.001
        };
        
        return wireframe;
    }

    // Add cubes
    for (let i = 0; i < 8; i++) {
        const size = Math.random() * 3 + 1;
        const geometry = new THREE.BoxGeometry(size, size, size);
        const material = Math.random() > 0.7 ? accentMaterial : wireMaterial;
        
        const shape = createWireframeShape(
            geometry,
            material,
            {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 20 - 10
            },
            {
                x: Math.random() * Math.PI,
                y: Math.random() * Math.PI,
                z: Math.random() * Math.PI
            }
        );
        
        scene.add(shape);
        shapes.push(shape);
    }

    // Add octahedrons (diamond shapes)
    for (let i = 0; i < 6; i++) {
        const size = Math.random() * 2 + 1;
        const geometry = new THREE.OctahedronGeometry(size);
        const material = Math.random() > 0.6 ? accentMaterial : wireMaterial;
        
        const shape = createWireframeShape(
            geometry,
            material,
            {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 20 - 10
            },
            {
                x: Math.random() * Math.PI,
                y: Math.random() * Math.PI,
                z: Math.random() * Math.PI
            }
        );
        
        scene.add(shape);
        shapes.push(shape);
    }

    // Add tetrahedrons (pyramids)
    for (let i = 0; i < 5; i++) {
        const size = Math.random() * 2.5 + 1.5;
        const geometry = new THREE.TetrahedronGeometry(size);
        const material = Math.random() > 0.5 ? accentMaterial : wireMaterial;
        
        const shape = createWireframeShape(
            geometry,
            material,
            {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 20 - 10
            },
            {
                x: Math.random() * Math.PI,
                y: Math.random() * Math.PI,
                z: Math.random() * Math.PI
            }
        );
        
        scene.add(shape);
        shapes.push(shape);
    }

    // Add icosahedrons
    for (let i = 0; i < 4; i++) {
        const size = Math.random() * 2 + 1;
        const geometry = new THREE.IcosahedronGeometry(size);
        const material = Math.random() > 0.7 ? accentMaterial : wireMaterial;
        
        const shape = createWireframeShape(
            geometry,
            material,
            {
                x: (Math.random() - 0.5) * 50,
                y: (Math.random() - 0.5) * 40,
                z: (Math.random() - 0.5) * 20 - 10
            },
            {
                x: Math.random() * Math.PI,
                y: Math.random() * Math.PI,
                z: Math.random() * Math.PI
            }
        );
        
        scene.add(shape);
        shapes.push(shape);
    }

    // Floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 80;
        positions[i + 1] = (Math.random() - 0.5) * 60;
        positions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.05,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Mouse position for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    // Scroll position
    let scrollY = 0;
    
    window.addEventListener('scroll', () => {
        scrollY = window.pageYOffset;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        // Smooth mouse follow
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;

        // Animate shapes
        shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;

            // Parallax based on mouse
            const parallaxStrength = 0.5 + (index % 3) * 0.2;
            shape.position.x = shape.userData.originalPosition.x + mouseX * parallaxStrength;
            shape.position.y = shape.userData.originalPosition.y - mouseY * parallaxStrength;

            // Floating animation
            shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.005;
        });

        // Animate particles
        particles.rotation.y += 0.0002;
        particles.position.y = -scrollY * 0.01;

        // Camera subtle movement
        camera.position.x = mouseX * 2;
        camera.position.y = -mouseY * 2;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Reduce animation on low-power devices
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        shapes.forEach(shape => {
            shape.userData.rotationSpeed = { x: 0, y: 0, z: 0 };
        });
    }

})();
