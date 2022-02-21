import { CherryMeshes } from './CherryMeshes';
import { Vector3 } from '../common/Vector3';
import { ShaderParameterType } from '../../facade/shaders';

type SetParameter = {
  (arg0: string, arg1: any): void;
  (arg0: number, arg1: string, arg2: any): void;
  (arg0: number, arg1: number, arg2: number, arg3: number): void;
  (arg0: number, arg1: string, arg2: number, arg3: number, arg4: number): void;
};

type GetParameterVec3Return = {
  f1: number;
  f2: number;
  f3: number;
};

type GetParameterVec3 = {
  (index: number, parameter: ShaderParameterType): GetParameterVec3Return;
};

export type CherrySurfaceSceneObject = {
  $$: {
    count: { value: number };
    ptr: number;
    ptrType: any;
  };
  getAnimationIndex: () => void;
  getAnimationTime: () => void;
  getAnimations: () => void;
  getMeshGroups: () => void;
  getMeshMaterials: () => void;
  /**
   * @description Use to get meshes information for current object
   */
  getMeshes: () => CherryMeshes;
  getNodeNames: () => void;
  getParameterBool: (index: number, parameter: ShaderParameterType) => boolean;
  getParameterFloat: (index: number, parameter: ShaderParameterType) => number;
  getParameterInt: (index: number, parameter: ShaderParameterType) => number;
  getParameterString: (index: number, parameter: ShaderParameterType) => string;
  getParameterVec3: GetParameterVec3;
  pauseAnimation: () => void;
  playAnimation: () => void;
  resumeAnimation: () => void;
  save: () => void;
  setAnimationSpeed: () => void;
  setAnimationTime: () => void;
  setParameter: SetParameter;
  setTransformMatrix: (m: any) => any;
};
