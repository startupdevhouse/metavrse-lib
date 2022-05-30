import { ShaderParameterType } from '../facade/ShaderParameterType';
import { ShaderValue } from '../facade/ShaderValueType';

export type EntityMaterial = Record<ShaderParameterType, ShaderValue>;
