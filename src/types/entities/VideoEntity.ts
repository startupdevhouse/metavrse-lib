import { Vector3 } from '../common/Vector3';
import { EntityCreator } from './__EntityCreator';

type VideoEntityRequiredStandardKeys =
  | 'position'
  | 'rotate'
  | 'scale'
  | 'groupMat';
type VideoEntityOptionalStandardKeys = never;

export type VideoEntity = EntityCreator<
  'video',
  VideoEntityRequiredStandardKeys,
  VideoEntityOptionalStandardKeys
> & {
  src: string;
  pixel: Vector3;
  isurl: boolean;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
  startTime: string;
  endTime: string;
  volume: string;
};
