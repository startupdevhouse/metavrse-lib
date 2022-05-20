import { CameraEntity } from '../..';
import { NODE_TYPES } from '../nodeTypes';

export const cameraDefaults: Omit<CameraEntity, 'key'> = {
  type: NODE_TYPES.camera,
  visible: true,
  position: [0, 1, 2],
  target: [0, 0, 0],
  distance: 2,
};
