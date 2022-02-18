import { CherryKey } from '../cherry/CherryKey';
import { Vector3 } from '../common/Vector3';

export type CameraEntity = {
  key: CherryKey;
  type: 'camera';
  position: Vector3;
  target: Vector3;
  distance: number;
  visible: boolean;
};
