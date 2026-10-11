let scene, camera, renderer, sphereGeometry, sphere, cube, plane;

// once everything is loaded, we run our Three.js stuff.
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

    // show axes in the screen
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(60, 20);
    var planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    plane = new THREE.Mesh(planeGeometry, planeMaterial);

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;

    scene.add(plane);

    // 赤いキューブ
    var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    var cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-4, 3, 0);
    scene.add(cube);

    // 青い球
    sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
    });
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(20, 4, 2);
    scene.add(sphere);

    // カメラ
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);

    document.body.appendChild(renderer.domElement);

    renderer.render(scene, camera);
}

let step = 0;
let orbitAngle = 0; // ← 赤いキューブの公転角度

function animate() {
    requestAnimationFrame(animate);

    step += 0.04;
    orbitAngle += 0.03; // ← 円運動の角度（公転）

    // 青い球：左右ゆらゆら＋上下ぽーん
    sphere.position.x = 20 + 10 * Math.cos(step);
    sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // ★★★ 赤いキューブ：上下に跳ねる ★★★
    cube.position.y = 3 + 10 * Math.abs(Math.sin(step));

    // ★★★ 赤いキューブ：Y軸の周りを公転（円運動） ★★★
    cube.position.x = 10 + 12 * Math.cos(orbitAngle);
    cube.position.z = 12 * Math.sin(orbitAngle);

    // ★★★ 赤いキューブ：自転（勢い弱め） ★★★
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.015;

    renderer.render(scene, camera);
}

/* ウィンドウ変更時にサイズを維持する処理 */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

init();
animate();
