import { ShaderParameterType } from '../facade/ShaderParameterType';
import { ShaderValue } from '../facade/ShaderValueType';
import { Entity } from './Entity';

export type EntityMaterial = Record<ShaderParameterType, ShaderValue>;

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

export type ObjectEntity = Pick<
  Required<Entity & { type: 'object' }>,
  RequiredProperties
> &
  Pick<Entity, OptionalProperties>;
