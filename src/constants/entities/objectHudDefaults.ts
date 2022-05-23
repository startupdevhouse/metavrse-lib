import { mat4 } from 'gl-matrix';
import { NODE_TYPES } from '../nodeTypes';
import { ObjectHudEntity } from '../..';

export const objectHudDefaults: Omit<ObjectHudEntity, 'key'> = {
  type: NODE_TYPES.objectHud,
  position: [0, 0, 0],
  rotate: [0, 0, 0],
  scale: [1, 1, 1],
  anchor: [0.5, 0.5, 0],
  pivot: [0, 0, 0],
  groupMat: [...mat4.create()],
  autoscale: 1,
  data: {},
  hud: true,
  show_shadow: false,
  cast_shadow: false,
  visible: true,
};
