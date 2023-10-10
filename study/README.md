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

- npm install three (node 깔려있어야함)

src/js/index.js

```
import * as THREE from "../../node_modules/three/build/three.module";

console.log(THREE)
```
