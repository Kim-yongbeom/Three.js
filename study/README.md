# Three.js

## 1. 파일 설정 및 라이브러리 설치

- live server (VsCode extension 설치)
- root에 index.html 생성
- root에 src/js/index.js 생성

index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 모듈을 찾게하기 위한 import 설정 -->
    <script type="importmap">
        {
            "imports": {
                "three": "./node_modules/three/build/three.module.js"
            }
        }
    </script>
    <!-- importmap을 지원하지 않는 브라우저를 대비한 폴리필
    폴리필: 브라우저가 지원하지 않는 자바스크립트 코드를 지원 가능하도록 변환한 코드 -->
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.8.0/dist/es-module-shims.js"></script>
</head>
<body>
    <script src="./src/js/index.js" type="module"></script>
</body>
</html>
```

- npm install three@0.152.2 (node 깔려있어야함)

src/js/index.js

```
import * as THREE from "../../node_modules/three/build/three.module";

console.log(THREE)
```

src/js/index.js

```
import * as THREE from "three";

// 장면 생성
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFE187)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(0, 2, 4);
scene.add(pointLight);

// 박스
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);
```

## 2. WebGL 호환성 체크

- WebGL.isWebGLAvailable 로 호환성 체크

```
import * as THREE from "three";
import WebGL from "../../node_modules/three/examples/jsm/capabilities/WebGL.js"

if (WebGL.isWebGLAvailable) {
    // 장면 생성
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFE187)

    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 빛
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 2, 4);
    scene.add(pointLight);

    // 박스
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x2E6FF2 })
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer.render(scene, camera);
} else {
    document.body.appendChild(WebGL.getWebGLErrorMessage)
}
```

## 3. Three.js 3가지 기본 구성 요소

- 1. Scene: 화면에서 보여주려는 객체를 담는 공간
- 2. Camera: Scene을 바라볼 시점을 결정
- 3. Renderer: Scene + Camera 화면을 그려주는 역할
  - WebGL 기반으로 Render 해줌

src/js/index.js

```
import * as THREE from "three";

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

// 3. Renderer: Scene + Camera 화면을 그려주는 역할
// WebGL 기반으로 Render 해줌
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
console.log(renderer); // renderer -> domElement -> canvas 확인가능
```

console 주석 처리 후 html body에 canvas를 추가해준다.

```
// console.log(renderer); // renderer -> domElement -> canvas 확인가능
document.body.appendChild(renderer.domElement);
```

```
import * as THREE from "three";

const scene = new THREE.Scene();
// scene의 기본 배경색은 검정색, 배경색 커스텀 가능
scene.background = new THREE.Color(0xffe287)

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// renderer에 scene, camera 추가
renderer.render(scene, camera)
```

## 4. Three.js - geometry

- Three.js 에서 지원하는 geometry가 많다.

```
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// BoxGeometry 사용
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geometry, material);
// scene에 box 추가
scene.add(box);
renderer.render(scene, camera)
```

- scene에 box를 추가 했지만 화면에 보이지 않는다.

```
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
// 카메라 속성값을 설정해 주어야함
camera.position.set(2,2,2); // 카메라의 위치(크기 조절??)
camera.lookAt(0,0,0) // 카메라가 어떤 지점을 바라보도록 하는 방향 조절

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geometry, material);
scene.add(box);
renderer.render(scene, camera)
```

- 빛을 추가하지 않아서 box가 검은색으로 보인다.

```
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

// 빛을 DirectionalLight으로 추가해주고 position과 scene에 설정을 해주어야 빛이 제대로 적용된다.
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2,4,3)
scene.add(light);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geometry, material);
scene.add(box);
renderer.render(scene, camera)
```

## 5. Three.js - Camera (PerspectiveCamera)

- Three.js 에서는 여러 카메라를 제공하며, 대표적으로 `PerspectiveCamera`와 `OrthographicCamera`를 사용한다.
- PerspectiveCamera: 원근감을 적용하여 객체를 투영하는 카메라로, 3D 공간감을 표현
- OrthographicCamera: 원근감 없이 평면적인 투영을 적용하는 카메라
- 실습에서 사용한 카메라는 PerspectiveCamera

```
import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287)

const camera = new THREE.PerspectiveCamera(
    50, // fov: 시야각, 커질 수록 화면에 많은 영역을 출력
    window.innerWidth / window.innerHeight, // aspect: 카메라의 종횡비, 가로와 세로의 비율
    0.1, // near: 카메라로 볼 수 있는 최소 거리 (범위 밖은 렌더링 되지 않는다.)
    1000 // far: 카메라로 볼 수 있는 최대 거리 (범위 밖은 렌더링 되지 않는다.)
)
camera.position.set(2,2,2);
camera.lookAt(0,0,0)

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 빛을 DirectionalLight으로 추가해주고 position과 scene에 설정을 해주어야 빛이 제대로 적용된다.
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2,4,3)
scene.add(light);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geometry, material);
scene.add(box);
renderer.render(scene, camera)
```

## 6. Three.js - canvas에 직접 넣기

- index.html에 추가

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script type="importmap">
        {
            "imports": {
                "three": "./node_modules/three/build/three.module.js"
            }
        }
    </script>
    <script async src="https://ga.jspm.io/npm:es-module-shims@1.8.0/dist/es-module-shims.js"></script>
</head>
<body>
    <!-- 캔버스를 추가해준다 -->
    <canvas id="result" style="border:1px solid red; width:500px; height:500px;"></canvas>
    <script src="./src/js/index.js" type="module"></script>
</body>
</html>
```

- index.js에 작성한 canvas를 적용

```
import * as THREE from "three";

// html에서 result라는 id값을 찾음
const $result = document.getElementById('result');

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

// THREE.WebGLRenderer에 canvas: $result 값을 넣어줌
const renderer = new THREE.WebGLRenderer({
    canvas: $result
});
// renderer의 setSize에서 window.innerWidth, window.innerHeight 때문에
// html 의 canvas에서 설정한 스타일이 먹히지 않아서 주석 처리
// renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2,4,3)
scene.add(light);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geometry, material);
scene.add(box);
renderer.render(scene, camera)
```

- 사이즈를 억지로 조정해서 계단현상이 발생한다.
- 해결법

```
// renderer 설정에서 antialias: true 를 추가해주면 계단현상이 어느정도 해결됨
const renderer = new THREE.WebGLRenderer({
    canvas: $result,
    antialias: true
});
// renderer setSize를 $result의 widht와 height 값을 적용시켜 준다.
renderer.setSize($result.clientWidth, $result.clientHeight);
```

- 만약 html의 canvas 스타일에서 height를 800px로 변경하면 박스가 왜곡된다.
- 이유: 카메라의 종횡비와 캔버스의 크기가 다르기 때문

```
// 카메라 설정도 $result 의 크기에 맞춰주자
const camera = new THREE.PerspectiveCamera(
    50,
    $result.clientWidth/$result.clientHeight,
    0.1,
    1000
)
```

- canvas의 스타일을 변경해주자

```
<canvas id="result" style="width: 100%; height: 100%"></canvas>
```

## 7. Three.js - 애니메이션, 반응형

- 애니메이션

```
function animate() {
  box.rotation.y += 0.01;
  // renderer에서 render를 시켜줘야 애니메이션이 적용된다.
  renderer.render(scene, camera);
  // js에서 제공하는 requestAnimationFrame
  requestAnimationFrame(animate);
}
animate();
```

- 반응형

```
window.addEventListener("resize", () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  // 2. 카메라 업데이트
  camera.updateProjectionMatrix();
  // 3. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

## 8. Three.js - OrbitControls

- 마우스 이벤트를 추가해주는 라이브러리
- 다양한 기능이 있지만 기본 값으로 사용할 예정
- index.html 에 코드 추가 (버전문제로 OrbitControls를 cdn으로 불러와야함)

```
<script type="importmap">
      {
        "imports": {
          "three": "https://unpkg.com/three@0.152.2/build/three.module.js",
          "three/examples/jsm/": "https://unpkg.com/three@0.152.2/examples/jsm/"
        }
      }
</script>
```

- index.js

```
const controls = new OrbitControls(camera, renderer.domElement)
function animate() {
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  // update 추가
  controls.update();
  requestAnimationFrame(animate);
}
animate();
```

## 8. Three.js - Geometry, Material

- Mesh

```
// Three.js 에서 3차원의 객체를 Mesh 라고 한다.
// Mesh는 geometry(형태) 와 material(재질) 의 속성을 가진다.
// 현재 화면에서 geometry는 정육면체를 나타내고 material은 파란색을 나타낸다.
const box = new THREE.Mesh(geometry, material);
```

- geometry
- https://threejs.org/docs/?q=geometry#api/ko/geometries/BoxGeometry

```
import * as THREE from "three";

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
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

const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});


// 육면체
// const geo1 = new THREE.BoxGeometry(1, 1, 1);
// const obj1 = new THREE.Mesh(geo1, material);
// scene.add(obj1);

// 원뿔
// const geo2 = new THREE.ConeGeometry(0.5, 1, 4);
// const obj2 = new THREE.Mesh(geo2, material);
// scene.add(obj2)

// 원기둥
// const geo3 = new THREE.CylinderGeometry(0.5, 0.8, 1);
// const obj3 = new THREE.Mesh(geo3, material);
// scene.add(obj3)

// 구
// const geo4 = new THREE.SphereGeometry(1);
// const obj4 = new THREE.Mesh(geo4, material);
// scene.add(obj4);

// 평면
// const geo5 = new THREE.PlaneGeometry(1, 2);
// const obj5 = new THREE.Mesh(geo5, material);
// scene.add(obj5);

// 원
// const geo6 = new THREE.CircleGeometry(1, 32);
// const obj6 = new THREE.Mesh(geo6, material);
// scene.add(obj6);

// 튜브
// const geo7 = new THREE.TorusGeometry(1, 0.3);
// const obj7 = new THREE.Mesh(geo7, material);
// scene.add(obj7);


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

```

- material

```
import * as THREE from "three";

const $result = document.getElementById("result");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
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
```

## 9. Three.js - Mesh

```
import * as THREE from "three";

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
const phong = new THREE.MeshPhongMaterial({
  color: 0xffaaaa,
  shininess: 100,
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
```

## 10. Three.js - 한라봉 만들기

```
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
camera.position.set(6, 6, 6);
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

// 한라봉
const bodyMaterial = new THREE.MeshStandardMaterial({
  color: 0xff7f00,
});
const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
scene.add(bottom);
const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
const top = new THREE.Mesh(topGeometry, bodyMaterial);
scene.add(top);
top.position.y = 1.7;

// 나뭇잎
const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x008000,
  // 나뭇잎의 사이드가 프론트로 설정되어서 보이지 않기 때문에 따로 설정
  side: THREE.DoubleSide,
});
const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4);
const stem = new THREE.Mesh(stemGeometry, leafMaterial);
scene.add(stem);
stem.position.y = 2.5;
const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
scene.add(leaf);
leaf.position.set(-0.5, 2.4, -0.1);
leaf.rotation.z = Math.PI / -2;

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
```

## 11. Three.js - 야자수 만들기

```
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

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 줄기
const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
scene.add(trunk1);
const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk2);
const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk3);
const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
scene.add(trunk4);

// 나뭇잎
const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
});
const leafGeometry = new THREE.SphereGeometry(
  2,
  32,
  16,
  Math.PI / 3,
  Math.PI / 3
);
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
scene.add(leaf1);
const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
scene.add(leaf2);
const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
scene.add(leaf3);
const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
scene.add(leaf4);

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

```

## 12. Three.js - Group

```
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

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 줄기
const trunk = new THREE.Group();

const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
// scene 대신 group 추가
trunk.add(trunk1);
const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
// scene 대신 group 추가
trunk.add(trunk2);
const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
// scene 대신 group 추가
trunk.add(trunk3);
const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
// scene 대신 group 추가
trunk.add(trunk4);

// group 설정 가능
// trunk.position.x = 2

// group을 scene에 추가
scene.add(trunk);

// 나뭇잎
const leaf = new THREE.Group();

const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
});
const leafGeometry = new THREE.SphereGeometry(
  2,
  32,
  16,
  Math.PI / 3,
  Math.PI / 3
);
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
leaf.add(leaf1);
const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
leaf.add(leaf2);
const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
leaf.add(leaf3);
const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
leaf.add(leaf4);

// group 설정 가능
leaf.position.x = -0.4;
leaf.rotation.z = THREE.MathUtils.degToRad(-10);

scene.add(leaf)

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

```

- 줄기(그룹)와 나뭇잎(그룹)을 자식그룹으로 설정 가능

```
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

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 나무
const tree = new THREE.Group();

const trunk = new THREE.Group();

const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk.add(trunk1);
const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk2);
const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
trunk.add(trunk3);
const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
trunk.add(trunk4);
// 나무 그룹에 줄기 포함
tree.add(trunk);

// 나뭇잎
const leaf = new THREE.Group();

const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
});
const leafGeometry = new THREE.SphereGeometry(
  2,
  32,
  16,
  Math.PI / 3,
  Math.PI / 3
);
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
leaf.add(leaf1);
const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
leaf.add(leaf2);
const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
leaf.add(leaf3);
const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
leaf.add(leaf4);

leaf.position.x = -0.4;
leaf.rotation.z = THREE.MathUtils.degToRad(-10);
// 나무 그룹에 나뭇잎 포함
tree.add(leaf)
// 그룹 조작 가능
tree.position.x = 2

scene.add(tree)

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

```
