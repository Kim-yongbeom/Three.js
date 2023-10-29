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
const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
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

const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
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

const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
scene.add(box);
renderer.render(scene, camera)
```

## 4. Three.js - Camera (PerspectiveCamera)

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

const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
scene.add(box);
renderer.render(scene, camera)
```

## 4. Three.js - canvas에 직접 넣기

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

const geomety = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshStandardMaterial({
    color: 0x2E6FF2
})
const box = new THREE.Mesh(geomety, material);
scene.add(box);
renderer.render(scene, camera)
...
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
