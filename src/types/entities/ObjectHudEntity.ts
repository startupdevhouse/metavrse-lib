import { Entity } from './Entity';

type RequiredProperties =
  | 'key'
  | 'type'
  | 'position'
  | 'rotate'
  | 'scale'
  | 'anchor'
  | 'pivot'
  | 'groupMat'
  | 'autoscale'
  | 'data'
  | 'hud'
  | 'show_shadow'
  | 'cast_shadow'
  | 'visible';

type OptionalProperties = 'controller' | 'code';

export type ObjectHudEntity = Pick<
  Required<Entity & { type: 'object-hud' }>,
  RequiredProperties
> &
  Pick<Entity, OptionalProperties>;
