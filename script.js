let scene, camera, renderer, sphere, cube, plane;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(-30, 20, 40);
    camera.lookAt(scene.position);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // 地面
    const planeGeometry = new THREE.PlaneGeometry(60, 20);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    // 赤いキューブ
    const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    // 青い球
    const sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    document.body.appendChild(renderer.domElement);
}

let step = 0;
let orbitAngle = 0;

function animate() {
    requestAnimationFrame(animate);

    step += 0.04;
    orbitAngle += 0.03;

    // 青い球：上下に跳ねる
    sphere.position.y = 4 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：跳ねる
    cube.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：公転（円運動）
    cube.position.x = 10 + 12 * Math.cos(orbitAngle);
    cube.position.z = 12 * Math.sin(orbitAngle);

    // 赤いキューブ：自転
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.07;

    renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
animate();
