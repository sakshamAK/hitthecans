import * as THREE from "three"

export class planeMesh{
    constructor() {
        const material = new THREE.MeshStandardMaterial({ color: "teal" })
        const geometry = new THREE.PlaneGeometry(40, 60, 2);
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
}