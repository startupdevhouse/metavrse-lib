import { CherryKey } from '../cherry/CherryKey';
import { NODE_TYPES } from '../common/NODE_TYPES';

export type ObjectHudEntity = Omit<Object, 'type'> & {
  key: CherryKey;
  type: NODE_TYPES.objectHud;
  visible: boolean;
};
