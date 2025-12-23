// Three.js minimal geometric animation

let scene, camera, renderer;
let objects = [];
let animationId = null;
let isAnimating = false;

// Initialize Three.js scene
function initThreeJS() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas) return;
    
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Scene setup
    scene = new THREE.Scene();
    scene.background = null; // Transparent background for hero section
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create minimal wireframe geometries
    createGeometries();
    
    // Render initial frame
    renderer.render(scene, camera);
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation immediately since hero is always visible
    isAnimating = true;
    animate();
    
    // Intersection Observer for performance (pause when scrolled away)
    setupIntersectionObserver();
}

// Create large cube for hero section
function createGeometries() {
    const lineMaterial = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        linewidth: 2,
        transparent: true,
        opacity: 0.3
    });
    
    // Create large cube to fill hero section
    const cubeSize = 4; // Large size to fill the viewport
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize, 2, 2, 2);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeometry);
    const cubeWireframe = new THREE.LineSegments(cubeEdges, lineMaterial);
    
    // Center the cube
    cubeWireframe.position.set(0, 0, 0);
    cubeWireframe.userData = {
        rotationSpeedX: 0.0005,
        rotationSpeedY: 0.0008,
        rotationSpeedZ: 0.0003,
        type: 'cube'
    };
    
    scene.add(cubeWireframe);
    objects.push(cubeWireframe);
}

// Animation loop
function animate() {
    if (!isAnimating) return;
    
    animationId = requestAnimationFrame(animate);
    
    const time = Date.now() * 0.001;
    
    // Animate objects
    objects.forEach((object) => {
        if (object instanceof THREE.LineSegments) {
            const userData = object.userData;
            
            // Rotate cube slowly
            object.rotation.x += userData.rotationSpeedX;
            object.rotation.y += userData.rotationSpeedY;
            object.rotation.z += userData.rotationSpeedZ;
        }
    });
    
    // Very subtle, slow camera movement for depth
    camera.position.x = Math.sin(time * 0.15) * 0.1;
    camera.position.y = Math.cos(time * 0.1) * 0.1;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    const canvas = document.getElementById('threejs-canvas');
    if (!canvas || !camera || !renderer) return;
    
    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// Check if section is initially visible
function checkInitialVisibility() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const rect = heroSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    
    if (isVisible && !isAnimating) {
        isAnimating = true;
        animate();
    }
}

// Intersection Observer for performance
function setupIntersectionObserver() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isAnimating) {
                        isAnimating = true;
                        animate();
                    }
                } else {
                    if (isAnimating) {
                        isAnimating = false;
                        if (animationId) {
                            cancelAnimationFrame(animationId);
                        }
                    }
                }
            });
        },
        {
            threshold: 0.1
        }
    );
    
    observer.observe(heroSection);
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

