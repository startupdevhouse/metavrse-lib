import { Vector3 } from '../../common/Vector3';

export type MegaControllerCamera = {
  label: 'Camera';
  field: 'camera';
  type: 'camera';
  header: 'Position';
  description: 'Position';
  allowed: ['object'];
  value: {
    distance: number;
    position: Vector3;
    target: Vector3;
    duration: number;
  };
};
