let scenes = [], cameras = [], renderers = [], controls = [], models = [];
let sceneFullscreen, cameraFullscreen, rendererFullscreen, controlsFullscreen, modelFullscreen;
let isRotating = Array(25).fill(false);  // تغییر از 20 به 25
let currentModelIndex = 0; // Track which model is being viewed in fullscreen
let mainScene, mainCamera, mainRenderer, mainControls, mainModel;
let isMainRotating = false;

const GPU_MODELS = [
    // RTX 2060 models
    {
        name: "RTX 2060",
        color: 0x60a5fa,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "January 7, 2019",
            powerUsage: "160 W",
            baseClock: "1,365 MHz"
        }
    },
    {
        name: "RTX 2060 ROG STRIX OC",
        color: 0xff4444,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "January 7, 2019",
            powerUsage: "160 W",
            baseClock: "1,365 MHz"
        }
    },
    {
        name: "RTX 2060 SUPRIM X",
        color: 0x44ff44,
        specs: {
            memory: "6GB GDDR6",
            releaseDate: "January 7, 2019",
            powerUsage: "160 W",
            baseClock: "1,365 MHz"
        }
    },
    {
        name: "RTX 2060 Super",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "July 9, 2019",
            powerUsage: "175 W",
            baseClock: "1,470 MHz"
        }
    },
    {
        name: "RTX 2070",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "October 17, 2018",
            powerUsage: "175 W",
            baseClock: "1,410 MHz"
        }
    },
    {
        name: "RTX 2070 Super",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "July 9, 2019",
            powerUsage: "215 W",
            baseClock: "1,605 MHz"
        }
    },
    {
        name: "RTX 2080",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "September 20, 2018",
            powerUsage: "215 W",
            baseClock: "1,515 MHz"
        }
    },
    {
        name: "RTX 2080 Super",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "July 23, 2019",
            powerUsage: "250 W",
            baseClock: "1,650 MHz"
        }
    },
    {
        name: "RTX 2080 Ti",
        color: 0x60a5fa,
        specs: {
            memory: "11GB GDDR6",
            releaseDate: "September 20, 2018",
            powerUsage: "250 W",
            baseClock: "1,350 MHz"
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
    },
    // RTX 3050
    {
        name: "RTX 3050",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "January 27, 2022",
            powerUsage: "130 W",
            baseClock: "1,552 MHz"
        }
    },
    // RTX 3060
    {
        name: "RTX 3060",
        color: 0x60a5fa,
        specs: {
            memory: "12GB GDDR6",
            releaseDate: "February 25, 2021",
            powerUsage: "170 W",
            baseClock: "1,320 MHz"
        }
    },
    // RTX 3060 Ti
    {
        name: "RTX 3060 Ti",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "December 2, 2020",
            powerUsage: "200 W",
            baseClock: "1,410 MHz"
        }
    },
    // RTX 3070
    {
        name: "RTX 3070",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6",
            releaseDate: "October 29, 2020",
            powerUsage: "220 W",
            baseClock: "1,500 MHz"
        }
    },
    // RTX 3070 Ti
    {
        name: "RTX 3070 Ti",
        color: 0x60a5fa,
        specs: {
            memory: "8GB GDDR6X",
            releaseDate: "June 10, 2021",
            powerUsage: "290 W",
            baseClock: "1,575 MHz"
        }
    },
    // RTX 3080
    {
        name: "RTX 3080",
        color: 0x60a5fa,
        specs: {
            memory: "10GB GDDR6X",
            releaseDate: "September 17, 2020",
            powerUsage: "320 W",
            baseClock: "1,440 MHz"
        }
    },
    // RTX 3080 Ti
    {
        name: "RTX 3080 Ti",
        color: 0x60a5fa,
        specs: {
            memory: "12GB GDDR6X",
            releaseDate: "June 3, 2021",
            powerUsage: "350 W",
            baseClock: "1,365 MHz"
        }
    },
    // RTX 3090
    {
        name: "RTX 3090",
        color: 0x60a5fa,
        specs: {
            memory: "24GB GDDR6X",
            releaseDate: "September 24, 2020",
            powerUsage: "350 W",
            baseClock: "1,395 MHz"
        }
    },
    // RTX 3090 Ti
    {
        name: "RTX 3090 Ti",
        color: 0x60a5fa,
        specs: {
            memory: "24GB GDDR6X",
            releaseDate: "March 29, 2022",
            powerUsage: "450 W",
            baseClock: "1,560 MHz"
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
    // اگر در صفحه لاگین نیستیم، وضعیت احراز هویت را چک کن
    if (!window.location.pathname.includes('index.html')) {
        checkAuth();
    }
    
    // Add this line at the beginning of init function
    document.title = "RTX Models";
    
    // Initialize main models (2060, 2060 Super, and 4090)
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

    // RTX 2060 - جایگزینی مکعب با مدل Sketchfab
    const container2060 = document.getElementById('model-container-2060');
    if (container2060) {
        container2060.innerHTML = `
            <iframe
                title="GeForce RTX 2060 Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/ce2ad74ed4254d79830f94ec966234c9/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);


    const container2060Super = document.getElementById('model-container-2060-super');
    if (container2060Super) {
        container2060Super.innerHTML = `
            <iframe
                title="GeForce RTX 2060 Super Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/effa97d28abc492698a5cc0a8a33a131/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }


    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);


    const container2070 = document.getElementById('model-container-2070');
    if (container2070) {
        container2070.innerHTML = `
            <iframe
                title="GeForce RTX 2070 Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/13c2a317acd6486fa521624c31649788/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // حذف کد مربوط به scene و model برای RTX 2070 چون دیگر نیازی نیست
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 2070 Super - جایگزینی مکعب با مدل Sketchfab
    const container2070Super = document.getElementById('model-container-2070-super');
    if (container2070Super) {
        container2070Super.innerHTML = `
            <iframe
                title="GeForce RTX 2070 Super Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/3b892a8e95204ee99b8ce13352925b21/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // حذف کد مربوط به scene و model برای RTX 2070 Super چون دیگر نیازی نیست
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 2080 - جایگزینی مکعب با مدل Sketchfab
    const container2080 = document.getElementById('model-container-2080');
    if (container2080) {
        container2080.innerHTML = `
            <iframe
                title="GeForce RTX 2080 Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/8a03a4f1d0734d479e1fc00ed540d28e/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // حذف کد مربوط به scene و model برای RTX 2080 چون دیگر نیازی نیست
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 2080 Super - جایگزینی مکعب با مدل Sketchfab
    const container2080Super = document.getElementById('model-container-2080-super');
    if (container2080Super) {
        container2080Super.innerHTML = `
            <iframe
                title="GeForce RTX 2080 Super Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/84e5415a5cb54409b7b0068037dcd884/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // حذف کد مربوط به scene و model برای RTX 2080 Super چون دیگر نیازی نیست
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 2080 Ti - جایگزینی مکعب با مدل Sketchfab
    const container2080Ti = document.getElementById('model-container-2080-ti');
    if (container2080Ti) {
        container2080Ti.innerHTML = `
            <iframe
                title="GeForce RTX 2080 Ti Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/fcfffc0cdb784c77b226d4e280bc33b0/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // حذف کد مربوط به scene و model برای RTX 2080 Ti چون دیگر نیازی نیست
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 4090
    const container4090 = document.getElementById('model-container-4090');
    if (container4090) {
        container4090.innerHTML = `
            <iframe
                title="GeForce RTX 4090 Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/d417c0b4c3bd475eb9669afcd14a2601/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // Since we're using Sketchfab model, we don't need the Three.js scene setup for 4090
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // RTX 3050
    const scene3050 = new THREE.Scene();
    scene3050.background = new THREE.Color(0x374151);
    scenes.push(scene3050);

    const camera3050 = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3050.position.z = 5;
    cameras.push(camera3050);

    const renderer3050 = new THREE.WebGLRenderer({ antialias: true });
    renderer3050.setSize(250, 250);
    document.getElementById('model-container-3050').appendChild(renderer3050.domElement);
    renderers.push(renderer3050);

    const ambientLight3050 = new THREE.AmbientLight(0xffffff, 0.7);
    scene3050.add(ambientLight3050);
    const directionalLight3050 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3050.position.set(5, 5, 5);
    scene3050.add(directionalLight3050);

    const control3050 = new THREE.OrbitControls(camera3050, renderer3050.domElement);
    control3050.enableDamping = true;
    control3050.dampingFactor = 0.05;
    controls.push(control3050);

    const model3050 = new THREE.Mesh(geometry, material);
    model3050.rotation.x = 0.3;
    model3050.rotation.y = -0.5;
    scene3050.add(model3050);
    models.push(model3050);

    // RTX 3060
    const scene3060 = new THREE.Scene();
    scene3060.background = new THREE.Color(0x374151);
    scenes.push(scene3060);

    const camera3060 = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3060.position.z = 5;
    cameras.push(camera3060);

    const renderer3060 = new THREE.WebGLRenderer({ antialias: true });
    renderer3060.setSize(250, 250);
    document.getElementById('model-container-3060').appendChild(renderer3060.domElement);
    renderers.push(renderer3060);

    const ambientLight3060 = new THREE.AmbientLight(0xffffff, 0.7);
    scene3060.add(ambientLight3060);
    const directionalLight3060 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3060.position.set(5, 5, 5);
    scene3060.add(directionalLight3060);

    const control3060 = new THREE.OrbitControls(camera3060, renderer3060.domElement);
    control3060.enableDamping = true;
    control3060.dampingFactor = 0.05;
    controls.push(control3060);

    const model3060 = new THREE.Mesh(geometry, material);
    model3060.rotation.x = 0.3;
    model3060.rotation.y = -0.5;
    scene3060.add(model3060);
    models.push(model3060);

    // RTX 3060 Ti
    const scene3060Ti = new THREE.Scene();
    scene3060Ti.background = new THREE.Color(0x374151);
    scenes.push(scene3060Ti);

    const camera3060Ti = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3060Ti.position.z = 5;
    cameras.push(camera3060Ti);

    const renderer3060Ti = new THREE.WebGLRenderer({ antialias: true });
    renderer3060Ti.setSize(250, 250);
    document.getElementById('model-container-3060ti').appendChild(renderer3060Ti.domElement);
    renderers.push(renderer3060Ti);

    const ambientLight3060Ti = new THREE.AmbientLight(0xffffff, 0.7);
    scene3060Ti.add(ambientLight3060Ti);
    const directionalLight3060Ti = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3060Ti.position.set(5, 5, 5);
    scene3060Ti.add(directionalLight3060Ti);

    const control3060Ti = new THREE.OrbitControls(camera3060Ti, renderer3060Ti.domElement);
    control3060Ti.enableDamping = true;
    control3060Ti.dampingFactor = 0.05;
    controls.push(control3060Ti);

    const model3060Ti = new THREE.Mesh(geometry, material);
    model3060Ti.rotation.x = 0.3;
    model3060Ti.rotation.y = -0.5;
    scene3060Ti.add(model3060Ti);
    models.push(model3060Ti);

    // RTX 3050
    const modelWrapper3050 = document.querySelector('#model-container-3050').parentElement;
    modelWrapper3050.addEventListener('mouseenter', () => {
        isRotating[8] = true;  // تغییر به ایندکس 8
    });
    modelWrapper3050.addEventListener('mouseleave', () => {
        isRotating[8] = false;
        models[8].rotation.x = 0.3;
        models[8].rotation.y = -0.5;
    });

    // RTX 3060
    const modelWrapper3060 = document.querySelector('#model-container-3060').parentElement;
    modelWrapper3060.addEventListener('mouseenter', () => {
        isRotating[9] = true;  // تغییر به ایندکس 9
    });
    modelWrapper3060.addEventListener('mouseleave', () => {
        isRotating[9] = false;
        models[9].rotation.x = 0.3;
        models[9].rotation.y = -0.5;
    });

    // RTX 3060 Ti
    const modelWrapper3060Ti = document.querySelector('#model-container-3060ti').parentElement;
    modelWrapper3060Ti.addEventListener('mouseenter', () => {
        isRotating[10] = true;  // تغییر به ایندکس 10
    });
    modelWrapper3060Ti.addEventListener('mouseleave', () => {
        isRotating[10] = false;
        models[10].rotation.x = 0.3;
        models[10].rotation.y = -0.5;
    });

    // RTX 3070
    const scene3070 = new THREE.Scene();
    scene3070.background = new THREE.Color(0x374151);
    scenes.push(scene3070);

    const camera3070 = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3070.position.z = 5;
    cameras.push(camera3070);

    const renderer3070 = new THREE.WebGLRenderer({ antialias: true });
    renderer3070.setSize(250, 250);
    document.getElementById('model-container-3070').appendChild(renderer3070.domElement);
    renderers.push(renderer3070);

    const ambientLight3070 = new THREE.AmbientLight(0xffffff, 0.7);
    scene3070.add(ambientLight3070);
    const directionalLight3070 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3070.position.set(5, 5, 5);
    scene3070.add(directionalLight3070);

    const control3070 = new THREE.OrbitControls(camera3070, renderer3070.domElement);
    control3070.enableDamping = true;
    control3070.dampingFactor = 0.05;
    controls.push(control3070);

    const model3070 = new THREE.Mesh(geometry, material);
    model3070.rotation.x = 0.3;
    model3070.rotation.y = -0.5;
    scene3070.add(model3070);
    models.push(model3070);

    // RTX 3070 Ti
    const scene3070Ti = new THREE.Scene();
    scene3070Ti.background = new THREE.Color(0x374151);
    scenes.push(scene3070Ti);

    const camera3070Ti = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3070Ti.position.z = 5;
    cameras.push(camera3070Ti);

    const renderer3070Ti = new THREE.WebGLRenderer({ antialias: true });
    renderer3070Ti.setSize(250, 250);
    document.getElementById('model-container-3070ti').appendChild(renderer3070Ti.domElement);
    renderers.push(renderer3070Ti);

    const ambientLight3070Ti = new THREE.AmbientLight(0xffffff, 0.7);
    scene3070Ti.add(ambientLight3070Ti);
    const directionalLight3070Ti = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3070Ti.position.set(5, 5, 5);
    scene3070Ti.add(directionalLight3070Ti);

    const control3070Ti = new THREE.OrbitControls(camera3070Ti, renderer3070Ti.domElement);
    control3070Ti.enableDamping = true;
    control3070Ti.dampingFactor = 0.05;
    controls.push(control3070Ti);

    const model3070Ti = new THREE.Mesh(geometry, material);
    model3070Ti.rotation.x = 0.3;
    model3070Ti.rotation.y = -0.5;
    scene3070Ti.add(model3070Ti);
    models.push(model3070Ti);

    // RTX 3070
    const modelWrapper3070 = document.querySelector('#model-container-3070').parentElement;
    modelWrapper3070.addEventListener('mouseenter', () => {
        isRotating[11] = true;  // تغییر به ایندکس 11
    });
    modelWrapper3070.addEventListener('mouseleave', () => {
        isRotating[11] = false;
        model3070.rotation.x = 0.3;
        model3070.rotation.y = -0.5;
    });

    // RTX 3070 Ti
    const modelWrapper3070Ti = document.querySelector('#model-container-3070ti').parentElement;
    modelWrapper3070Ti.addEventListener('mouseenter', () => {
        isRotating[12] = true;  // تغییر به ایندکس 12
    });
    modelWrapper3070Ti.addEventListener('mouseleave', () => {
        isRotating[12] = false;
        model3070Ti.rotation.x = 0.3;
        model3070Ti.rotation.y = -0.5;
    });

    // RTX 3080
    const scene3080 = new THREE.Scene();
    scene3080.background = new THREE.Color(0x374151);
    scenes.push(scene3080);

    const camera3080 = new THREE.PerspectiveCamera(75, 250 / 250, 0.1, 1000);
    camera3080.position.z = 5;
    cameras.push(camera3080);

    const renderer3080 = new THREE.WebGLRenderer({ antialias: true });
    renderer3080.setSize(250, 250);
    document.getElementById('model-container-3080').appendChild(renderer3080.domElement);
    renderers.push(renderer3080);

    const ambientLight3080 = new THREE.AmbientLight(0xffffff, 0.7);
    scene3080.add(ambientLight3080);
    const directionalLight3080 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight3080.position.set(5, 5, 5);
    scene3080.add(directionalLight3080);

    const control3080 = new THREE.OrbitControls(camera3080, renderer3080.domElement);
    control3080.enableDamping = true;
    control3080.dampingFactor = 0.05;
    controls.push(control3080);

    const model3080 = new THREE.Mesh(geometry, material);
    model3080.rotation.x = 0.3;
    model3080.rotation.y = -0.5;
    scene3080.add(model3080);
    models.push(model3080);

    // RTX 3080
    const modelWrapper3080 = document.querySelector('#model-container-3080').parentElement;
    modelWrapper3080.addEventListener('mouseenter', () => {
        isRotating[13] = true;  // تغییر به ایندکس 13
    });
    modelWrapper3080.addEventListener('mouseleave', () => {
        isRotating[13] = false;
        model3080.rotation.x = 0.3;
        model3080.rotation.y = -0.5;
    });

    // RTX 3080 Ti
    const modelWrapper3080Ti = document.querySelector('#model-container-3080ti').parentElement;
    modelWrapper3080Ti.addEventListener('mouseenter', () => {
        isRotating[14] = true;  // تغییر به ایندکس 14
    });
    modelWrapper3080Ti.addEventListener('mouseleave', () => {
        isRotating[14] = false;
        model3080Ti.rotation.x = 0.3;
        model3080Ti.rotation.y = -0.5;
    });

    // RTX 3090
    const modelWrapper3090 = document.querySelector('#model-container-3090').parentElement;
    modelWrapper3090.addEventListener('mouseenter', () => {
        isRotating[15] = true;  // تغییر به ایندکس 15
    });
    modelWrapper3090.addEventListener('mouseleave', () => {
        isRotating[15] = false;
        model3090.rotation.x = 0.3;
        model3090.rotation.y = -0.5;
    });

    // RTX 3090 Ti
    const modelWrapper3090Ti = document.querySelector('#model-container-3090ti').parentElement;
    modelWrapper3090Ti.addEventListener('mouseenter', () => {
        isRotating[16] = true;  // تغییر به ایندکس 16
    });
    modelWrapper3090Ti.addEventListener('mouseleave', () => {
        isRotating[16] = false;
        model3090Ti.rotation.x = 0.3;
        model3090Ti.rotation.y = -0.5;
    });

    initFullscreenView();
    animate();
    setupHoverListeners();
}

function setupHoverListeners() {
    // RTX 2060 دیگر نیازی به hover effect ندارد چون مدل Sketchfab خودش انیمیشن دارد
    const modelWrapper2060 = document.querySelector('#model-container-2060').parentElement;
    modelWrapper2060.addEventListener('mouseenter', () => {
        // می‌توانید اینجا کد دیگری اضافه کنید اگر می‌خواهید
    });
    modelWrapper2060.addEventListener('mouseleave', () => {
        // می‌توانید اینجا کد دیگری اضافه کنید اگر می‌خواهید
    });

    // RTX 2060 Super
    const modelWrapper2060Super = document.querySelector('#model-container-2060-super').parentElement;
    modelWrapper2060Super.addEventListener('mouseenter', () => {
        isRotating[1] = true;
    });
    modelWrapper2060Super.addEventListener('mouseleave', () => {
        isRotating[1] = false;
        models[1].rotation.x = 0.3;
        models[1].rotation.y = -0.5;
    });

    // RTX 2070
    const modelWrapper2070 = document.querySelector('#model-container-2070').parentElement;
    modelWrapper2070.addEventListener('mouseenter', () => {
        isRotating[2] = true;
    });
    modelWrapper2070.addEventListener('mouseleave', () => {
        isRotating[2] = false;
        models[2].rotation.x = 0.3;
        models[2].rotation.y = -0.5;
    });

    // RTX 2070 Super
    const modelWrapper2070Super = document.querySelector('#model-container-2070-super').parentElement;
    modelWrapper2070Super.addEventListener('mouseenter', () => {
        isRotating[3] = true;
    });
    modelWrapper2070Super.addEventListener('mouseleave', () => {
        isRotating[3] = false;
        models[3].rotation.x = 0.3;
        models[3].rotation.y = -0.5;
    });

    // RTX 2080
    const modelWrapper2080 = document.querySelector('#model-container-2080').parentElement;
    modelWrapper2080.addEventListener('mouseenter', () => {
        isRotating[4] = true;
    });
    modelWrapper2080.addEventListener('mouseleave', () => {
        isRotating[4] = false;
        models[4].rotation.x = 0.3;
        models[4].rotation.y = -0.5;
    });

    // RTX 2080 Super
    const modelWrapper2080Super = document.querySelector('#model-container-2080-super').parentElement;
    modelWrapper2080Super.addEventListener('mouseenter', () => {
        isRotating[5] = true;
    });
    modelWrapper2080Super.addEventListener('mouseleave', () => {
        isRotating[5] = false;
        models[5].rotation.x = 0.3;
        models[5].rotation.y = -0.5;
    });

    // RTX 2080 Ti
    const modelWrapper2080Ti = document.querySelector('#model-container-2080-ti').parentElement;
    modelWrapper2080Ti.addEventListener('mouseenter', () => {
        isRotating[6] = true;
    });
    modelWrapper2080Ti.addEventListener('mouseleave', () => {
        isRotating[6] = false;
        models[6].rotation.x = 0.3;
        models[6].rotation.y = -0.5;
    });

    // RTX 3050
    const modelWrapper3050 = document.querySelector('#model-container-3050').parentElement;
    modelWrapper3050.addEventListener('mouseenter', () => {
        isRotating[8] = true;  // تغییر به ایندکس 8
    });
    modelWrapper3050.addEventListener('mouseleave', () => {
        isRotating[8] = false;
        models[8].rotation.x = 0.3;
        models[8].rotation.y = -0.5;
    });

    // RTX 3060
    const modelWrapper3060 = document.querySelector('#model-container-3060').parentElement;
    modelWrapper3060.addEventListener('mouseenter', () => {
        isRotating[9] = true;  // تغییر به ایندکس 9
    });
    modelWrapper3060.addEventListener('mouseleave', () => {
        isRotating[9] = false;
        models[9].rotation.x = 0.3;
        models[9].rotation.y = -0.5;
    });

    // RTX 3060 Ti
    const modelWrapper3060Ti = document.querySelector('#model-container-3060ti').parentElement;
    modelWrapper3060Ti.addEventListener('mouseenter', () => {
        isRotating[10] = true;  // تغییر به ایندکس 10
    });
    modelWrapper3060Ti.addEventListener('mouseleave', () => {
        isRotating[10] = false;
        models[10].rotation.x = 0.3;
        models[10].rotation.y = -0.5;
    });

    // RTX 3070
    const modelWrapper3070 = document.querySelector('#model-container-3070').parentElement;
    modelWrapper3070.addEventListener('mouseenter', () => {
        isRotating[11] = true;  // تغییر به ایندکس 11
    });
    modelWrapper3070.addEventListener('mouseleave', () => {
        isRotating[11] = false;
        model3070.rotation.x = 0.3;
        model3070.rotation.y = -0.5;
    });

    // RTX 3070 Ti
    const modelWrapper3070Ti = document.querySelector('#model-container-3070ti').parentElement;
    modelWrapper3070Ti.addEventListener('mouseenter', () => {
        isRotating[12] = true;  // تغییر به ایندکس 12
    });
    modelWrapper3070Ti.addEventListener('mouseleave', () => {
        isRotating[12] = false;
        model3070Ti.rotation.x = 0.3;
        model3070Ti.rotation.y = -0.5;
    });

    // RTX 3080
    const modelWrapper3080 = document.querySelector('#model-container-3080').parentElement;
    modelWrapper3080.addEventListener('mouseenter', () => {
        isRotating[13] = true;  // تغییر به ایندکس 13
    });
    modelWrapper3080.addEventListener('mouseleave', () => {
        isRotating[13] = false;
        model3080.rotation.x = 0.3;
        model3080.rotation.y = -0.5;
    });

    // RTX 3080 Ti
    const modelWrapper3080Ti = document.querySelector('#model-container-3080ti').parentElement;
    modelWrapper3080Ti.addEventListener('mouseenter', () => {
        isRotating[14] = true;  // تغییر به ایندکس 14
    });
    modelWrapper3080Ti.addEventListener('mouseleave', () => {
        isRotating[14] = false;
        model3080Ti.rotation.x = 0.3;
        model3080Ti.rotation.y = -0.5;
    });

    // RTX 3090
    const modelWrapper3090 = document.querySelector('#model-container-3090').parentElement;
    modelWrapper3090.addEventListener('mouseenter', () => {
        isRotating[15] = true;  // تغییر به ایندکس 15
    });
    modelWrapper3090.addEventListener('mouseleave', () => {
        isRotating[15] = false;
        model3090.rotation.x = 0.3;
        model3090.rotation.y = -0.5;
    });

    // RTX 3090 Ti
    const modelWrapper3090Ti = document.querySelector('#model-container-3090ti').parentElement;
    modelWrapper3090Ti.addEventListener('mouseenter', () => {
        isRotating[16] = true;  // تغییر به ایندکس 16
    });
    modelWrapper3090Ti.addEventListener('mouseleave', () => {
        isRotating[16] = false;
        model3090Ti.rotation.x = 0.3;
        model3090Ti.rotation.y = -0.5;
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
    const geometry = new THREE.BoxGeometry(2, 1, 3);
    const material = new THREE.MeshPhongMaterial({ 
        color: isRTX2060 ? 0x60a5fa : colors[index],
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
        let title;
        if (isRTX2060) {
            // برای مدل‌های سری 20
            switch(index) {
                case 0:
                    title = "RTX 2060 Specifications";
                    break;
                case 1:
                    title = "RTX 2060 Super Specifications";
                    break;
                case 2:
                    title = "RTX 2070 Specifications";
                    break;
                case 3:
                    title = "RTX 2070 Super Specifications";
                    break;
                case 4:
                    title = "RTX 2080 Specifications";
                    break;
                case 5:
                    title = "RTX 2080 Super Specifications";
                    break;
                case 6:
                    title = "RTX 2080 Ti Specifications";
                    break;
                default:
                    title = "RTX 2060 Specifications";
            }
            specsContent.innerHTML = `
                <div class="spec-item">
                    <span class="spec-label">Memory:</span>
                    <span class="spec-value">${GPU_MODELS[index].specs.memory}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Release Date:</span>
                    <span class="spec-value">${GPU_MODELS[index].specs.releaseDate}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Power Usage (TDP):</span>
                    <span class="spec-value">${GPU_MODELS[index].specs.powerUsage}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Base Clock:</span>
                    <span class="spec-value">${GPU_MODELS[index].specs.baseClock}</span>
                </div>
            `;
        } else {
            // برای مدل‌های RTX 4090
            switch(index) {
                case 0:
                    title = "RTX 4090 Founders Edition Specifications";
                    break;
                case 1:
                    title = "RTX 4090 ROG STRIX OC Specifications";
                    break;
                case 2:
                    title = "RTX 4090 SUPRIM X Specifications";
                    break;
                default:
                    title = "RTX 4090 Specifications";
            }
            specsContent.innerHTML = `
                <div class="spec-item">
                    <span class="spec-label">Memory:</span>
                    <span class="spec-value">${GPU_MODELS[index + 9].specs.memory}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Release Date:</span>
                    <span class="spec-value">${GPU_MODELS[index + 9].specs.releaseDate}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Power Usage (TDP):</span>
                    <span class="spec-value">${GPU_MODELS[index + 9].specs.powerUsage}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Base Clock:</span>
                    <span class="spec-value">${GPU_MODELS[index + 9].specs.baseClock}</span>
                </div>
            `;
        }
        
        specsTitle.textContent = title;
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
    
    controls.forEach((control, index) => {
        if (control && scenes[index] && cameras[index] && renderers[index]) {
            control.update();
            renderers[index].render(scenes[index], cameras[index]);
        }
    });

    if (document.getElementById('fullscreen-view').classList.contains('active') && !document.querySelector('#model-container-full iframe')) {
        rendererFullscreen.render(sceneFullscreen, cameraFullscreen);
    }
}

function openFullView(index, isRTX2060 = false) {
    const fullscreenView = document.getElementById('fullscreen-view');
    const containerFull = document.getElementById('model-container-full');
    
    if ((isRTX2060 && index === 0) || (isRTX2060 && index === 1) || (isRTX2060 && index === 2) || (isRTX2060 && index === 3) || (isRTX2060 && index === 4) || (isRTX2060 && index === 5) || (isRTX2060 && index === 6)) {
        // نمایش مدل Sketchfab در حالت fullscreen
        let modelUrl;
        switch(index) {
            case 0:
                modelUrl = "ce2ad74ed4254d79830f94ec966234c9";  // RTX 2060
                break;
            case 1:
                modelUrl = "effa97d28abc492698a5cc0a8a33a131";  // RTX 2060 Super
                break;
            case 2:
                modelUrl = "13c2a317acd6486fa521624c31649788";  // RTX 2070
                break;
            case 3:
                modelUrl = "3b892a8e95204ee99b8ce13352925b21";  // RTX 2070 Super
                break;
            case 4:
                modelUrl = "8a03a4f1d0734d479e1fc00ed540d28e";  // RTX 2080
                break;
            case 5:
                modelUrl = "84e5415a5cb54409b7b0068037dcd884";  // RTX 2080 Super
                break;
            case 6:
                modelUrl = "fcfffc0cdb784c77b226d4e280bc33b0";  // RTX 2080 Ti
                break;
        }
            
        containerFull.innerHTML = `
            <iframe
                title="GeForce RTX ${index === 0 ? '2060' : index === 1 ? '2060 Super' : index === 2 ? '2070' : index === 3 ? '2070 Super' : index === 4 ? '2080' : '2080'} Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/${modelUrl}/embed?autostart=1&ui_controls=1&ui_infos=1"
                style="width: 100%; height: 100%;"
            ></iframe>
        `;
    } else {
        updateFullscreenModel(index, isRTX2060);
    }
    
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
    
    // Set up Founders Edition model with Sketchfab
    const container1 = document.getElementById('model-container1');
    if (container1) {
        container1.innerHTML = `
            <iframe
                title="GeForce RTX 4090 Founders Edition"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/d417c0b4c3bd475eb9669afcd14a2601/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }
    
    // Push null values for the first model since we're using Sketchfab
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // Set up ROG STRIX model with Sketchfab
    const container2 = document.getElementById('model-container2');
    if (container2) {
        container2.innerHTML = `
            <iframe
                title="ASUS ROG GeForce RTX 4090"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/6f527569f14b4efc94c7072842bd41ac/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // Push null values for the second model since we're using Sketchfab
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);

    // Set up SUPRIM X model with Sketchfab
    const container3 = document.getElementById('model-container3');
    if (container3) {
        container3.innerHTML = `
            <iframe
                title="MSI SUPRIM X GeForce RTX 4090"
                frameborder="0"
                allowfullscreen
                mozallowfullscreen="true"
                webkitallowfullscreen="true"
                allow="autoplay; fullscreen; xr-spatial-tracking"
                xr-spatial-tracking
                execution-while-out-of-viewport
                execution-while-not-rendered
                web-share
                src="https://sketchfab.com/models/d417c0b4c3bd475eb9669afcd14a2601/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0"
                style="width: 100%; height: 250px; border-radius: 10px;"
            ></iframe>
        `;
    }

    // Push null values for the third model since we're using Sketchfab
    scenes.push(null);
    cameras.push(null);
    renderers.push(null);
    controls.push(null);
    models.push(null);
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
        window.location.href = 'nvidia-series.html';
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

// اضافه کردن این توابع به script.js
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// نمایش نام کاربر
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const usernameDisplay = document.getElementById('username-display');
        if (usernameDisplay) {
            usernameDisplay.textContent = `Welcome, ${currentUser}!`;
        }
    }
});

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // اینجا می‌توانید منطق اعتبارسنجی اضافه کنید
    localStorage.setItem('currentUser', username);
    window.location.href = 'cpu-brands.html'; // ریدایرکت به صفحه اصلی بعد از لاگین
}

function createAccount(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('signup-password').value;
    
    // اینجا می‌توانید منطق ثبت‌نام اضافه کنید
    localStorage.setItem('currentUser', username);
    window.location.href = 'cpu-brands.html'; // ریدایرکت به صفحه اصلی بعد از ثبت‌نام
}

// اضافه کردن یک تابع برای چک کردن وضعیت لاگین در هر صفحه
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
    }
} 