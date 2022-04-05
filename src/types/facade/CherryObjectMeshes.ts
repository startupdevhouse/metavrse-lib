import { ShaderType } from '..';
import {
  CherryMesh,
  CherryMeshGroup,
  CherryMeshMaterial,
} from '../cherry/CherryMesh';

export type CherryObjectMeshes = {
  objectMeshes: CherryMesh[];
  objectMeshMaterials: CherryMeshMaterial[];
  objectMeshGroups: CherryMeshGroup[];
  shaderTypes: Record<number, ShaderType>;
};
