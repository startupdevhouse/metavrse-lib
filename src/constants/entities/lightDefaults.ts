import { mat4 } from 'gl-matrix';
import { NODE_TYPES } from '../nodeTypes';
import { LightEntity } from '../..';

export const lightDefaults: Omit<LightEntity, 'key'> = {
  type: NODE_TYPES.light,
  color: [255, 255, 255],
  groupMat: [...mat4.create()],
  intensity: 1,
  position: [1, 1, 1],
  visible: true,
};
