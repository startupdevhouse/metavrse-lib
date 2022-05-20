import { NODE_TYPES } from '../nodeTypes';
import { HudEntity } from '../..';

export const hudDefaults: Omit<HudEntity, 'key'> = {
  type: NODE_TYPES.hud,
  visible: true,
};
