import { Entity } from './Entity';

type RequiredProperties =
  | 'key'
  | 'type'
  | 'visible'
  | 'position'
  | 'groupMat'
  | 'color'
  | 'intensity';

export type LightEntity = Pick<
  Required<Entity & { type: 'light' }>,
  RequiredProperties
>;
