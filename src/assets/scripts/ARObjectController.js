var glMatrix = Module.require('assets/gl-matrix.js');
var mat4 = glMatrix.mat4;
var vec2 = glMatrix.vec2;
var vec3 = glMatrix.vec3;
var quat = glMatrix.quat;

var Y_UP = [0, 1, 0]
var EPSILON = Math.pow(2, -23)
var tmpVec3 = [0, 0, 0]

module.exports = (opt) => {
  opt = opt || {}

  var inputDelta = [0, 0, 0, 0, 0]; // x rot, y rot, zoom, x pan, y pan
  var offset = [0, 0, 0]

  var upQuat = [0, 0, 0, 1];
  var upQuatInverse = upQuat.slice();
  var _phi = opt.phi || Math.PI / 2;
  var _theta = opt.theta || 0;

  var mouseStart = [0, 0]
  var dragging = false;
  var tapStart = 0;

  var touchA = [0, 0]; var touchAStart = [0, 0];
  var touchB = [0, 0]; var touchBStart = [0, 0];
  var touchAngles = [0, 0];
  var resetTouch = false;
  var resetPan = true;

  var controls = {
    update: update,
    up: opt.up ? opt.up.slice() : [0, 1, 0],
    scale: opt.scale || 1,

    // for constant damp
    damping: opt.damping || 0.260,
    rotateSpeed: opt.rotateSpeed || 0.4,
    zoomSpeed: opt.zoomSpeed || 0.024,
    pinchSpeed: opt.pinchSpeed || 0.024,
    panSpeed: opt.panSpeed || 0.16,

    pinch: opt.pinching !== false,
    zoom: opt.zoom !== false,
    rotate: opt.rotate !== false,

    phiBounds: opt.phiBounds || [0, Math.PI],
    thetaBounds: opt.thetaBounds || [-Infinity, Infinity],
    distanceBounds: opt.distanceBounds || [0, Infinity],
    pinchBounds: opt.pinchBounds || [-6, 6],
    scaleBounds: opt.scaleBounds || [0.1, Infinity],

    onMouseEvent: onMouseEvent,
    onScroll: inputZoom,
    onTouchEvent: onTouchEvent,
    onTap: null,
    viewport: [1,0,1920,1080],

    matrix: mat4.create(),

    zoomFactor: (opt.zoomFactor ? (400 / opt.zoomFactor) : 20),
    rotateFactor: opt.rotateFactor || 100,
  }

  function quatFromVec3(out, a, b) {
    var tmp = [0, 0, 0]
    var EPS = 1e-6
    // assumes a and b are normalized
    var r = vec3.dot(a, b) + 1
    if (r < EPS) {
      /* If u and v are exactly opposite, rotate 180 degrees
       * around an arbitrary orthogonal axis. Axis normalisation
       * can happen later, when we normalise the quaternion. */
      r = 0
      if (Math.abs(a[0]) > Math.abs(a[2])) {
        vec3.set(tmp, -a[1], a[0], 0)
      } else {
        vec3.set(tmp, 0, -a[2], a[1])
      }
    } else {
      /* Otherwise, build quaternion the standard way. */
      vec3.cross(tmp, a, b)
    }

    out[0] = tmp[0]
    out[1] = tmp[1]
    out[2] = tmp[2]
    out[3] = r
    vec3.normalize(out, out)
    return out
  }

  function clamp(value, min, max) {
    return min < max
      ? (value < min ? min : value > max ? max : value)
      : (value < max ? max : value > min ? min : value)
  }

  function vec2Angle(p1, p2) {
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
  }

  function minAngle(a, b) {
    var phi = Math.abs(b - a) % 360;
    var angle = phi > 180 ? 360 - phi : phi;
    return angle;
  }

  function onMouseEvent(event, button, x, y) {
    //    console.log(event, button, x, y)
    var width = controls.viewport[2];
    var height = controls.viewport[3];

    var mouseEnd = [x, y];
    if (event == 1) {
      // on press
      mouseStart[0] = mouseEnd[0];
      mouseStart[1] = mouseEnd[1];

      tapStart = Date.now();
      return;
    }

    if (event == 0) {
      if (!dragging && Date.now() - tapStart < 200) {
        if (controls.onTap != null) controls.onTap(button, x, y);
      }

      dragging = false;
    }

    if (event == 2) {
      dragging = true;
    }

    var dx = (mouseEnd[0] - mouseStart[0]) / width;
    var dy = (mouseEnd[1] - mouseStart[1]) / height;

    var PI2 = Math.PI * 2;

    if (button == 0) {
      // rotate
      inputDelta[0] -= PI2 * dx * controls.rotateSpeed;
      inputDelta[1] -= PI2 * dy * controls.rotateSpeed;
    } else if (button == 2) {
      // pan
      inputDelta[3] -= PI2 * dx * controls.panSpeed * (controls.scale / 2);
      inputDelta[4] -= PI2 * dy * controls.panSpeed * (controls.scale / 2);
    }

    if (mouseStart[0] == mouseEnd[0] && mouseStart[1] == mouseEnd[1]) {
      dragging = false;
    }

    mouseStart[0] = mouseEnd[0];
    mouseStart[1] = mouseEnd[1];
  }

  function onTouchEvent(event, touches, pointer, x, y) {
    //    console.log(event, touches, pointer, x, y)

    var touchEnd = [x, y];
    if (pointer == 0 && event == 1) {
      // on first finger touch
      touchAStart[0] = touchA[0] = touchEnd[0];
      touchAStart[1] = touchA[1] = touchEnd[1];
    }

    if (touches == 1) {
      if (resetTouch) { dragging = true; resetTouch = false; onMouseEvent(1, 0, x, y); }
      return onMouseEvent(event, 0, x, y);
    }

    if (pointer == 1 && event == 1) {
      // on second finger touch
      touchBStart[0] = touchB[0] = touchEnd[0];
      touchBStart[1] = touchB[1] = touchEnd[1];
      return;
    }

    var distanceNow = vec2.distance(touchA, touchB);

    if (event == 2) {
      dragging = true;

      if (pointer == 0) {
        touchA[0] = touchEnd[0];
        touchA[1] = touchEnd[1];
        touchAngles[0] = vec2Angle(touchAStart, touchA);
        touchAngles[0] = (touchAngles[0] < 0) ? 360 + touchAngles[0] : touchAngles[0];
      } else if (pointer == 1) {
        touchB[0] = touchEnd[0];
        touchB[1] = touchEnd[1];
        touchAngles[1] = vec2Angle(touchBStart, touchB);
        touchAngles[1] = (touchAngles[1] < 0) ? 360 + touchAngles[1] : touchAngles[1];
      }

      // determine pinch distance
      var distanceAfter = vec2.distance(touchA, touchB);
      var deltaDistance = distanceAfter - distanceNow;
      deltaDistance = clamp(deltaDistance, controls.pinchBounds[0], controls.pinchBounds[1]);

      var midX = (touchA[0] + touchB[0]) / 2;
      var midY = (touchA[1] + touchB[1]) / 2;
      if (resetPan) { resetPan = false; onMouseEvent(1, 2, midX, midY); }
      else onMouseEvent(event, 2, midX, midY);

      inputPinch(deltaDistance);

    }

    if (event == 0 && (pointer == 0 || pointer == 1)) {
      resetTouch = true;
      resetPan = true;
      dragging = false;
    }

  }

  function inputZoom(delta) {
    inputDelta[2] -= delta * controls.zoomSpeed;
  }

  function inputPinch(delta) {
    inputDelta[2] -= delta * controls.pinchSpeed;
  }

  function updateDirection() {
//      var inputDelta = [0, 0, 0, 0, 0]; // x rot, y rot, zoom, x pan, y pan
    var xrot = inputDelta[0] * controls.rotateFactor;
    var yrot = inputDelta[1] * controls.rotateFactor;

    offset = [
        offset[0] + xrot,
        offset[1] + yrot,
        0
    ]

    if (inputDelta[2]<0)
    {
        // make big
        var d = (Math.abs(inputDelta[2]) / controls.zoomFactor) *  controls.scale;
        controls.scale += d;
    }else{
        // make small
        var d = (inputDelta[2] / controls.zoomFactor) * controls.scale;
        controls.scale -= d;
    }

    controls.scale = clamp(controls.scale, controls.scaleBounds[0], controls.scaleBounds[1]);

    var m = mat4.create();
    var scale = vec3.fromValues(controls.scale,controls.scale,controls.scale);
    var axisX = vec3.fromValues(1, 0, 0);
    var axisY = vec3.fromValues(0, 1, 0);
    var axisZ = vec3.fromValues(0, 0, 1);
    mat4.scale(m, m, scale);
//    mat4.rotate(m, m, offset[0] * (Math.PI / 180), axisX);
    mat4.rotate(m, m, -offset[0] * (Math.PI / 180), axisY);
//    mat4.rotate(m, m, offset[2], axisZ);

    controls.matrix = m;
  }

  function update() {
    updateDirection()

      var damp = typeof controls.damping === 'number' ? controls.damping : 1
      var isDirty = false;
      for (var i = 0; i < inputDelta.length; i++) {
        inputDelta[i] = inputDelta[i] * (1 - damp)
        if (Math.abs(inputDelta[i]) <= 0.000001) inputDelta[i] = 0;
        else if (Math.abs(inputDelta[i]) > 0) isDirty = true;
      }

      return isDirty;
  }


  return Object.defineProperties(controls, {})
}

