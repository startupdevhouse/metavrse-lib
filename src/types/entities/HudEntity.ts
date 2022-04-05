import { Entity } from './Entity';

type RequiredProperties = 'key' | 'type' | 'visible';

export type HudEntity = Pick<
  Required<Entity & { type: 'hud' }>,
  RequiredProperties
>;
