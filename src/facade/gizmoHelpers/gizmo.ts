import {
  CherrySurfaceScene,
  CherrySurfaceSceneObject,
  CherryViewer,
  ISelectedObject,
  TargetConfig, UpdateTypes,
  Vector3
} from '../../types';
import { mat3, mat4, vec3, vec4 } from 'gl-matrix';

export const adjustGizmoScale = (
  viewer: CherryViewer,
  quatLocal: vec4,
  gizmo: CherrySurfaceSceneObject,
  gizmoXYZ: Float32Array | Vector3
): void => {
  const fm2 = mat4.create();
  mat4.fromRotationTranslation(fm2, quatLocal, gizmoXYZ);

  const distance = viewer.controls.distance;
  const GIZMO_SCALE_DIVIDER = 10;
  const smallestSquare = vec3.fromValues(
    distance / GIZMO_SCALE_DIVIDER,
    distance / GIZMO_SCALE_DIVIDER,
    distance / GIZMO_SCALE_DIVIDER
  );

  mat4.scale(fm2, fm2, smallestSquare);
  gizmo.setTransformMatrix(fm2);
};

export const calculateScalesGizmo = (
  extents: TargetConfig,
  extentsGizmo: Record<string, number> | undefined,
  target: ISelectedObject
): Vector3 | [] => {
  if (!extents || !extentsGizmo || !target?.key) {
    return [];
  }

  const extentsTarget = extents[target.key];

  return [
    extentsTarget.f1 / extentsGizmo.f1,
    extentsTarget.f2 / extentsGizmo.f2,
    extentsTarget.f3 / extentsGizmo.f3,
  ];
};

export const createGizmoObject = (
  scene: CherrySurfaceScene,
  key: string,
  path: string
): CherrySurfaceSceneObject => {
  const gizmo = scene.addObject(key, path);
  gizmo?.setParameter('visible', false);
  gizmo?.setParameter('gizmo', true);

  return gizmo;
};

export const prepareNewTarget = (
  targetPositions: TargetConfig,
  target: ISelectedObject,
  // TODO: [MET-1780] Remove if fixed types
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  node: any,
  type: 'center' | 'extent'
): TargetConfig => {
  if (!target.key) {
    return targetPositions;
  }

  const newTarget = { ...targetPositions };

  const canUpdateTargetPositions =
    (!targetPositions || targetPositions[target.key] === undefined) &&
    newTarget;

  if (canUpdateTargetPositions) {
    newTarget[target.key] = node?.getParameterVec3(type);
  }

  return newTarget;
};

export const manipulateGizmoPosition = (
  target: ISelectedObject,
  extentsGizmo: Record<string, number> | undefined,
  extentsTarget: TargetConfig,
  gizmoMatrix: mat4,
  targetPivot: Vector3
): void => {
  const [scaleX, scaleY, scaleZ] = calculateScalesGizmo(
    extentsTarget,
    extentsGizmo,
    target
  );

  if (!scaleX || !scaleY || !scaleZ) {
    return;
  }

  const scale = vec3.fromValues(scaleX, scaleY, scaleZ);
  mat4.scale(gizmoMatrix, gizmoMatrix, scale);

  const matrix = mat4.create();
  const pivotTarget = mat4.create();
  const miTarget = mat4.create();

  const [pivotX, pivotY, pivotZ] = targetPivot;

  if (scaleX && scaleY && scaleZ) {
    mat4.translate(
      pivotTarget,
      pivotTarget,
      vec3.fromValues(-pivotX / scaleX, -pivotY / scaleY, -pivotZ / scaleZ)
    );
    mat4.invert(miTarget, pivotTarget);
    mat4.multiply(matrix, matrix, miTarget);
    mat4.multiply(gizmoMatrix, gizmoMatrix, matrix);
  }
};

export const resetGizmo = (
  gizmo: CherrySurfaceSceneObject,
  gizmoRotate: CherrySurfaceSceneObject,
  viewer: CherryViewer,
  resetGizmo: () => void,
  hideGizmo: () => void
): void => {
  resetGizmo()
  gizmo.setParameter('visible', false);
  gizmoRotate.setParameter('visible', false);
  hideGizmo()
  viewer.ProjectManager.isDirty = true;
};

export const handleRemoveChangeListener = (
  viewer: CherryViewer,
  key: string,
  updateGizmo: (type: UpdateTypes) => void
): void => {
  const object = viewer.ProjectManager.getObject(key);

  if (object) {
    object.removeChangeListener((type: UpdateTypes) => {
      updateGizmo(type)
    });
  }
};

export const handleAddChangeListener = (
  viewer: CherryViewer,
  key: string,
  updateGizmo: (type: UpdateTypes) => void
): void => {
  const object = viewer.ProjectManager.getObject(key);

  if (object) {
    object.addChangeListener((type: UpdateTypes) => {
      updateGizmo(type)
    });
  }
};

export const calculateNewPosition = (viewer: CherryViewer, position3D: vec3): vec3 => {
  const { width: screenWidth, height: screenHeight } = viewer.screen;
  const [posX, posY, posZ] = position3D;
  const position = vec3.fromValues(posX, posY, posZ);
  const m4 = mat4.clone(viewer.camera.view);

  mat4.multiply(m4, viewer.camera.projection, m4);
  vec3.transformMat4(position, position, m4);

  const [positionX, positionY, positionZ] = position;

  return vec3.fromValues(
    ((positionX + 1) * screenWidth) / 2,
    ((-positionY + 1) * screenHeight) / 2,
    positionZ
  );
};

export const rotateAlign = (direction: Vector3, up: Vector3)=> {
  const xAxis = vec3.create();
  vec3.cross(xAxis, up, direction);
  vec3.normalize(xAxis, xAxis);

  let yAxis = vec3.create();
  vec3.cross(yAxis, direction, xAxis);
  vec3.normalize(yAxis, yAxis);

  return mat3.fromValues(
    xAxis[0],
    xAxis[1],
    xAxis[2],
    yAxis[0],
    yAxis[1],
    yAxis[2],
    direction[0],
    direction[1],
    direction[2],
  );
}
