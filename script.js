let scene, camera, renderer, sphereGeometry, sphere, cube, plane;

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

    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(15, 0, 0);
    scene.add(plane);

    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    document.body.appendChild(renderer.domElement);
}

let step = 0;
let orbitAngle = 0;

function animate() {
    requestAnimationFrame(animate);

    step += 0.04;
    orbitAngle += 0.03;

    // 青い球：左右ゆらゆら＋上下ぽーん
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：上下に跳ねる
    cube.position.y = 3 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：Y軸の周りを公転（円運動）
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
