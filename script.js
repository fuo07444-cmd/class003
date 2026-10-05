let scene, camera, renderer;
let sphere, cube, plane;

let step = 0;

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

    // カメラ固定
    camera.position.set(-30, 40, 30);
    camera.lookAt(scene.position);

    window.addEventListener("resize", onWindowResize);
}

function animate() {
    requestAnimationFrame(animate);

    step += 0.05;

    // --- 青い球：ぽーんぽーん（上下＋左右） ---
    sphere.position.y = 4 + Math.abs(Math.sin(step)) * 10; // 下で速く上でゆっくり
    sphere.position.x = 20 + Math.sin(step * 0.7) * 6;     // 左右にゆっくり揺れる

    // --- 赤いキューブ：ぽーんぽーん（上下＋左右） ---
    cube.position.y = 3 + Math.abs(Math.sin(step * 1.2)) * 8;
    cube.position.x = -4 + Math.sin(step * 0.9) * 5;

    // --- 自転（軽く） ---
    cube.rotation.y += 0.02;
    sphere.rotation.y += 0.02;

    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
