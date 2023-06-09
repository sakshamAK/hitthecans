import * as THREE from "three"

export class canMesh{
    constructor() {
        const material = new THREE.MeshStandardMaterial({ color: "red", metalness: 0.5 })
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
}