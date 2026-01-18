// Three.js minimal geometric animation

// Store all 3D scenes and their state
const scenes3D = {};

// Initialize hero Three.js scene
function initThreeJS() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background for hero section

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create large cube for hero
    createCube(scene);

    // Store scene data
    scenes3D['hero'] = {
        scene: scene,
        camera: camera,
        renderer: renderer,
        canvas: canvas,
        objects: scene.children,
        isAnimating: true,
        animationId: null
    };

    // Render initial frame
    renderer.render(scene, camera);

    // Handle window resize
    window.addEventListener('resize', () => onWindowResize('hero'));

    // Start animation immediately since hero is always visible
    animateScene('hero');

    // Intersection Observer for performance (pause when scrolled away)
    setupIntersectionObserver('hero', canvas.parentElement);
}

// Create Y2K geometric shapes for hero section
function createCube(scene) {
    // Main large iridescent cube
    const purpleMaterial = new THREE.LineBasicMaterial({
        color: 0xb967ff,
        linewidth: 2,
        transparent: true,
        opacity: 0.6
    });

    const cubeSize = 4;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 3, 3, 3);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
    const cubeWireframe = new THREE.LineSegments(cubeEdges, purpleMaterial);

    cubeWireframe.position.set(0, 0, 0);
    cubeWireframe.userData = {
        rotationSpeedX: 0.0005,
        rotationSpeedY: 0.0008,
        rotationSpeedZ: 0.0003,
        type: 'cube',
        colorPhase: 0
    };

    scene.add(cubeWireframe);

    // Smaller cyan torus
    const cyanMaterial = new THREE.LineBasicMaterial({
        color: 0x05ffa1,
        linewidth: 2,
        transparent: true,
        opacity: 0.5
    });

    const torusGeometry = new THREE.TorusGeometry(2.5, 0.8, 16, 32);
    const torusEdges = new THREE.EdgesGeometry(torusGeometry);
    const torusWireframe = new THREE.LineSegments(torusEdges, cyanMaterial);

    torusWireframe.position.set(-1, 1, -2);
    torusWireframe.rotation.x = Math.PI / 4;
    torusWireframe.userData = {
        rotationSpeedX: 0.001,
        rotationSpeedY: 0.0015,
        rotationSpeedZ: 0.0005,
        type: 'torus',
        colorPhase: Math.PI / 3
    };

    scene.add(torusWireframe);

    // Pink sphere
    const pinkMaterial = new THREE.LineBasicMaterial({
        color: 0xff6ec7,
        linewidth: 2,
        transparent: true,
        opacity: 0.4
    });

    const sphereGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const sphereEdges = new THREE.EdgesGeometry(sphereGeometry);
    const sphereWireframe = new THREE.LineSegments(sphereEdges, pinkMaterial);

    sphereWireframe.position.set(3, -1, -3);
    sphereWireframe.userData = {
        rotationSpeedX: 0.0012,
        rotationSpeedY: 0.0008,
        rotationSpeedZ: 0.001,
        type: 'sphere',
        colorPhase: (Math.PI * 2) / 3
    };

    scene.add(sphereWireframe);

    // Small orbiting cube
    const silverMaterial = new THREE.LineBasicMaterial({
        color: 0xe8e8e8,
        linewidth: 2,
        transparent: true,
        opacity: 0.5
    });

    const smallCubeGeometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
    const smallCubeEdges = new THREE.EdgesGeometry(smallCubeGeometry);
    const smallCubeWireframe = new THREE.LineSegments(smallCubeEdges, silverMaterial);

    smallCubeWireframe.position.set(-3, -2, -1);
    smallCubeWireframe.userData = {
        rotationSpeedX: 0.002,
        rotationSpeedY: 0.0015,
        rotationSpeedZ: 0.002,
        type: 'smallCube',
        orbitRadius: 3,
        orbitSpeed: 0.0008
    };

    scene.add(smallCubeWireframe);
}

// Universal animation loop with Y2K color cycling
function animateScene(sceneId) {
    const sceneData = scenes3D[sceneId];
    if (!sceneData || !sceneData.isAnimating) return;

    sceneData.animationId = requestAnimationFrame(() => animateScene(sceneId));

    const time = Date.now() * 0.001;

    // Animate objects with Y2K color cycling
    sceneData.objects.forEach((object) => {
        if (object instanceof THREE.LineSegments && object.userData) {
            // Rotate
            object.rotation.x += object.userData.rotationSpeedX;
            object.rotation.y += object.userData.rotationSpeedY;
            object.rotation.z += object.userData.rotationSpeedZ;

            // Orbit for small cube
            if (object.userData.type === 'smallCube' && object.userData.orbitRadius) {
                const orbitAngle = time * object.userData.orbitSpeed;
                object.position.x = Math.cos(orbitAngle) * object.userData.orbitRadius;
                object.position.z = Math.sin(orbitAngle) * object.userData.orbitRadius - 1;
                object.position.y = Math.sin(orbitAngle * 2) * 0.5 - 2;
            }

            // Iridescent color cycling
            if (object.userData.colorPhase !== undefined) {
                const phase = time * 0.5 + object.userData.colorPhase;
                const r = Math.sin(phase) * 0.5 + 0.5;
                const g = Math.sin(phase + Math.PI * 2 / 3) * 0.5 + 0.5;
                const b = Math.sin(phase + Math.PI * 4 / 3) * 0.5 + 0.5;

                // Blend with original color for subtle effect
                if (object.userData.type === 'cube') {
                    object.material.color.setRGB(
                        0.7 + r * 0.3,
                        0.4 + g * 0.2,
                        1.0
                    );
                } else if (object.userData.type === 'torus') {
                    object.material.color.setRGB(
                        0.02 + r * 0.2,
                        0.9 + g * 0.1,
                        0.6 + b * 0.4
                    );
                } else if (object.userData.type === 'sphere') {
                    object.material.color.setRGB(
                        1.0,
                        0.4 + g * 0.3,
                        0.7 + b * 0.3
                    );
                }
            }
        }
    });

    // Subtle camera movement for depth
    if (sceneId === 'hero') {
        sceneData.camera.position.x = Math.sin(time * 0.15) * 0.3;
        sceneData.camera.position.y = Math.cos(time * 0.1) * 0.3;
    }

    sceneData.camera.lookAt(sceneData.scene.position);
    sceneData.renderer.render(sceneData.scene, sceneData.camera);
}

// Handle window resize for all scenes
function onWindowResize(sceneId) {
    const sceneData = scenes3D[sceneId];
    if (!sceneData) return;

    const canvas = sceneData.canvas;
    let width, height;

    if (sceneId === 'hero') {
        const container = canvas.parentElement;
        width = container.clientWidth;
        height = container.clientHeight;
    } else {
        // For other canvases, use their actual displayed size
        width = canvas.clientWidth;
        height = canvas.clientHeight;
    }

    sceneData.camera.aspect = width / height;
    sceneData.camera.updateProjectionMatrix();
    sceneData.renderer.setSize(width, height);
}

// Intersection Observer for each scene
function setupIntersectionObserver(sceneId, element) {
    const sceneData = scenes3D[sceneId];
    if (!sceneData) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!sceneData.isAnimating) {
                        sceneData.isAnimating = true;
                        animateScene(sceneId);
                    }
                } else {
                    if (sceneData.isAnimating) {
                        sceneData.isAnimating = false;
                        if (sceneData.animationId) {
                            cancelAnimationFrame(sceneData.animationId);
                        }
                    }
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    observer.observe(element);
}

// Initialize when DOM and Three.js are ready
function waitForThreeJS() {
    if (typeof THREE !== 'undefined') {
        initThreeJS();
    } else {
        setTimeout(waitForThreeJS, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForThreeJS);
} else {
    waitForThreeJS();
}

