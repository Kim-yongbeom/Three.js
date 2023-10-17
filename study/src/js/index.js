import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.set(2,2,2);
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2,4,3)
scene.add(light);

const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
scene.add(box);
renderer.render(scene, camera)