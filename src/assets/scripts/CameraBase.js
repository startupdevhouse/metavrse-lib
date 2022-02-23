var glMatrix = Module.require('assets/gl-matrix.js');
var mat4 = glMatrix.mat4;
var vec3 = glMatrix.vec3;

module.exports = function cameraBase (opt) {
  opt = opt || {}

  var camera = {
    projection : mat4.create(),
    view : mat4.create(), // lookat matrix
    position : opt.position || [0,0,0],
    direction : opt.direction || [0,0,-1],
    up : opt.up || [0,1,0],
    viewport: opt.viewport || [ 0, 0, 1024, 768 ],
  }

  function lookAt (target) {
    mat4.lookAt(camera.view, camera.position, target, camera.up);
    return camera;
  }

  function identity () {
    vec3.set(camera.position, 0, 0, 0);
    vec3.set(camera.direction, 0, 0, -1);
    vec3.set(camera.up, 0, 1, 0);
    mat4.identity(camera.view);
    mat4.identity(camera.projection);
    return camera;
  }

  function translate (vec) {
    vec3.add(camera.position, camera.position, vec);
    return camera;
  }

  return Object.assign(camera, {
    translate: translate,
    identity: identity,
    lookAt: lookAt,
  })
}