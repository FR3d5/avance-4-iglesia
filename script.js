
import * as THREE from 'https://esm.sh/three@0.161.0';
import { GLTFLoader } from 'https://esm.sh/three@0.161.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, cube;
const loader = new GLTFLoader();
let isMouseDown = false;
let prevMouseX = 0;
let prevMouseY = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(25, 10, 20);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    cargarModelo();
    animate();
    luzpuntual();

    window.addEventListener('resize', onWindowResize);

    // Eventos para arrastrar el modelo con el mouse
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseDown(event) {
    isMouseDown = true;
    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
}

function onMouseUp() {
    isMouseDown = false;
}

function onMouseMove(event) {
    if (!isMouseDown || !cube) return;

    const deltaX = event.clientX - prevMouseX;
    const deltaY = event.clientY - prevMouseY;

    // Girar el modelo según el movimiento del mouse
    cube.rotation.y += deltaX * 0.01; // horizontal
    cube.rotation.x += deltaY * 0.01; // vertical

    prevMouseX = event.clientX;
    prevMouseY = event.clientY;
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function cargarModelo() {
    loader.load(
        'Iglesia.glb', // Asegúrate que esté en la misma carpeta
        function (gltf) {
            cube = gltf.scene;
            const box = new THREE.Box3().setFromObject(cube);
            const center = box.getCenter(new THREE.Vector3());
            cube.position.sub(center);
            cube.scale.set(0.8, 0.8, 0.8);
            cube.rotation.y=-2;
            scene.add(cube);
            console.log("Modelo cargado correctamente");
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% cargado');
        },
        function (error) {
            console.error('Error cargando el modelo. Verifica la ruta.', error);
        }
    );
}
function luzpuntual(){
    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(20, 30, 20);
    pointLight.castShadow = true; // IMPORTANTE para que genere sombras
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.radius = 4; // suaviza sombras
    scene.add(pointLight);
}

window.onload = init;