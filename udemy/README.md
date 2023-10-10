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

### 1. Three.js 시작

- dist 폴더를 root에 생성
- dist 폴더 안에 client 와 server 폴더 생성

client 안 index.html

```
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
```

- src 폴더를 root에 생성
- src 폴더 안에 client와 server 폴더 생성

client 폴더 안에 client.ts

```
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
```

client 폴더 안에 tsconfig.json

```
{
    "compilerOptions": {
        "target": "ES6",
        "moduleResolution": "node",
        "strict": true,
        "allowSyntheticDefaultImports": true
    },
    "include": ["**/*.ts"]
}
```

- tsconfig.json을 넣으면 client.ts에서 three 라이브러리에서 에러가 발생
- 설치: npm install @types/three --save-dev

### 2.WebPack 설정

- npm install webpack webpack-cli webpack-dev-server webpack-merge ts-loader --save-dev
- npm install typescript --save-dev

src/client 폴더에 webpack.common.js 생성

```
const path = require('path')

module.exports = {
    entry: './src/client/client.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },
}
```

src/client 폴더에 webpack.dev.js 생성

```
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, '../../dist/client'),
        },
        hot: true,
    },
})
```

package.json

```
"scripts": {
    "dev": "webpack serve --config ./src/client/webpack.dev.js",
    "test": "echo \"Error: no test specified\" && exit 1"
},
```

- npm run dev 실행가능!!

### 3. Three.js 실습 - 랜더러와 카메라의 관계

src/client 의 client.ts

```
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
...
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 여기에 OrbitControls 추가
// 마우스 컨트롤 가능 (위, 아래, 왼쪽, 오른쪽, 줌인, 줌아웃)
new OrbitControls(camera, renderer.domElement)
```

기존에는 document.body.appendChild(renderer.domElement)을 사용해서 동적으로 canvas 태그를 만들어 주었지만 여러개의 canvas를 만들어줄때 <canvas id="c1" class="c"></canvas> 처럼 html에 추가해서 직접 canvas를 넣어주는 방식도 선호한다.

dist/client/index.html

```
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

        .c {
            width: 200px;
            height: 200px;
        }
    </style>
</head>
<body>
    <canvas id="c1" class="c"></canvas>
    <canvas id="c2" class="c"></canvas>
    <canvas id="c3" class="c"></canvas>
    <canvas id="c4" class="c"></canvas>
    <script type="module" src="bundle.js"></script>
</body>
</html>
```

scr/client/client.ts
THREE.WebGLRenderer()에 직접 HTML에 설정된 id를 getElementById로 엘리먼트를 가져와서 넣어준다.

```
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
)
camera.position.z = 2

const canvas1 = document.getElementById("c1") as HTMLCanvasElement
const canvas2 = document.getElementById("c2") as HTMLCanvasElement
const canvas3 = document.getElementById("c3") as HTMLCanvasElement
const canvas4 = document.getElementById("c4") as HTMLCanvasElement

const renderer1 = new THREE.WebGLRenderer({canvas:canvas1})
renderer1.setSize(200, 200)
const renderer2 = new THREE.WebGLRenderer({canvas:canvas2})
renderer2.setSize(200, 200)
const renderer3 = new THREE.WebGLRenderer({canvas:canvas3})
renderer3.setSize(200, 200)
const renderer4 = new THREE.WebGLRenderer({canvas:canvas4})
renderer4.setSize(200, 200)
// document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer1.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight
//     camera.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()
}

function render() {
    renderer1.render(scene, camera)
    renderer2.render(scene, camera)
    renderer3.render(scene, camera)
    renderer4.render(scene, camera)
}

animate()
```

카메라도 여러개 사용 가능

```
const camera1 = new THREE.PerspectiveCamera(
    75,
    1,
    0.1,
    1000
)
const camera2 = new THREE.OrthographicCamera(-2,2,2,-2)
const camera3 = new THREE.OrthographicCamera(-2,2,2,-2)
const camera4 = new THREE.OrthographicCamera(-2,2,2,-2)
camera1.position.z = 2

camera2.position.y = 2
camera2.lookAt(new THREE.Vector3())

camera3.position.x = -2
camera3.lookAt(new THREE.Vector3(0,0,0))

camera4.position.z = 2
```

모형과 크기 변경 가능

```
// 모형 변경
// const geometry = new THREE.BoxGeometry()
const geometry = new THREE.TorusGeometry()

...

const cube = new THREE.Mesh(geometry, material)
// 모형의 크기 변경
cube.scale.x = 0.8
cube.scale.y = 0.8
cube.scale.z = 0.8
scene.add(cube)
```

scene도 새롭게 추가 가능

- cube는 scene의 일부이기 때문에 다른 scene에서 호출 X

```
const scene = new THREE.Scene()
const scene2 = new THREE.Scene()

...

const cube = new THREE.Mesh(geometry, material)
cube.scale.x = 0.8
cube.scale.y = 0.8
cube.scale.z = 0.8
scene.add(cube)
scene2.add(cube)

// 실행결과는 마지막으로 scene을 호출한 renderer 에서만 cube가 보이게 된다.
// scene2에서만 보인다. 그래서 새롭게 cube를 만들어 줘야 한다.

const cube2 = new THREE.Mesh(geometry, material)
scene2.add(cube2)

```

### 3. Three.js 실습 - 애니메이션 통계

- Stats 사용!! (개발할 때 주로 사용한다.)
- src/client에 새로운 animate.ts 파일을 생성해 준다.
- webpack.common.js 에서 `entry: './src/client/animate.ts'` 처럼 animate로 변경

src/client/animate.ts

```
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 스텟 호출
import Stats from 'three/examples/jsm/libs/stats.module'

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

const controls = new OrbitControls(camera, renderer.domElement)
//controls.addEventListener('change', render)

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

// stats 생성
const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
    // 애니메이션 프레임을 요청하여 애니메이션을 반복 실행합니다.
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    render()

    // 애니메이션 루프 안에 넣어줘야 애니메이션의 상태를 확인할 수 있다.
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
```

### 4. Three.js 실습 - dat.GUI

- dat.GUI는 값을 GUI를 통해 직관적으로 변경하여 기능을 테스트해 볼 수 있는 javascript 기반의 매우 직관적인 라이브러리이다.
- npm install dat.gui --save-dev
- npm install @types/dat.gui --save-dev

src/client/animate.ts

```
import { GUI } from 'dat.gui'

...

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
// Math.PI === 3.141592653589793
cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)

    // 기존에는 animate 함수에서 자동으로 rotation 값을 변경해주었지만
    // 지금은 GUI로 변경중
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01

    render()

    stats.update()
}
```

### 5. Three.js 실습 - Object 3D

- Object3D는 Three.js의 많은 개체에 대한 기본 클래스로 3D 공간에서 개체를 조작하기 위한 메서드와 속성을 제공한다.
- 위에서 만든 cube의 메서드를 확인해보면 Object 3D에서 가져오는것이 많은걸 확인 가능

```
const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const cubeRotationFolder = cubeFolder.addFolder('Rotation')
cubeRotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
cubeRotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
cubeFolder.open()
cubeRotationFolder.open()
const cubePositionFolder = cubeFolder.addFolder('Position')
cubePositionFolder.add(cube.position, 'x', -10, 10)
cubePositionFolder.add(cube.position, 'y', -10, 10)
cubePositionFolder.add(cube.position, 'z', -10, 10)
// 매개변수로 마지막에 2를 넣게 되면 2씩 이동
// cubePositionFolder.add(cube.position, 'x', -10, 10, 2)
// cubePositionFolder.add(cube.position, 'y', -10, 10, 2)
// cubePositionFolder.add(cube.position, 'z', -10, 10, 2)
cubePositionFolder.open()
const cubeScaleFolder = cubeFolder.addFolder('Scale')
cubeScaleFolder.add(cube.scale, 'x', 0, 5)
cubeScaleFolder.add(cube.scale, 'y', 0, 5)
cubeScaleFolder.add(cube.scale, 'z', 0, 5)
// cube 조회 선택가능
// cubeFolder.add(cube, "visible")
cubeScaleFolder.open()

function animate() {
    ...
}
```

- position이 이동하는걸 더 잘 보이기 위해서

```
// 최상단
const scene = new THREE.Scene()
// AxesHepler(5) 에서 5는 축의 길이!
scene.add(new THREE.AxesHelper(5))
```

### 6. Three.js 실습 - Object 3D 계층

dist/client/index.html

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Three.js TypeScript Tutorials by Sean Bradley : https://sbcode.net/threejs</title>
        <style>
            body {
                overflow: hidden;
                margin: 0px;
            }
            #debug1 {
                font-family: monospace;
                font-size: larger;
                position: absolute;
                left: 0px;
                top: 50px;
                border: 1px solid red;
                width: 180px;
                height: 220px;
                color: white;
                pointer-events: none;
            }
        </style>
    </head>

    <body>
        <div id="debug1"></div>
        <script type="module" src="bundle.js"></script>
    </body>
</html>
```

src/client/animate.ts

```
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.x = 4
camera.position.y = 4
camera.position.z = 4

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(8, 0, 0)

const light1 = new THREE.PointLight(0xffffff, 400)
light1.position.set(10, 10, 10)
scene.add(light1)

const light2 = new THREE.PointLight(0xffffff, 400)
light2.position.set(-10, 10, 10)
scene.add(light2)

const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0xff0000 })
)
object1.position.set(4, 0, 0)
scene.add(object1)
object1.add(new THREE.AxesHelper(5))

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x00ff00 })
)
object2.position.set(4, 0, 0)
object1.add(object2)
object2.add(new THREE.AxesHelper(5))

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(),
    new THREE.MeshPhongMaterial({ color: 0x0000ff })
)
object3.position.set(4, 0, 0)
object2.add(object3)
object3.add(new THREE.AxesHelper(5))

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const gui = new GUI()
const object1Folder = gui.addFolder('Object1')
object1Folder.add(object1.position, 'x', 0, 10, 0.01).name('X Position')
object1Folder
    .add(object1.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
// y 축도 변경 가능
// object1Folder
//     .add(object1.rotation, 'y', 0, Math.PI * 2, 0.01)
//     .name('Y Rotation')
object1Folder.add(object1.scale, 'x', 0, 2, 0.01).name('X Scale')
object1Folder.open()
const object2Folder = gui.addFolder('Object2')
object2Folder.add(object2.position, 'x', 0, 10, 0.01).name('X Position')
object2Folder
    .add(object2.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
object2Folder.add(object2.scale, 'x', 0, 2, 0.01).name('X Scale')
object2Folder.open()
const object3Folder = gui.addFolder('Object3')
object3Folder.add(object3.position, 'x', 0, 10, 0.01).name('X Position')
object3Folder
    .add(object3.rotation, 'x', 0, Math.PI * 2, 0.01)
    .name('X Rotation')
object3Folder.add(object3.scale, 'x', 0, 2, 0.01).name('X Scale')
object3Folder.open()

const stats = new Stats()
document.body.appendChild(stats.dom)

const debug = document.getElementById('debug1') as HTMLDivElement

function animate() {
    requestAnimationFrame(animate)
    controls.update()
    render()
    const object1WorldPosition = new THREE.Vector3()
    object1.getWorldPosition(object1WorldPosition)
    const object2WorldPosition = new THREE.Vector3()
    object2.getWorldPosition(object2WorldPosition)
    const object3WorldPosition = new THREE.Vector3()
    object3.getWorldPosition(object3WorldPosition)
    // toFixed 는 소숫점 자리 표기하는 js 메서드
    debug.innerText =
        'Red\n' +
        'Local Pos X : ' +
        object1.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object1WorldPosition.x.toFixed(2) +
        '\n' +
        '\nGreen\n' +
        'Local Pos X : ' +
        object2.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object2WorldPosition.x.toFixed(2) +
        '\n' +
        '\nBlue\n' +
        'Local Pos X : ' +
        object3.position.x.toFixed(2) +
        '\n' +
        'World Pos X : ' +
        object3WorldPosition.x.toFixed(2) +
        '\n'
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
```

- 빨간공을 건드리면 초록, 파랑공까지 같이 움직이고 초록공을 건드리면 파랑공, 파랑공은 자기 자신만 움직인다.
- 코드에서 object1.add(object2) 처럼 하나의 개체를 자식요소로 넣을 수 있다.
- 자식 개체는 부모 개체의 영향을 받는다.
