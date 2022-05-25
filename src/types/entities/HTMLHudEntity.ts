import { Entity } from './Entity';
import { StandardPropertiesHyphen } from 'csstype';

type RequiredProperties = 'key' | 'visible';

export type HTMLHudEntity = Required<Pick<Entity, RequiredProperties>> & {
  type: keyof HTMLElementTagNameMap;
  data: Record<string, StandardPropertiesHyphen>;
};
