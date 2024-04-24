import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; // Use GLTFLoader for .glb files
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load your .glb model
const loader = new GLTFLoader();
loader.load('./filgltf/untitled.gltf', function(gltf) {
  const object = gltf.scene; // Get the root object from the loaded GLTF
  scene.add(object);
});

// Set up camera position
camera.position.set(-1, 90, -110);

// Add directional light for better visibility
const skyColor = 0xB1E1FF; // light blue
const groundColor = 0xB97A20; // brownish orange
const intensity = 3;
const light = new THREE.HemisphereLight( skyColor, groundColor, intensity );
scene.add( light );

// Set renderer background color
renderer.setClearColor(0xeeeeee); // Light gray background color

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Add damping effect for smoother movement
controls.dampingFactor = 0.05; // Adjust damping factor as needed

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update controls in each frame
  renderer.render(scene, camera);
}
animate();
