import { Entity } from './Entity';

type RequiredProperties =
  | 'key'
  | 'type'
  | 'visible'
  | 'position'
  | 'target'
  | 'distance';

export type CameraEntity = Pick<
  Required<Entity & { type: 'camera' }>,
  RequiredProperties
>;
