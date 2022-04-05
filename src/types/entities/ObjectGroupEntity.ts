import { Entity } from './Entity';

type RequiredProperties =
  | 'key'
  | 'type'
  | 'position'
  | 'rotate'
  | 'scale'
  | 'visible';

export type ObjectGroupEntity = Pick<
  Required<Entity & { type: 'object-group' }>,
  RequiredProperties
>;
