# Three.js

## Three.js 설정

- VSCode
- Git (Window만 설치하면 된다. Linux, Mac은 기본적으로 설치되어 있음)
  - git --version 으로 버전 체크
- Node.js 설치
  - node -v 와 npm -v 으로 버전 체크
- TypeScript 설치 (npm install -g typescript)
  - tsc -v 으로 버전 체크

## Three.js 시작

- npm init
- npm install three --save-dev

## Three.js 스터디

```
1. 폴더 구조
dist 폴더를 root에 생성
dist 폴더 안에 client 와 server 폴더 생성

client 안 index.html
--------------------------------------------------------------
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            overflow: hidden;
            margin: 0px;
        }
    </style>
</head>
<body>
    <script type="module" src="bundle.js"></script>
</body>
</html>
--------------------------------------------------------------

src 폴더를 root에 생성
src 폴더 안에 client와 server 폴더 생성

client 폴더 안에 client.ts
--------------------------------------------------------------
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

function render() {
    renderer.render(scene, camera)
}

animate()
--------------------------------------------------------------

client 폴더 안에 tsconfig.json
--------------------------------------------------------------
{
    "compilerOptions": {
        "target": "ES6",
        "moduleResolution": "node",
        "strict": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["**/*.ts"]
}
--------------------------------------------------------------

tsconfig.json을 넣으면 client.ts에서 three 라이브러리에서 에러가 발생
설치: npm install @types/three --save-dev
```
