import { Entity } from './Entity';

type RequiredProperties = 'key' | 'type' | 'visible';

type OptionalProperties = 'parentOpts' | 'finalVisibility';

export type ConfigurationEntity = Pick<
  Required<Entity & { type: 'configuration' }>,
  RequiredProperties
> &
  Pick<Entity, OptionalProperties>;
