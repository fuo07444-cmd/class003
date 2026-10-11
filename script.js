let scene, camera, renderer;
let sphere, cube, plane;

// 青い球の位置と速度
let sphereY = 10;
let sphereVY = 0;
let sphereX = 20;
let sphereVX = 0.15;

// 赤い立方体の位置と速度
let cubeY = 10;
let cubeVY = 0;
let cubeX = -4;
let cubeVX = 0.12;

// 重力と反発
const gravity = -0.025;
const bounce = 0.9;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setClearColor(0xEEEEEE);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 地面
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0xcccccc
    });

    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(10, 0, 0);
    scene.add(plane);

    // 赤い立方体
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });

    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(cubeX, cubeY, 0);
    scene.add(cube);

    // 青い球
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });

    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(sphereX, sphereY, 2);
    scene.add(sphere);

    // カメラ
    camera.position.set(-30, 40, 30);
    camera.lookAt(10, 5, 0);

    window.addEventListener("resize", onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // 青い球：上下に跳ねながら左右に移動
    sphereVY += gravity;
    sphereY += sphereVY;
    sphereX += sphereVX;

    if (sphereY <= 4) {
        sphereY = 4;
        sphereVY = Math.abs(sphereVY) * bounce;
    }

    if (sphereX >= 30 || sphereX <= 10) {
        sphereVX *= -1;
    }

    sphere.position.set(sphereX, sphereY, 2);

    // 赤い立方体：上下に跳ねながら左右に移動
    cubeVY += gravity;
    cubeY += cubeVY;
    cubeX += cubeVX;

    if (cubeY <= 2) {
        cubeY = 2;
        cubeVY = Math.abs(cubeVY) * bounce;
    }

    if (cubeX >= 25 || cubeX <= -10) {
        cubeVX *= -1;
    }

    cube.position.set(cubeX, cubeY, 0);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();