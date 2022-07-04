import {
  addOpacityTextures,
  addTexturesToGizmo, controlDisplayOfArrows, controlDisplayOfGizmoArms, controlDisplayOfGizmos,
  controlDisplayOfScaleCubes,
  divideMeshesToMoveAndScale, setGizmoRotateInitialMeshes, setInitialMeshes
} from './gizmoHelpers/gizmoTextures';
import { getNewPoints, getNewRotate, updatePosition } from './gizmoHelpers/gizmoMove';
import { createGizmoMeshMapBy, quaternionToEuler, updateCamera } from './gizmoHelpers/gizmoActions';
import {
  adjustGizmoScale,
  calculateNewPosition, calculateScalesGizmo,
  createGizmoObject, handleAddChangeListener,
  handleRemoveChangeListener, manipulateGizmoPosition, prepareNewTarget,
  resetGizmo, rotateAlign
} from './gizmoHelpers/gizmo';
import { CherryViewer } from '../types';

export const gizmoFacade = (cherryViewer: CherryViewer) => {
  // TODO: Methods that are used only in facade could be defined here, not in helpers.
  // Think about some better way of handling multiple helpers

  return {
    addTexturesToGizmo,
    addOpacityTextures,
    divideMeshesToMoveAndScale,
    controlDisplayOfScaleCubes,
    controlDisplayOfArrows,
    controlDisplayOfGizmos,
    controlDisplayOfGizmoArms,
    setInitialMeshes,
    setGizmoRotateInitialMeshes,
    getNewPoints,
    updatePosition,
    getNewRotate,
    createGizmoMeshMapBy,
    quaternionToEuler,
    updateCamera,
    adjustGizmoScale,
    createGizmoObject,
    resetGizmo,
    calculateNewPosition,
    handleRemoveChangeListener,
    handleAddChangeListener,
    prepareNewTarget,
    calculateScalesGizmo,
    manipulateGizmoPosition,
    rotateAlign
  }

}
