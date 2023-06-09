import * as THREE from 'three';
import * as CANNON from 'cannon-es'


const scene = new THREE.Scene();

export class Plane {
    constructor(material) {

        this.plane = new CANNON.Body({
            shape: new CANNON.Box(new CANNON.Vec3(20, 30, 0.1)),
            type: CANNON.Body.STATIC,
            material
        })

        this.plane.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up
    }
}