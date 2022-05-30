import { EntityCreator } from './__EntityCreator';

type ObjectGroupEntityRequiredStandardKeys = 'position' | 'rotate' | 'scale';
type ObjectGroupEntityOptionalStandardKeys = never;

export type ObjectGroupEntity = EntityCreator<
  'object-group',
  ObjectGroupEntityRequiredStandardKeys,
  ObjectGroupEntityOptionalStandardKeys
>;
