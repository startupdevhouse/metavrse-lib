import { CherryKey } from '../cherry/CherryKey';
import { ObjectEntity } from './ObjectEntity';

type ObjectTypes = Omit<ObjectEntity, 'type'>;

export type ObjectHudEntity = {
  key: CherryKey;
  type: 'object-hud';
  visible: boolean;
} & ObjectTypes;
