import { RGB } from '../common/RGB';
import { EntityCreator } from './__EntityCreator';

type LightEntityRequiredStandardKeys = 'position' | 'groupMat';
type LightEntityOptionalStandardKeys = never;

export type LightEntity = EntityCreator<
  'light',
  LightEntityRequiredStandardKeys,
  LightEntityOptionalStandardKeys
> & {
  color: RGB;
  intensity: number;
};
