import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
// 멀리서 자세히 보기 위해 값 변경
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize($result.clientWidth, $result.clientHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);

// basic Material은 빛의 영향을 받지 않아서 단색의 Mesh를 가짐
const basic = new THREE.MeshBasicMaterial({
  // 색상 변경 가능
  color: 0xffaaaa,
  // 뼈대를 보여줌
  // wireframe: true,
  // 투명도 선택
  transparent: true,
  // 투명도 조절
  opacity: 0.5,
})

// 가장 일반적으로 사용되는 Material로
// Unity나 Unreal 등의 3D 어플리케이션에서 표준으로 사용된다.
// 물리 기반의 렌더링을 사용하기 때문에 빛에 의해 명암이 표현되고 다양한 질감 표현이 가능
const standard = new THREE.MeshStandardMaterial({
  color: 0xffaaaa,
  // 빛이 반사되는 정도를 표현
  roughness: 0.2,
  // 금속 질감 표현
  metalness: 0.8,
})

// StandardMaterial의 확장 버전
const physical = new THREE.MeshPhysicalMaterial({
  color: 0xffaaaa,
  // 반투명의 레이어 층 생성
  clearcoat: 0.8,
  // clearcoat의 강도 조절
  clearcoatRoughness: 0.2
})

// 광택있는 표면을 표현할 때 사용
const phong = new THREE.MeshPhongMaterial({
  color: 0xffaaaa,
  // 광택의 정도
  shininess: 100,
  // 반사되는 빛의 색상
  specular: 0x2e6ff2
})

const mesh = new THREE.Mesh(geometry, phong);
scene.add(mesh)

// 1. 위치
mesh.position.x = 2;
mesh.position.y = 1;
mesh.position.set(0, 2, 1);

// 2. 회전
mesh.rotation.y = THREE.MathUtils.degToRad(30)

// 3. 크기
mesh.scale.x = 1.2
mesh.scale.z = 0.8

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
  // box.rotation.y += 0.01;
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
