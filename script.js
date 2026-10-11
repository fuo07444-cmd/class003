let scene, camera, renderer, sphereGeometry, sphere, cube, plane;

// 青い球の動き
let sphereStep = 0;

// 赤いCubeの動き
let cubeStep = 0;
let orbitAngle = 0;

// 重力と反発
const gravity = -0.012;
const bounce = 0.95;

let sphereY = 4;
let sphereVY = 0;

let cubeY = 2;
let cubeVY = 0;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 座標軸
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // 地面
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc
    });

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(10, 0, 0);
    scene.add(plane);

    // 赤いCube
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    scene.add(cube);

    // 青い球
    sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // カメラ
    camera.position.set(-30, 40, 30);
    camera.lookAt(10, 5, 0);

    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // 青い球：高く跳ねながら左右に移動
    sphereStep += 0.04;

    sphere.position.x = 20 + 10 * Math.cos(sphereStep);

    sphereVY += gravity;
    sphereY += sphereVY;

    if (sphereY <= 4) {
        sphereY = 4;
        sphereVY = Math.abs(sphereVY) * bounce;
    }

    sphere.position.y = sphereY;
    sphere.position.z = 2;

    // 赤いCube：上下に跳ねる
    cubeVY += gravity;
    cubeY += cubeVY;

    if (cubeY <= 2) {
        cubeY = 2;
        cubeVY = Math.abs(cubeVY) * bounce;
    }

    // Y軸の周りを公転
    orbitAngle += 0.02;

    const radius = 12;
    cube.position.x = 10 + radius * Math.cos(orbitAngle);
    cube.position.z = radius * Math.sin(orbitAngle);
    cube.position.y = cubeY;

    // Cube自身が自転
    cube.rotation.x += 0.03;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
}

// ウィンドウサイズ変更
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();