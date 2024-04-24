import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


// Create a scene
const scene = new THREE.Scene();

// Set up a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load your .obj model with associated .mtl file
const mtlLoader = new MTLLoader();
mtlLoader.load('./ste/ste.mtl', function (materials) {
  materials.preload(); // Preload materials
  
  const objLoader = new OBJLoader();
  for (const material of Object.values(materials.materials)) {
    material.side = THREE.DoubleSide;
  }
  objLoader.setMaterials(materials);
  objLoader.load('./ste/ste.obj', function (object) {
    scene.add(object);
  });
});

// Set up camera position
camera.position.set(-200, 40, 0);



const skyColor = 0xB1E1FF; // light blue
const groundColor = 0xB97A20; // brownish orange
const intensity = 3;
const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
scene.add( light );

// Set the renderer background color
renderer.setClearColor(0xeeeeee); // Light gray background color

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add damping effect for smoother movement
controls.dampingFactor = 0.05; // Adjust damping factor as needed


document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      camera.position.y += 0.5;
      break;
    case 'ArrowDown':
      camera.position.y -= 0.5;
      break;
    case 'ArrowLeft':
      camera.position.x -= 0.5;
      break;
    case 'ArrowRight':
      camera.position.x += 0.5;
      break;
    case 'w':
    case 'W':
      camera.position.z += 0.5;
      break;
    case 's':
    case 'S':
      camera.position.z -= 0.5;
      break;
  }
});


// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls in each frame
  renderer.render(scene, camera);
}
animate();
