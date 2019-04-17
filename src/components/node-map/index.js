import React, { Component } from 'react'
import * as THREE from 'three'
import Style from './node-map.module.css'

class NodeMap extends Component {
  constructor(props) {
    super(props)

    this.animate = this.animate.bind(this)
    this.addSphere = this.addSphere.bind(this)
    this.initializeCamera = this.initializeCamera.bind(this)
  }
  componentDidMount() {
    this.textlabels = []
    const width = this.mount.clientWidth
    const height = this.mount.clientHeight
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(width, height)
    this.mount.appendChild(this.renderer.domElement)
    this.initializeCamera();
    
    const geometry = new THREE.SphereGeometry(0.1)
    const lineMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } )
    this.sphere = new THREE.Mesh( geometry, material )
    this.sphere2 = new THREE.Mesh( geometry, material )
    this.sphere2.position.y = -1
    this.sphere.position.y = 1
    const lineGeometry = new THREE.Geometry();
    const { x: s1x, y: s1y, z: s1z } = this.sphere.position
    const { x: s2x, y: s2y, z: s2z } = this.sphere2.position
    lineGeometry.vertices.push(new THREE.Vector3(s1x, s1y, s1z))
    lineGeometry.vertices.push(new THREE.Vector3(s2x, s2y, s2z))
    this.line = new THREE.Line(lineGeometry, lineMaterial)
    this.scene.add( this.sphere )
    this.scene.add( this.sphere2 )
    this.scene.add( this.line )


    const text = this.createTextLabel()
    text.setHTML('Node A')
    text.setParent(this.sphere)
    text.setContainer(this.mount)
    this.textlabels.push(text)
    this.mount.appendChild(text.element)

    const text2 = this.createTextLabel()
    text2.setHTML('Node B')
    text2.setParent(this.sphere2)
    text2.setContainer(this.mount)
    this.textlabels.push(text2)
    this.mount.appendChild(text2.element)

    this.animate()
  }
  componentWillUnmount() {
    cancelAnimationFrame(this.frameId);
    this.mount.removeChild(this.renderer.domElement);
  }
  initializeCamera() {
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 4
  }
  animate() {
    this.frameId = window.requestAnimationFrame(this.animate)
    this.renderer.render(this.scene, this.camera)
    for(var i=0; i<this.textlabels.length; i++) {
      this.textlabels[i].updatePosition();
    }
    this.sphere.rotation.y += 0.01
    this.sphere2.rotation.y += 0.01
  }
  addSphere(sphere) {
    this.scene.add(sphere);
  }
  createTextLabel = () => {
    var div = document.createElement('div');
    div.className = 'text-label';
    div.style.position = 'absolute';
    div.style.width = 100;
    div.style.height = 100;
    div.innerHTML = "hi there!";
    div.style.top = -1000;
    div.style.left = -1000;
    
    var _this = this;
    
    return {
      element: div,
      parent: false,
      position: new THREE.Vector3(0,0,0),
      setHTML: function(html) {
        this.element.innerHTML = html
      },
      setParent: function(threejsobj) {
        this.parent = threejsobj
      },
      setContainer: function(container) {
        this.container = container
      },
      updatePosition: function() {
        if(this.parent) {
          this.position.copy(this.parent.position)
        }
        
        var coords2d = this.get2DCoords(this.position, _this.camera)
        this.element.style.left = coords2d.x + 'px'
        this.element.style.top = coords2d.y + 'px'
      },
      get2DCoords: function(position, camera) {
        var vector = position.project(camera)
        vector.x = (vector.x + 1)/2 * ((window.innerWidth * 0.3)) 
        vector.y = -(vector.y - 1.03)/2 * ((window.innerWidth * 0.3))
        return vector
      }
    }
  }
  render() {
    return (
      <div
        id='node-map-canvas'
        className={Style.map} 
        ref={mount => {
          this.mount = mount;
        }}
      />
    )
  }
}

export default NodeMap
