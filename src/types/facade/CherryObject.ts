import { CherryProjectManagerObject } from '../cherry/CherryProjectManagerObject';
import { CherryObjectMeshes } from './CherryObjectMeshes';
import { CherryObjectAnimations } from './CherryObjectAnimations';
import { CherryObjectComponents } from './CherryObjectComponents';
import { CherryObjectInfo } from '../cherry/CherryObjectInfo';

export type CherryObject = {
  object: CherryProjectManagerObject;
  meshes: CherryObjectMeshes;
  animations: CherryObjectAnimations;
  info: CherryObjectInfo;
  components: CherryObjectComponents;
};
