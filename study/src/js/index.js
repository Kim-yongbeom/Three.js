import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(8, 8, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize($result.clientWidth, $result.clientHeight);
document.body.appendChild(renderer.domElement);

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2E6FF2
})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide
})
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);

// ambientLight (색상, 강도) - 빛의 방향이 없고 전역적으로 빛을 발산함
// const ambientLight = new THREE.AmbientLight(0xffffff, 1)
// scene.add(ambientLight)

// directionLight (색상, 강도) - 일정한 방향으로 빛을 발산함
// const directionLight = new THREE.DirectionalLight(0xffffff, 1)
// scene.add(directionLight);

// pointLight - 전구처럼 한 점에서 방출되는 빛
const pointLight = new THREE.PointLight(0xff0000);
scene.add(pointLight)

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
