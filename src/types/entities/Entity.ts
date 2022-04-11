import { Vector3 } from '../common/Vector3';
import { EntityMaterial } from './ObjectEntity';
import { CherryKey } from '../cherry/CherryKey';
import { GroupMat } from '../common/GroupMat';
import { CodeComponentValue } from './CodeComponentValue';
import { RGB } from '../common/RGB';
import { TreeNodeType } from '..';

export type Entity = {
  key: CherryKey;
  type: TreeNodeType;

  position?: Vector3;
  rotate?: Vector3;
  scale?: Vector3;
  anchor?: Vector3;
  pivot?: Vector3;
  groupMat?: GroupMat;
  autoscale?: number;

  data?: Record<number, EntityMaterial>;
  hud?: boolean;
  show_shadow?: boolean;
  cast_shadow?: boolean;
  visible?: boolean;
  controller?: CherryKey;
  code?: Record<CherryKey, Record<string, CodeComponentValue>>;

  // Video
  src?: string;
  pixel?: Vector3;

  isurl?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;

  startTime?: string;
  endTime?: string;
  volume?: string;

  // Light
  color?: RGB;
  intensity?: number;

  // Camera
  target?: Vector3;
  distance?: number;
};
