let scene, camera, renderer;
let sphereGeometry, sphere, cube, plane;

// カメラ公転用
let cameraAngle = 0;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 軸
    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // 平面
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    // 立方体
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    // 球
    sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    // カメラ初期位置
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    window.addEventListener("resize", onWindowResize);
}

let step = 0;

function animate() {
    requestAnimationFrame(animate);

    // --- 球の上下運動（元の動き） ---
    step += 0.04;
    sphere.position.y = 4 + Math.abs(Math.sin(step)) * 10;

    // --- 自転（Y軸回転） ---
    cube.rotation.y += 0.01;
    sphere.rotation.y += 0.01;
    plane.rotation.z += 0.005;

    // --- カメラの公転（Y軸の周りを回る） ---
    cameraAngle += 0.01;
    const radius = 50;

    camera.position.x = radius * Math.cos(cameraAngle);
    camera.position.z = radius * Math.sin(cameraAngle);
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
