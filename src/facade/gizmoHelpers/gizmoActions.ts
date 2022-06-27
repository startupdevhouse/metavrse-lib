import { quat, vec3 } from 'gl-matrix';
import { CherryViewer, MoveMesh, Vector3 } from '../../types';

export const createGizmoMeshMapBy = (names: string[]): MoveMesh[] => {
  return names.map((name) => ({
    name,
    type: 'ambient_ratio',
    values: [1, 1, 1],
  }));
};

type UpdateCameraReturn = {
  cameraRight: vec3;
  cameraForward: vec3;
};

export const updateCamera = (viewer: CherryViewer): UpdateCameraReturn => {
  const cameraRight = vec3.create();
  const cameraForward = vec3.create();
  const cameraUp = vec3.fromValues(0, 1, 0);
  const [directionX, directionY, directionZ] = viewer.controls.direction;
  const cameraDirection = vec3.fromValues(directionX, directionY, directionZ);

  vec3.cross(cameraRight, cameraDirection, cameraUp);
  vec3.normalize(cameraRight, cameraRight);
  vec3.cross(cameraForward, cameraDirection, cameraRight);
  vec3.normalize(cameraForward, cameraForward);

  return {
    cameraRight,
    cameraForward,
  };
};

export const quaternionToEuler = (quaternion: quat, rotation: Vector3): vec3 => {
  const [x, y, z, w] = quaternion;

  const t0 = +2.0 * (w * x + y * z);
  const t1 = +1.0 - 2.0 * (x * x + y * y);
  const rollX = Math.atan2(t0, t1);

  let t2 = +2.0 * (w * y - z * x);
  if (t2 > 1) {
    t2 = 1;
  } else if (t2 < -1) {
    t2 = -1;
  }
  const pitchY = Math.asin(t2);

  const t3 = +2.0 * (w * z + x * y);
  const t4 = +1.0 - 2.0 * (y * y + z * z);
  const yawZ = Math.atan2(t3, t4);

  const xyz = vec3.fromValues(
    rollX * (180 / Math.PI),
    pitchY * (180 / Math.PI),
    yawZ * (180 / Math.PI)
  );

  if (xyz.some((element) => isNaN(element))) {
    return [...rotation];
  }

  return xyz;
};

