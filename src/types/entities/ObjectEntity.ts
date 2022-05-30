import { EntityMaterial } from './EntityMaterial';
import { EntityCreator } from './__EntityCreator';

type ObjectEntityRequiredStandardKeys =
  | 'position'
  | 'rotate'
  | 'scale'
  | 'groupMat'
  | 'show_shadow'
  | 'cast_shadow';
type ObjectEntityOptionalStandardKeys =
  | 'controller'
  | 'code'
  | 'autoscale'
  | 'pivot'
  | 'hud';

export type ObjectEntity = EntityCreator<
  'object',
  ObjectEntityRequiredStandardKeys,
  ObjectEntityOptionalStandardKeys
> & {
  data: Record<number, EntityMaterial>;
};
