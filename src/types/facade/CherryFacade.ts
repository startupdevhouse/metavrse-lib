import { CherryKey } from '../cherry/CherryKey';
import { Vector3 } from '../common/Vector3';
import { CherryObject } from './CherryObject';
import { ShaderParameterType } from './ShaderParameterType';
import { ScriptAssets } from './ScriptAssets';
import { CherrySurfaceSceneObject } from '..';

export type CherryFacade = {
  loadAssetsAndRun: (assets: ScriptAssets) => Promise<void>;
  getMaterialValues: (
    object: CherrySurfaceSceneObject,
    index: number
  ) => Record<ShaderParameterType, any>;
  getObject: (key: CherryKey) => CherryObject;
  setObjectProperty: (key: CherryKey, property: string, value: any) => void;
  setObjectMaterial: (
    key: CherryKey,
    index: number,
    property: string,
    value: number | Vector3 | string
  ) => void;
  setObjectShaderType: (
    index: number,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP',
    shaderType: any
  ) => void;
  highlightMesh: (
    key: CherryKey,
    index: number,
    value: boolean,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP'
  ) => void;
};
