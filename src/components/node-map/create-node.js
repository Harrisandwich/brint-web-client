import * as THREE from 'three'


export default (pos) => {
  const geometry = new THREE.SphereGeometry(0.1)
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  const node = new THREE.Mesh( geometry, material )
  node.position.y = pos.y
  node.position.x = pos.x
}
