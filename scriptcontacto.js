import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.161.0/three.module.js';
var scene;
var camera;
var renderer;
var cube;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    cubo();
    animate();

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    if (cube) { // Verificar si el cubo existe antes de rotarlo
        cube.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
}

function cubo() {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    // Material Phong para que refleje la luz
    const globalTextureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({map: globalTextureLoader.load('https://cdn.glitch.global/18d5f7bf-78b4-4b5e-b976-d7ec84277e1b/ai-generated-8709873_1920.png?v=1751849392855'),color:0xffffff,shinines:50});
    cube = new THREE.Mesh(geometry, material);
    cube.position.set(-11, 3, 0); // Posiciona el cubo en el centro de la escena
    scene.add(cube);
}

// Asegúrate de que el DOM esté completamente cargado antes de inicializar Three.js
window.onload = init;