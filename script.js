let scenes = [], cameras = [], renderers = [], controls = [], models = [];
let sceneFullscreen, cameraFullscreen, rendererFullscreen, controlsFullscreen, modelFullscreen;
let isRotating = [false, false, false];
let currentModelIndex = 0; // Track which model is being viewed in fullscreen

const GPU_MODELS = [
    {
        name: "RTX 4090 Founders Edition",
        color: 0x60a5fa,
        specs: {
            cores: "16,384",
            memory: "24GB GDDR6X",
            clock: "2.52 GHz",
            interface: "384-bit"
        }
    },
    {
        name: "RTX 4090 ROG STRIX OC",
        color: 0xff4444,
        specs: {
            cores: "16,384",
            memory: "24GB GDDR6X",
            clock: "2.61 GHz",
            interface: "384-bit"
        }
    },
    {
        name: "RTX 4090 SUPRIM X",
        color: 0x44ff44,
        specs: {
            cores: "16,384",
            memory: "24GB GDDR6X",
            clock: "2.63 GHz",
            interface: "384-bit"
        }
    }
];

function init() {
    initMainViews();
    initFullscreenView();
    animate();
    setupHoverListeners();
}

function setupHoverListeners() {
    const modelWrappers = document.querySelectorAll('.model-info-wrapper');
    
    modelWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('mouseenter', () => {
            isRotating[index] = true;
            models[index].rotation.x = 0.3;
            models[index].rotation.y = -0.5;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            isRotating[index] = false;
            models[index].rotation.x = 0.3;
            models[index].rotation.y = -0.5;
        });
    });
}

function initMainViews() {
    for (let i = 0; i < 3; i++) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x374151);
        scenes.push(scene);

        const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
        camera.position.z = 5;
        cameras.push(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(250, 250);
        document.getElementById(`model-container${i > 0 ? i + 1 : ''}`).appendChild(renderer.domElement);
        renderers.push(renderer);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const control = new THREE.OrbitControls(camera, renderer.domElement);
        control.enableDamping = true;
        control.dampingFactor = 0.05;
        controls.push(control);

        const geometry = new THREE.BoxGeometry(2, 1, 3);
        const material = new THREE.MeshPhongMaterial({ 
            color: GPU_MODELS[i].color,
            specular: 0x050505,
            shininess: 100
        });
        const model = new THREE.Mesh(geometry, material);
        // Set initial angled position
        model.rotation.x = 0.3;
        model.rotation.y = -0.5;
        scene.add(model);
        models.push(model);
    }
}

function initFullscreenView() {
    sceneFullscreen = new THREE.Scene();
    sceneFullscreen.background = new THREE.Color(0x374151);

    const aspect = window.innerWidth / (window.innerHeight * 0.6);
    cameraFullscreen = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    cameraFullscreen.position.z = 5;

    rendererFullscreen = new THREE.WebGLRenderer({ antialias: true });
    rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    sceneFullscreen.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneFullscreen.add(directionalLight);

    updateFullscreenModel(0);
}

function updateFullscreenModel(index) {
    if (modelFullscreen) {
        sceneFullscreen.remove(modelFullscreen);
    }

    const geometry = new THREE.BoxGeometry(2, 1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: GPU_MODELS[index].color,
        specular: 0x050505,
        shininess: 100
    });
    modelFullscreen = new THREE.Mesh(geometry, material);
    modelFullscreen.rotation.x = 0.3;
    modelFullscreen.rotation.y = -0.5;
    sceneFullscreen.add(modelFullscreen);

    // Update specifications in the DOM
    const specsTitle = document.querySelector('.specs-title');
    const specsContent = document.querySelector('.specs-content');
    if (specsTitle && specsContent) {
        specsTitle.textContent = GPU_MODELS[index].name;
        specsContent.innerHTML = `
            <div class="spec-item">
                <span class="spec-label">CUDA Cores:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.cores}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Memory:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.memory}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Clock Speed:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.clock}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Memory Interface:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.interface}</span>
            </div>
        `;
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    models.forEach((model, index) => {
        if (model && isRotating[index]) {
            model.rotation.y += 0.005;
        }
    });
    
    if (modelFullscreen && document.getElementById('fullscreen-view').classList.contains('active')) {
        modelFullscreen.rotation.y += 0.005;
    }
    
    controls.forEach(control => control?.update());
    controlsFullscreen?.update();
    
    scenes.forEach((scene, index) => {
        renderers[index].render(scene, cameras[index]);
    });

    if (document.getElementById('fullscreen-view').classList.contains('active')) {
        rendererFullscreen.render(sceneFullscreen, cameraFullscreen);
    }
}

function openFullView(index) {
    currentModelIndex = index;
    const fullscreenView = document.getElementById('fullscreen-view');
    const containerFull = document.getElementById('model-container-full');
    
    updateFullscreenModel(index);
    fullscreenView.classList.add('active');
    
    if (!containerFull.hasChildNodes()) {
        containerFull.appendChild(rendererFullscreen.domElement);
        controlsFullscreen = new THREE.OrbitControls(cameraFullscreen, rendererFullscreen.domElement);
        controlsFullscreen.enableDamping = true;
        controlsFullscreen.dampingFactor = 0.05;
    }

    const aspect = window.innerWidth / (window.innerHeight * 0.6);
    cameraFullscreen.aspect = aspect;
    cameraFullscreen.updateProjectionMatrix();
    rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
}

function closeFullView() {
    document.getElementById('fullscreen-view').classList.remove('active');
}

window.addEventListener('resize', () => {
    if (document.getElementById('fullscreen-view').classList.contains('active')) {
        const aspect = window.innerWidth / (window.innerHeight * 0.6);
        cameraFullscreen.aspect = aspect;
        cameraFullscreen.updateProjectionMatrix();
        rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
    }
});

window.addEventListener('load', init);

function navigateToGPUPage() {
    window.location.href = 'gpu-page.html';
}

function initMainViews() {
    for (let i = 0; i < 3; i++) {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x374151);
        scenes.push(scene);

        const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
        camera.position.z = 5;
        cameras.push(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(250, 250);
        document.getElementById(`model-container${i > 0 ? i + 1 : ''}`).appendChild(renderer.domElement);
        renderers.push(renderer);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const control = new THREE.OrbitControls(camera, renderer.domElement);
        control.enableDamping = true;
        control.dampingFactor = 0.05;
        controls.push(control);

        const geometry = new THREE.BoxGeometry(2, 1, 3);
        const material = new THREE.MeshPhongMaterial({ 
            color: GPU_MODELS[i].color,
            specular: 0x050505,
            shininess: 100
        });
        const model = new THREE.Mesh(geometry, material);
        // Set initial angled position
        model.rotation.x = 0.3;
        model.rotation.y = -0.5;
        scene.add(model);
        models.push(model);
    }
}

function initFullscreenView() {
    sceneFullscreen = new THREE.Scene();
    sceneFullscreen.background = new THREE.Color(0x374151);

    const aspect = window.innerWidth / (window.innerHeight * 0.6);
    cameraFullscreen = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
    cameraFullscreen.position.z = 5;

    rendererFullscreen = new THREE.WebGLRenderer({ antialias: true });
    rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    sceneFullscreen.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneFullscreen.add(directionalLight);

    updateFullscreenModel(0);
}

function updateFullscreenModel(index) {
    if (modelFullscreen) {
        sceneFullscreen.remove(modelFullscreen);
    }

    const geometry = new THREE.BoxGeometry(2, 1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: GPU_MODELS[index].color,
        specular: 0x050505,
        shininess: 100
    });
    modelFullscreen = new THREE.Mesh(geometry, material);
    modelFullscreen.rotation.x = 0.3;
    modelFullscreen.rotation.y = -0.5;
    sceneFullscreen.add(modelFullscreen);

    // Update specifications in the DOM
    const specsTitle = document.querySelector('.specs-title');
    const specsContent = document.querySelector('.specs-content');
    if (specsTitle && specsContent) {
        specsTitle.textContent = GPU_MODELS[index].name;
        specsContent.innerHTML = `
            <div class="spec-item">
                <span class="spec-label">CUDA Cores:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.cores}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Memory:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.memory}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Clock Speed:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.clock}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Memory Interface:</span>
                <span class="spec-value">${GPU_MODELS[index].specs.interface}</span>
            </div>
        `;
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    models.forEach((model, index) => {
        if (model && isRotating[index]) {
            model.rotation.y += 0.005;
        }
    });
    
    if (modelFullscreen && document.getElementById('fullscreen-view').classList.contains('active')) {
        modelFullscreen.rotation.y += 0.005;
    }
    
    controls.forEach(control => control?.update());
    controlsFullscreen?.update();
    
    scenes.forEach((scene, index) => {
        renderers[index].render(scene, cameras[index]);
    });

    if (document.getElementById('fullscreen-view').classList.contains('active')) {
        rendererFullscreen.render(sceneFullscreen, cameraFullscreen);
    }
}

function openFullView(index) {
    currentModelIndex = index;
    const fullscreenView = document.getElementById('fullscreen-view');
    const containerFull = document.getElementById('model-container-full');
    
    updateFullscreenModel(index);
    fullscreenView.classList.add('active');
    
    if (!containerFull.hasChildNodes()) {
        containerFull.appendChild(rendererFullscreen.domElement);
        controlsFullscreen = new THREE.OrbitControls(cameraFullscreen, rendererFullscreen.domElement);
        controlsFullscreen.enableDamping = true;
        controlsFullscreen.dampingFactor = 0.05;
    }

    const aspect = window.innerWidth / (window.innerHeight * 0.6);
    cameraFullscreen.aspect = aspect;
    cameraFullscreen.updateProjectionMatrix();
    rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
}

function closeFullView() {
    document.getElementById('fullscreen-view').classList.remove('active');
}

window.addEventListener('resize', () => {
    if (document.getElementById('fullscreen-view').classList.contains('active')) {
        const aspect = window.innerWidth / (window.innerHeight * 0.6);
        cameraFullscreen.aspect = aspect;
        cameraFullscreen.updateProjectionMatrix();
        rendererFullscreen.setSize(window.innerWidth, window.innerHeight * 0.6);
    }
});

window.addEventListener('load', init);

function navigateToGPUPage() {
    window.location.href = 'gpu-page.html';
} 