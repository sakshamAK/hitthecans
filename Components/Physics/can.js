import * as THREE from 'three';
import * as CANNON from 'cannon-es'


const scene = new THREE.Scene();

export class Can {
    constructor(mass, positions) {
        const [px, py] = positions;
        console.log(px,py);

        this.can = new CANNON.Body({
            mass,
            shape: new CANNON.Cylinder(0.5, 0.5, 2, 32)
        })
        this.can.position.set(px, py, -15)
    }
}