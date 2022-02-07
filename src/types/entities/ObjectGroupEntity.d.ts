import { CherryKey } from '../cherry/CherryKey';
import { Vector3 } from '../common/Vector3';

export type ObjectGroupEntity = {
  key: CherryKey;
  type: 'object-group';

  position: Vector3;
  rotate: Vector3;
  scale: Vector3;

  visible: boolean;
};
