import * as THREE from 'three';
import * as CANNON from 'cannon-es'


const scene = new THREE.Scene();

export class Sphere {
    constructor(mass, material) {

        this.sphere = new CANNON.Body({
            mass,
            shape: new CANNON.Sphere(1, 32, 32),
            material
        })
        this.sphere.position.set(0, 8, 20)
        this.sphere.linearDamping = 0.31
        this.sphere.angularVelocity.set(0, 50, 0)
        this.sphere.angularDamping = 0.5
    }
}