import { CherryKey } from '../cherry/CherryKey';
import { GroupMat } from '../common/GroupMat';
import { Vector3 } from '../common/Vector3';
import { ShaderParameterType } from '../facade/ShaderParameterType';
import { CodeComponentValue } from './CodeComponentValue';

export type ObjectEntity = {
  key: CherryKey;
  type: 'object';

  position: Vector3;
  rotate: Vector3;
  scale: Vector3;
  anchor: Vector3;
  pivot: Vector3;
  groupMat: GroupMat;
  autoscale: number;

  data: Record<number, Record<ShaderParameterType, any>>;

  hud: boolean;
  show_shadow: boolean;
  cast_shadow: boolean;
  visible: boolean;

  // INFO: Will be moved into components
  controller?: CherryKey;
  code?: Record<CherryKey, Record<string, CodeComponentValue>>;
};
