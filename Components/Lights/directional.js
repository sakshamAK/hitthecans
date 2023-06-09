import * as THREE from "three"

export class Directional {
    constructor(direction) {
        const [lx, ly, lz] = direction;
        this.dl = new THREE.DirectionalLight("white", 0.7);
        this.dl.position.set(lx, ly, lz)
        this.dl.castShadow = true
    }
}