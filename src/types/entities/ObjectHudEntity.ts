import { EntityMaterial } from './EntityMaterial';
import { EntityCreator } from './__EntityCreator';

type ObjectHudEntityRequiredStandardKeys =
  | 'position'
  | 'rotate'
  | 'scale'
  | 'anchor'
  | 'pivot'
  | 'groupMat'
  | 'autoscale'
  | 'hud'
  | 'show_shadow'
  | 'cast_shadow';
type ObjectHudEntityOptionalStandardKeys = 'controller' | 'code';

export type ObjectHudEntity = EntityCreator<
  'object-hud',
  ObjectHudEntityRequiredStandardKeys,
  ObjectHudEntityOptionalStandardKeys
> & {
  data: Record<number, EntityMaterial>;
};
