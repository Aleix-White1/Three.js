import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


// Contenedor de escena
const scene = new THREE.Scene();
// vista(grados), tamaño pantalla usuario, vista de la camara
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// Renderizador de graficos
const domElement = document.querySelector('#bg');
const renderer = new THREE.WebGLRenderer({
    // Seleccionar donde se va a renderizar
    canvas : domElement,
});

const controls = new OrbitControls(camera, renderer.domElement);


// Pixeles del renderizador
renderer.setPixelRatio(window.devicePixelRatio);
// Tamaño del renderizado segun el usuario
renderer.setSize(window.innerWidth, window.innerHeight);
// Posicion de la camara
camera.position.setZ(150); // x,y,z

// Objetos
const geometryEARTH = new THREE.SphereGeometry( 50, 52, 56 ); 
const geometryMOON = new THREE.SphereGeometry( 5, 32, 16 ); 

// Texturas
const loader = new THREE.TextureLoader();

// Tierra 
const textureEARTH = loader.load('img/earth.jpg');
const materialEARTH = new THREE.MeshBasicMaterial( { map: textureEARTH } ); 
const earth = new THREE.Mesh( geometryEARTH, materialEARTH ); 

// Luna
const textureMOON = loader.load('img/moon.jpg');
const materialMOON = new THREE.MeshBasicMaterial( {map: textureMOON});
const moon = new THREE.Mesh(geometryMOON, materialMOON);

//Background
loader.load('img/espacio.jpg', function (texture){
    scene.background = texture
});

//Posiciones iniciales
earth.position.set(0, 0, 0);
moon.position.set(80, 0, 0);

//crear un grupo para la luna y la tierra
const group = new THREE.Group();
group.add(earth);
group.add(moon);
scene.add( group );




// Loop para animar
function animate(){
    requestAnimationFrame(animate);
    // Aplicamos al render la escena y la camara
    const earthRotation = 0.0001;
    const earthOrbitRotation = 0.05;

    earth.rotation.y += earthRotation
    moon.rotation.y += earthOrbitRotation;

    const angle = 0.01;
    const axis = new THREE.Vector3(0,1,0);

    group.rotateOnAxis(axis, angle)
    controls.update();
    renderer.render(scene, camera);
}
animate();

