import { Vector3 } from '../common/Vector3';
import { EntityCreator } from './__EntityCreator';

type CameraEntityRequiredStandardKeys = 'position';
type CameraEntityOptionalStandardKeys = never;

export type CameraEntity = EntityCreator<
  'camera',
  CameraEntityRequiredStandardKeys,
  CameraEntityOptionalStandardKeys
> & {
  target: Vector3;
  distance: number;
};
