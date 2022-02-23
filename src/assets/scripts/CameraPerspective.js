// perspective
var create = Module.require('assets/CameraBase.js');
var glMatrix = Module.require('assets/gl-matrix.js');
var mat4 = glMatrix.mat4;
var vec3 = glMatrix.vec3;

module.exports = function cameraPerspective(opt) {
  opt = opt || {}

  var camera = create(opt)
  camera.fov = opt.fov || Math.PI / 4;
  camera.near = opt.near || 1;
  camera.far = opt.far || 100;
  camera.center = [50, 50, 50];

  function viewportMatrix() {
    var x = camera.viewport[2] / 2;
    var y = camera.viewport[3] / 2;

    var m = mat4.fromValues(
      x, 0, 0, 0,
      0, -y, 0, 0,
      0, 0, 1, 0,
      x, y, 0, 1
    );

    return m;
  }

  function update() {
    var aspect = camera.viewport[2] / camera.viewport[3];

    // build projection matrix
    mat4.perspective(
      camera.projection,
      camera.fov,        // 45 degree field of view
      aspect,
      camera.near,
      camera.far
    );

    vec3.add(camera.center, camera.position, camera.direction)
    mat4.lookAt(camera.view, camera.position, camera.center, camera.up);

    return camera;
  }

  // set it up initially from constructor options
  update();
  return Object.assign(camera, {
    update: update,
    viewportMatrix: viewportMatrix
  })
}
