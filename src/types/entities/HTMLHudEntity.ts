import { Entity } from './Entity';

type RequiredProperties = 'key' | 'visible' | 'type' | 'data';

type OptionalProperties = 'text' | 'props';

export type HTMLHudEntity = Pick<
  Required<Entity & { type: keyof HTMLElementTagNameMap }>,
  RequiredProperties
> &
  Pick<Entity, OptionalProperties>;
