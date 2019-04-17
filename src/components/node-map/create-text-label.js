import * as THREE from 'three'


export default () => {
  const div = document.createElement('div');
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
