import { Entity } from './Entity';

type RequiredProperties =
  | 'key'
  | 'type'
  | 'position'
  | 'rotate'
  | 'scale'
  | 'groupMat'
  | 'visible'
  | 'src'
  | 'pixel'
  | 'isurl'
  | 'autoplay'
  | 'loop'
  | 'muted'
  | 'startTime'
  | 'endTime'
  | 'volume';

export type VideoEntity = Pick<
  Required<Entity & { type: 'video' }>,
  RequiredProperties
>;
