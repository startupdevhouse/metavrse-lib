import { NODE_TYPES } from '../nodeTypes';
import { ObjectGroupEntity } from '../..';

export const objectGroupDefaults: Omit<ObjectGroupEntity, 'key'> = {
  type: NODE_TYPES.objectGroup,
  position: [0, 0, 0],
  rotate: [0, 0, 0],
  scale: [1, 1, 1],
  visible: true,
};
