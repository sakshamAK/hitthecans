import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as CANNON from 'cannon-es'
import { Can, canMesh, Sphere, Plane, sphereMesh, planeMesh, Directional } from './Components/';

const Xvel = document.getElementById("Xvelocity")
const Yvel = document.getElementById("Yvelocity")
const Zvel = document.getElementById("Zvelocity")
const resetBallMobile = document.getElementById("reset-ball")
const resetCansMobile = document.getElementById("reset-pins")
const canPos = [[8.8, 1, -15], [10.4, 1, -15], [12, 1, -15], [9.6, 4, -15], [11.2, 4, -15], [10.4, 8, -15]]

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const sphereMat = new CANNON.Material();
const planeMat = new CANNON.Material();

const meshCan = canPos.map(() => new canMesh().mesh);
const meshSphere = new sphereMesh().mesh
const meshPlane = new planeMesh().mesh;

const can = canPos.map((_, idx) => new Can(5, canPos[idx]).can);
const sphere = new Sphere(1, sphereMat).sphere
const plane = new Plane().plane;

const directionalLight = new Directional([5, 5, 10]).dl;
const directionalLight2 = new Directional([0, 5, 4]).dl;

// ==========================PHYSICS WORLD=================================

const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
})

can.map(cans => world.addBody(cans))
world.addBody(sphere)
world.addBody(plane)

world.addContactMaterial(new CANNON.ContactMaterial(
    planeMat,
    sphereMat,
    { restitution: 0.6 }
))


// ==========================PHYSICS WORLD ENDS=================================


//  initiate scene, camera and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.y = 5;
camera.position.z = 30;

// Adding Orbital Controls
const controls = new OrbitControls(camera, renderer.domElement);

//initiating shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;

document.body.appendChild(renderer.domElement);

// Creating mesh and lights
scene.add(meshPlane)
scene.add(meshSphere)
meshCan.map(item => scene.add(item))
scene.add(directionalLight)
scene.add(directionalLight2)

function animate() {
    requestAnimationFrame(animate);

    meshCan.map((item, idx) => {
        item.position.copy(can[idx].position)
        item.quaternion.copy(can[idx].quaternion)
    })

    meshSphere.position.copy(sphere.position)
    meshPlane.position.copy(plane.position)
    meshPlane.quaternion.copy(plane.quaternion)

    renderer.render(scene, camera);
    world.fixedStep()
}

function render() {
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects([meshSphere]);

    if (intersects.length > 0) return intersects[0]?.object?.name

    renderer.render(scene, camera);
}

window.addEventListener('pointermove', (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
});

window.addEventListener('click', (e) => {
    if (render() === "ball")
        sphere.velocity.set(Number(Xvel.value), Number(Yvel.value), -Number(Zvel.value));
})

window.addEventListener("keydown", e => {
    console.log(e.key);
    if (e.key === "r") {
        sphere.position.set(0, 8, 20)
        sphere.velocity.set(0, 0, 0)
    }
    if (e.key === "t") {
        can.map((item, idx) => {
            item.position.set(...canPos[idx])
            item.velocity.set(0, 0, 0)
            item.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0);
            item.angularVelocity.set(0, 0, 0);
        })
    }
})

resetBallMobile.addEventListener("click", () => {
    sphere.position.set(0, 8, 20)
    sphere.velocity.set(0, 0, 0)
})

resetCansMobile.addEventListener("click", () => {
    can.map((item, idx) => {
        item.position.set(...canPos[idx])
        item.velocity.set(0, 0, 0)
        item.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), 0);
        item.angularVelocity.set(0, 0, 0);
    })
})

animate();
controls.update();