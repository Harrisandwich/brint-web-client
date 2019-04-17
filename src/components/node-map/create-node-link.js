import * as THREE from 'three'


export default (n1, n2) => {
  const lineGeometry = new THREE.Geometry();
  const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
  const { x: s1x, y: s1y, z: s1z } = n1.position
  const { x: s2x, y: s2y, z: s2z } = n2.position
  lineGeometry.vertices.push(new THREE.Vector3(s1x, s1y, s1z))
  lineGeometry.vertices.push(new THREE.Vector3(s2x, s2y, s2z))
  const line = new THREE.Line(lineGeometry, lineMaterial)
  return line
}
