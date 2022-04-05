import { Entity } from './Entity';

type RequiredProperties = 'key' | 'type' | 'visible';

export type HudHtmlEntity = Pick<
  Required<Entity & { type: 'hud-html' }>,
  RequiredProperties
>;
