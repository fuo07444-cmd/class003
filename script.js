// シーンを作成
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// カメラを作成
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(40, 35, 50);
camera.lookAt(0, 5, 0);

// レンダラーを作成
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 光源
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 20, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// 地面
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshBasicMaterial({
    color: 0xeeeeee,
    side: THREE.DoubleSide
});
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
scene.add(ground);

// 赤いキューブ
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

// 青いボール
const sphereGeometry = new THREE.SphereGeometry(4, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 20;
scene.add(sphere);

// アニメーション用の変数
let step = 0;
let orbitAngle = 0;

// アニメーション
function animate() {
    requestAnimationFrame(animate);

    step += 0.04;
    orbitAngle += 0.02;

    // 青いボール：上下に高く跳ねる
    sphere.position.y = 4 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：上下に高く跳ねる
    cube.position.y = 2 + 10 * Math.abs(Math.sin(step));

    // 赤いキューブ：Y軸の周りを公転する
    cube.position.x = 10 + 12 * Math.cos(orbitAngle);
    cube.position.z = 12 * Math.sin(orbitAngle);

    // 赤いキューブ：自転する
    cube.rotation.x += 0.03;
    cube.rotation.y += 0.05;

    renderer.render(scene, camera);
}

animate();

// ウィンドウサイズ変更に対応
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});