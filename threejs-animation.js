// Three.js minimal geometric animation

// Store all 3D scenes and their state
const scenes3D = {};
let reduceMotionEnabled = false;

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

// Create large cube for hero section
function createCube(scene) {
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.3
    });

    const cubeSize = 4;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 2, 2, 2);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
    const cubeWireframe = new THREE.LineSegments(cubeEdges, lineMaterial);

    cubeWireframe.position.set(0, 0, 0);
    cubeWireframe.userData = {
        rotationSpeedX: 0.0005,
        rotationSpeedY: 0.0008,
        rotationSpeedZ: 0.0003,
        type: 'cube'
    };

    scene.add(cubeWireframe);
}

// Universal animation loop
function animateScene(sceneId) {
    const sceneData = scenes3D[sceneId];
    if (!sceneData || !sceneData.isAnimating || reduceMotionEnabled) return;

    sceneData.animationId = requestAnimationFrame(() => animateScene(sceneId));

    const time = Date.now() * 0.001;

    // Animate objects
    sceneData.objects.forEach((object) => {
        if (object instanceof THREE.LineSegments && object.userData) {
            object.rotation.x += object.userData.rotationSpeedX;
            object.rotation.y += object.userData.rotationSpeedY;
            object.rotation.z += object.userData.rotationSpeedZ;
        }
    });

    // Subtle camera movement for depth
    if (sceneId === 'hero') {
        sceneData.camera.position.x = Math.sin(time * 0.15) * 0.1;
        sceneData.camera.position.y = Math.cos(time * 0.1) * 0.1;
    }

    sceneData.camera.lookAt(sceneData.scene.position);
    sceneData.renderer.render(sceneData.scene, sceneData.camera);
}

function setReducedMotion(value) {
    reduceMotionEnabled = Boolean(value);
    if (reduceMotionEnabled) {
        Object.values(scenes3D).forEach(sceneData => {
            if (sceneData && sceneData.animationId) {
                cancelAnimationFrame(sceneData.animationId);
            }
        });
    } else {
        Object.keys(scenes3D).forEach(sceneId => {
            const sceneData = scenes3D[sceneId];
            if (sceneData && sceneData.isAnimating) {
                animateScene(sceneId);
            }
        });
    }
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

window.threeHero = {
    setReducedMotion
};

