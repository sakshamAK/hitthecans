import * as THREE from "three"

export class sphereMesh{
    constructor() {
        const material = new THREE.MeshStandardMaterial({ color: "orangered", metalness: 0.5 })
        const geometry = new THREE.SphereGeometry(1, 15, 15);
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.mesh.name = "ball";
    }
}