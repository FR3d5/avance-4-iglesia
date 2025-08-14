import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.161.0/three.module.js';
var scene;
var camera;
var renderer;
var cube;
var cube1;
var cor5=0;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({alpha:true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 3);
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

    if (cube) {
        cube.rotation.y += 0.01;
    }
    if (cube1) {
        cube1.rotation.y -= 0.01;
    }
if(cor5<=1){
   cube.scale.x +=0.02;
   cube.scale.y +=0.02;
   cube.scale.z +=0.02;
   cor5+=0.1;
 }else{if(cor5<=2.2){
   cube.scale.x -=0.02;
   cube.scale.y -=0.02;
   cube.scale.z -=0.02;
   cor5+=0.1;
 }else{cor5=0;}}
    renderer.render(scene, camera);
}

function cubo() {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    // Material Phong para que refleje la luz
    const globalTextureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshPhongMaterial({map: globalTextureLoader.load('https://cdn.glitch.global/18d5f7bf-78b4-4b5e-b976-d7ec84277e1b/Imagen%20de%20WhatsApp%202025-07-06%20a%20las%2020.22.56_34aa8965.jpg?v=1751848072479'),color:0xffffff,shinines:50});
    cube = new THREE.Mesh(geometry, material);
    cube1 = new THREE.Mesh(geometry, material);

    cube.position.set(-10, 4, 0);
    cube1.position.set(-10, -4, 0);

    scene.add(cube);
    scene.add(cube1);

}

// Asegúrate de que el DOM esté completamente cargado antes de inicializar Three.js
window.onload = init;