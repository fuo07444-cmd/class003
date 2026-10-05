let scene, camera, renderer;
let sphere, cube, plane;

// 位置と速度
let sphereY = 10;
let sphereVY = 0;
let cubeY = 10;
let cubeVY = 0;

// 重力
const gravity = -0.4;
const bounce = 0.8; // 反発係数（跳ね返りの強さ）

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
    document.body.appendChild(renderer.domElement);

    // 平面（地面）
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    // 赤いキューブ
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, cubeY, 0);
    scene.add(cube);

    // 青い球
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, sphereY, 2);
    scene.add(sphere);

    // カメラ固定
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    window.addEventListener("resize", onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    // --- 青い球のバウンド ---
    sphereVY += gravity;        // 重力で落ちる
    sphereY += sphereVY;        // 位置更新

    if (sphereY <= 4) {         // 地面に当たったら
        sphereY = 4;
        sphereVY *= -bounce;    // 反発して跳ね返る
    }

    sphere.position.y = sphereY;
    sphere.position.x = 20 + Math.sin(sphereY * 0.2) * 5; // 左右ゆらゆら

    // --- 赤いキューブのバウンド ---
    cubeVY += gravity;
    cubeY += cubeVY;

    if (cubeY <= 4) {
        cubeY = 4;
        cubeVY *= -bounce;
    }

    cube.position.y = cubeY;
    cube.position.x = -4 + Math.sin(cubeY * 0.3) * 5;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
