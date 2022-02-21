import { CherryKey } from '../cherry/CherryKey';
import {
  CherryMesh,
  CherryMeshGroup,
  CherryMeshMaterial,
} from '../cherry/CherryMesh';
import { CherryProjectManagerObject } from '../cherry/CherryProjectManagerObject';
import { Vector3 } from '../common/Vector3';

type CherryObjectMeshes = {
  objectMeshes: CherryMesh[];
  objectMeshMaterials: CherryMeshMaterial[];
  objectMeshGroups: CherryMeshGroup[];
  shaderTypes: any;
};
type CherryObjectAnimations = {};
type CherryObjectInfo = {};
type CherryObjectComponents = {};

export type CherryObject = {
  object: CherryProjectManagerObject;
  meshes: CherryObjectMeshes;
  animations: CherryObjectAnimations;
  info: CherryObjectInfo;
  components: CherryObjectComponents;
};

export type CherryFacade = {
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
