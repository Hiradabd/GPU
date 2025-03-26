let scenes = [], cameras = [], renderers = [], controls = [], models = [];
let sceneFullscreen, cameraFullscreen, rendererFullscreen, controlsFullscreen, modelFullscreen;
let isRotating = [false, false];  // برای دو مدل اصلی
let currentModelIndex = 0; // Track which model is being viewed in fullscreen
let mainScene, mainCamera, mainRenderer, mainControls, mainModel;
let isMainRotating = false;

const GPU_MODELS = [
    // RTX 2060 models
    {
        name: "RTX 2060 Founders Edition",
        color: 0x60a5fa,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "-",
            powerUsage: "-",
            baseClock: "-"
        }
    },
    {
        name: "RTX 2060 ROG STRIX OC",
        color: 0xff4444,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "-",
            powerUsage: "-",
            baseClock: "-"
        }
    },
    {
        name: "RTX 2060 SUPRIM X",
        color: 0x44ff44,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "-",
            powerUsage: "-",
            baseClock: "-"
        }
    },
    // RTX 4090 models
    {
        name: "RTX 4090 Founders Edition",
        color: 0x60a5fa,
        specs: {
            memory: "24GB GDDR6X",
            releaseDate: "October 2022",
            powerUsage: "450W",
            baseClock: "2.23 GHz"
        }
    },
    {
        name: "RTX 4090 ROG STRIX OC",
        color: 0xff4444,
        specs: {
            memory: "24GB GDDR6X",
            releaseDate: "October 2022",
            powerUsage: "450W",
            baseClock: "2.61 GHz"
        }
    },
    {
        name: "RTX 4090 SUPRIM X",
        color: 0x44ff44,
        specs: {
            memory: "24GB GDDR6X",
            releaseDate: "October 2022",
            powerUsage: "450W",
            baseClock: "2.63 GHz"
        }
    }
];

function initMainView() {
    // Initialize main view
    mainScene = new THREE.Scene();
    mainScene.background = new THREE.Color(0x374151);

    mainCamera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    mainCamera.position.z = 5;

    mainRenderer = new THREE.WebGLRenderer({ antialias: true });
    mainRenderer.setSize(250, 250);
    document.getElementById('model-container').appendChild(mainRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    mainScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    mainScene.add(directionalLight);

    mainControls = new THREE.OrbitControls(mainCamera, mainRenderer.domElement);
    mainControls.enableDamping = true;
    mainControls.dampingFactor = 0.05;

    const geometry = new THREE.BoxGeometry(2, 1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x60a5fa,
        specular: 0x050505,
        shininess: 100
    });
    mainModel = new THREE.Mesh(geometry, material);
    mainModel.rotation.x = 0.3;
    mainModel.rotation.y = -0.5;
    mainScene.add(mainModel);

    // Add hover effect
    const modelWrapper = document.querySelector('.model-info-wrapper');
    modelWrapper.addEventListener('mouseenter', () => {
        isMainRotating = true;
    });
    modelWrapper.addEventListener('mouseleave', () => {
        isMainRotating = false;
    });
}

function init() {
    // Initialize main models (2060 and 4090)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x374151);
    scenes.push(scene);

    const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera.position.z = 5;
    cameras.push(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(250, 250);
    document.getElementById('model-container-2060').appendChild(renderer.domElement);
    renderers.push(renderer);

    // RTX 2060
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
        color: 0x60a5fa,  // آبی برای فوندرز
        specular: 0x050505,
        shininess: 100
    });
    const model = new THREE.Mesh(geometry, material);
    model.rotation.x = 0.3;
    model.rotation.y = -0.5;
    scene.add(model);
    models.push(model);

    // RTX 4090 با همان رنگ‌های مشخص شده
    const scene4090 = new THREE.Scene();
    scene4090.background = new THREE.Color(0x374151);
    scenes.push(scene4090);

    const camera4090 = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera4090.position.z = 5;
    cameras.push(camera4090);

    const renderer4090 = new THREE.WebGLRenderer({ antialias: true });
    renderer4090.setSize(250, 250);
    document.getElementById('model-container').appendChild(renderer4090.domElement);
    renderers.push(renderer4090);

    const ambientLight4090 = new THREE.AmbientLight(0xffffff, 0.7);
    scene4090.add(ambientLight4090);
    const directionalLight4090 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight4090.position.set(5, 5, 5);
    scene4090.add(directionalLight4090);

    const control4090 = new THREE.OrbitControls(camera4090, renderer4090.domElement);
    control4090.enableDamping = true;
    control4090.dampingFactor = 0.05;
    controls.push(control4090);

    const model4090 = new THREE.Mesh(geometry, material);
    model4090.rotation.x = 0.3;
    model4090.rotation.y = -0.5;
    scene4090.add(model4090);
    models.push(model4090);

    initFullscreenView();
    animate();
    setupHoverListeners();
}

function setupHoverListeners() {
    const modelWrappers = document.querySelectorAll('.model-info-wrapper');
    
    modelWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('mouseenter', () => {
            isRotating[index] = true;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            isRotating[index] = false;
            if (models[index]) {
                models[index].rotation.x = 0.3;
                models[index].rotation.y = -0.5;
            }
        });
    });
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

function updateFullscreenModel(index, isRTX2060 = false) {
    if (modelFullscreen) {
        sceneFullscreen.remove(modelFullscreen);
    }

    const colors = [0x60a5fa, 0xff4444, 0x44ff44]; // آبی، قرمز، سبز
    const modelIndex = isRTX2060 ? 0 : index + 3; // برای 2060 همیشه از مدل اول استفاده میکنیم
    const geometry = new THREE.BoxGeometry(2, 1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: isRTX2060 ? 0x60a5fa : colors[index], // 2060 همیشه آبی باشه
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
        specsTitle.textContent = GPU_MODELS[modelIndex].name;
        specsContent.innerHTML = `
            <div class="spec-item">
                <span class="spec-label">Memory:</span>
                <span class="spec-value">${GPU_MODELS[modelIndex].specs.memory}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Release Date:</span>
                <span class="spec-value">${GPU_MODELS[modelIndex].specs.releaseDate}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Power Usage (TDP):</span>
                <span class="spec-value">${GPU_MODELS[modelIndex].specs.powerUsage}</span>
            </div>
            <div class="spec-item">
                <span class="spec-label">Base Clock:</span>
                <span class="spec-value">${GPU_MODELS[modelIndex].specs.baseClock}</span>
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
        renderers[index]?.render(scene, cameras[index]);
    });

    if (document.getElementById('fullscreen-view').classList.contains('active')) {
        rendererFullscreen.render(sceneFullscreen, cameraFullscreen);
    }
}

function openFullView(index, isRTX2060 = false) {
    const fullscreenView = document.getElementById('fullscreen-view');
    const containerFull = document.getElementById('model-container-full');
    
    updateFullscreenModel(index, isRTX2060);
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

function backToMainView() {
    document.getElementById('variants-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'flex';
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
    const variantContainers = ['model-container1', 'model-container2', 'model-container3'];
    const colors = [0x60a5fa, 0xff4444, 0x44ff44]; // آبی، قرمز، سبز
    
    variantContainers.forEach((containerId, index) => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x374151);
        scenes.push(scene);

        const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
        camera.position.z = 5;
        cameras.push(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(250, 250);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        }
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
            color: colors[index],
            specular: 0x050505,
            shininess: 100
        });
        const model = new THREE.Mesh(geometry, material);
        model.rotation.x = 0.3;
        model.rotation.y = -0.5;
        scene.add(model);
        models.push(model);
    });
}

// اضافه کردن setupHoverListeners برای variants
function setupVariantHoverListeners() {
    const variantWrappers = document.querySelectorAll('#variants-view .model-info-wrapper');
    
    variantWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('mouseenter', () => {
            isRotating[index] = true;
        });
        
        wrapper.addEventListener('mouseleave', () => {
            isRotating[index] = false;
            if (models[index]) {
                models[index].rotation.x = 0.3;
                models[index].rotation.y = -0.5;
            }
        });
    });
}

// آپدیت تابع showVariants
function showVariants() {
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('variants-view').style.display = 'flex';
    window.scrollTo(0, 0);
    
    initMainViews();
    setupVariantHoverListeners();
}

function handleBack() {
    // اگر در نمای variants هستیم
    if (document.getElementById('variants-view').style.display === 'flex') {
        backToMainView();
    }
    // اگر در نمای اصلی هستیم
    else {
        window.location.href = 'brands.html';
    }
}

// اضافه کردن تابع جدید برای نمایش variants مدل 2060
function showVariants2060() {
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('variants-view-2060').style.display = 'flex';
    window.scrollTo(0, 0);
    
    initMainViews2060();
    setupVariantHoverListeners();
}

// تابع جدید برای مقداردهی اولیه مدل‌های 2060
function initMainViews2060() {
    const variantContainers = ['model-container-2060-1', 'model-container-2060-2', 'model-container-2060-3'];
    const colors = [0x60a5fa, 0xff4444, 0x44ff44]; // آبی، قرمز، سبز
    
    variantContainers.forEach((containerId, index) => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x374151);
        scenes.push(scene);

        const camera = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
        camera.position.z = 5;
        cameras.push(camera);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(250, 250);
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            container.appendChild(renderer.domElement);
        }
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
            color: colors[index],
            specular: 0x050505,
            shininess: 100
        });
        const model = new THREE.Mesh(geometry, material);
        model.rotation.x = 0.3;
        model.rotation.y = -0.5;
        scene.add(model);
        models.push(model);
    });
} 