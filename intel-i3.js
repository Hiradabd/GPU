// اضافه کردن در ابتدای فایل
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
    }
}

// CPU Model Data
const cpuData = [
    {
        model: "Core i3-3220",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.30 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "55 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 2500",
            socket: "LGA1155",
            lithography: "22 nm",
            releaseDate: "Q3'12"
        }
    },
    {
        model: "Core i3-3240",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.40 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "55 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 2500",
            socket: "LGA1155",
            lithography: "22 nm",
            releaseDate: "Q3'12"
        }
    },
    {
        model: "Core i3-3250",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.50 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "55 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 2500",
            socket: "LGA1155",
            lithography: "22 nm",
            releaseDate: "Q3'12"
        }
    },
    {
        model: "Core i3-4130",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.40 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "54 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 4400",
            socket: "LGA1150",
            lithography: "22 nm",
            releaseDate: "Q3'13"
        }
    },
    {
        model: "Core i3-4150",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.50 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "54 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 4400",
            socket: "LGA1150",
            lithography: "22 nm",
            releaseDate: "Q3'13"
        }
    },
    {
        model: "Core i3-4160",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.60 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "54 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 4400",
            socket: "LGA1150",
            lithography: "22 nm",
            releaseDate: "Q2'14"
        }
    },
    {
        model: "Core i3-4170",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.70 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "54 W",
            maxMemory: "32 GB",
            memoryTypes: "DDR3-1333/1600",
            graphics: "Intel® HD Graphics 4400",
            socket: "LGA1150",
            lithography: "22 nm",
            releaseDate: "Q2'14"
        }
    },
    {
        model: "Core i3-5005U",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "2.00 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "15 W",
            maxMemory: "16 GB",
            memoryTypes: "DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 5500",
            socket: "BGA1168",
            lithography: "14 nm",
            releaseDate: "Q1'15"
        }
    },
    {
        model: "Core i3-5010U",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "2.10 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "15 W",
            maxMemory: "16 GB",
            memoryTypes: "DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 5500",
            socket: "BGA1168",
            lithography: "14 nm",
            releaseDate: "Q1'15"
        }
    },
    {
        model: "Core i3-5015U",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "2.10 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "15 W",
            maxMemory: "16 GB",
            memoryTypes: "DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 5500",
            socket: "BGA1168",
            lithography: "14 nm",
            releaseDate: "Q1'15"
        }
    },
    {
        model: "Core i3-5020U",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "2.20 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "15 W",
            maxMemory: "16 GB",
            memoryTypes: "DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 5500",
            socket: "BGA1168",
            lithography: "14 nm",
            releaseDate: "Q1'15"
        }
    },
    {
        model: "Core i3-6100",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.70 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-1866/2133, DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 530",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q3'15"
        }
    },
    {
        model: "Core i3-6300",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.80 GHz",
            cache: "4 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-1866/2133, DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 530",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q3'15"
        }
    },
    {
        model: "Core i3-6320",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.90 GHz",
            cache: "4 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-1866/2133, DDR3L-1333/1600",
            graphics: "Intel® HD Graphics 530",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q3'15"
        }
    },
    {
        model: "Core i3-7100",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "3.90 GHz",
            cache: "3 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2133/2400",
            graphics: "Intel® HD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q1'17"
        }
    },
    {
        model: "Core i3-7300",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "4.00 GHz",
            cache: "4 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2133/2400",
            graphics: "Intel® HD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q1'17"
        }
    },
    {
        model: "Core i3-7320",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "4.10 GHz",
            cache: "4 MB Intel® Smart Cache",
            tdp: "51 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2133/2400",
            graphics: "Intel® HD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q1'17"
        }
    },
    {
        model: "Core i3-7350K",
        specs: {
            cores: "2 Cores, 4 Threads",
            baseFrequency: "4.20 GHz",
            cache: "4 MB Intel® Smart Cache",
            tdp: "60 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2133/2400",
            graphics: "Intel® HD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q1'17"
        }
    },
    {
        model: "Core i3-8100",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q4'17"
        }
    },
    {
        model: "Core i3-8300",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "3.70 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q2'18"
        }
    },
    {
        model: "Core i3-8350K",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "4.00 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "91 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q4'17"
        }
    },
    {
        model: "Core i3-9100",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q2'19"
        }
    },
    {
        model: "Core i3-9300",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "3.70 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q2'19"
        }
    },
    {
        model: "Core i3-9350K",
        specs: {
            cores: "4 Cores, 4 Threads",
            baseFrequency: "4.00 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "91 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-2400",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1151",
            lithography: "14 nm",
            releaseDate: "Q1'19"
        }
    },
    {
        model: "Core i3-10100",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-2666",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q2'20"
        }
    },
    {
        model: "Core i3-10300",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.70 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-2666",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q2'20"
        }
    },
    {
        model: "Core i3-10320",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.80 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-2666",
            graphics: "Intel® UHD Graphics 630",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q2'20"
        }
    },
    {
        model: "Core i3-10100F",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-2666",
            graphics: "None",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q4'20"
        }
    },
    {
        model: "Core i3-11100",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-3200",
            graphics: "Intel® UHD Graphics 730",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q1'21"
        }
    },
    {
        model: "Core i3-11300H",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.10 GHz",
            cache: "8 MB Intel® Smart Cache",
            tdp: "35 W",
            maxMemory: "64 GB",
            memoryTypes: "DDR4-3200",
            graphics: "Intel® Iris® Xe Graphics",
            socket: "BGA",
            lithography: "10 nm SuperFin",
            releaseDate: "Q1'21"
        }
    },
    {
        model: "Core i3-11100F",
        specs: {
            cores: "4 Cores, 8 Threads",
            baseFrequency: "3.60 GHz",
            cache: "6 MB Intel® Smart Cache",
            tdp: "65 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR4-3200",
            graphics: "None",
            socket: "LGA1200",
            lithography: "14 nm",
            releaseDate: "Q1'21"
        }
    },
    {
        model: "Core i3-12100",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "3.30 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "60 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-4800, DDR4-3200",
            graphics: "Intel® UHD Graphics 730",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'22"
        }
    },
    {
        model: "Core i3-12100F",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "3.30 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "58 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-4800, DDR4-3200",
            graphics: "None",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'22"
        }
    },
    {
        model: "Core i3-12300",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "3.50 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "60 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-4800, DDR4-3200",
            graphics: "Intel® UHD Graphics 730",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'22"
        }
    },
    {
        model: "Core i3-13100",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "3.40 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "60 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-5600, DDR4-3200",
            graphics: "Intel® UHD Graphics 730",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'23"
        }
    },
    {
        model: "Core i3-13100F",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "3.40 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "58 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-5600, DDR4-3200",
            graphics: "None",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'23"
        }
    },
    {
        model: "Core i3-13100T",
        specs: {
            cores: "4 Cores (4P + 0E), 8 Threads",
            baseFrequency: "2.50 GHz",
            cache: "12 MB Intel® Smart Cache",
            tdp: "35 W",
            maxMemory: "128 GB",
            memoryTypes: "DDR5-5600, DDR4-3200",
            graphics: "Intel® UHD Graphics 730",
            socket: "LGA1700",
            lithography: "Intel 7",
            releaseDate: "Q1'23"
        }
    }
];

// Initialize Three.js scenes
let scenes = [];
let cameras = [];
let renderers = [];
let controls = [];
let models = [];

// Initialize fullscreen view variables
let fullscreenScene, fullscreenCamera, fullscreenRenderer, fullscreenControls, fullscreenModel;

function initScene(containerId) {
    const container = document.getElementById(containerId);
    
    // Create iframe for Sketchfab model with autostart and other parameters
    const iframe = document.createElement('iframe');
    iframe.src = 'https://sketchfab.com/models/0375219a20c849eda28d7ebb39b947db/embed?autostart=1&ui_controls=0&ui_infos=0&ui_inspector=0&ui_stop=0&ui_watermark=0&ui_watermark_link=0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.allow = 'autoplay; fullscreen; vr';
    
    // Clear container and add iframe
    container.innerHTML = '';
    container.appendChild(iframe);
}

function loadModel(scene, modelPath) {
    const loader = new THREE.GLTFLoader();
    const cpuModelUrl = '/models/cpu.glb'; // Local path to the CPU model
    
    return new Promise((resolve, reject) => {
        loader.load(
            cpuModelUrl,
            (gltf) => {
                const model = gltf.scene;
                
                // Scale and position the model appropriately
                model.scale.set(0.5, 0.5, 0.5);
                model.rotation.x = -Math.PI / 2; // Rotate to face up
                
                // Center the model
                const box = new THREE.Box3().setFromObject(model);
                const center = box.getCenter(new THREE.Vector3());
                model.position.sub(center);
                
                // Add some ambient rotation
                const animate = () => {
                    model.rotation.y += 0.005;
                    requestAnimationFrame(animate);
                };
                animate();
                
                scene.add(model);
                resolve(model);
            },
            // Loading progress callback
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // Error callback
            (error) => {
                console.error('Error loading model:', error);
                reject(error);
            }
        );
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Update controls and render each scene
    scenes.forEach((scene, index) => {
        if (controls[index]) {
            controls[index].update();
        }
        if (renderers[index] && cameras[index]) {
            renderers[index].render(scene, cameras[index]);
        }
    });

    // Update fullscreen view if active
    if (fullscreenControls) {
        fullscreenControls.update();
    }
    if (fullscreenRenderer && fullscreenScene && fullscreenCamera) {
        fullscreenRenderer.render(fullscreenScene, fullscreenCamera);
    }
}

function openFullView(index) {
    const fullscreenView = document.getElementById('fullscreen-view');
    fullscreenView.classList.add('active');

    // Update specs in fullscreen view
    const specsContent = document.getElementById('fullscreen-specs');
    const cpu = cpuData[index];
    specsContent.innerHTML = Object.entries(cpu.specs)
        .map(([key, value]) => `
            <div class="spec-item">
                <span class="spec-label">${key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                <span class="spec-value">${value}</span>
            </div>
        `).join('');

    // Initialize fullscreen 3D view
    const container = document.getElementById('model-container-full');
    initScene('model-container-full');
}

function closeFullView() {
    const fullscreenView = document.getElementById('fullscreen-view');
    fullscreenView.classList.remove('active');
}

// Initialize all CPU models
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    const containers = [
        'model-container-3220',
        'model-container-3240',
        'model-container-3250',
        'model-container-4130',
        'model-container-4150',
        'model-container-4160',
        'model-container-4170',
        'model-container-5005u',
        'model-container-5010u',
        'model-container-5015u',
        'model-container-5020u',
        'model-container-6100',
        'model-container-6300',
        'model-container-6320',
        'model-container-7100',
        'model-container-7300',
        'model-container-7320',
        'model-container-7350k',
        'model-container-8100',
        'model-container-8300',
        'model-container-8350k',
        'model-container-9100',
        'model-container-9300',
        'model-container-9350k',
        'model-container-10100',
        'model-container-10300',
        'model-container-10320',
        'model-container-10100f',
        'model-container-11100',
        'model-container-11300h',
        'model-container-11100f',
        'model-container-12100',
        'model-container-12100f',
        'model-container-12300',
        'model-container-13100',
        'model-container-13100f',
        'model-container-13100t'
    ];

    containers.forEach(containerId => {
        initScene(containerId);
    });

    // Initialize hamburger menu
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const closeSidebar = document.querySelector('.close-sidebar');

    hamburgerMenu.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
}); 