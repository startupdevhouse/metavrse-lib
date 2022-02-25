import { CherryProjectManagerObject } from '../cherry/CherryProjectManagerObject';
import { CherryObjectMeshes } from './CherryObjectMeshes';
import { CherryObjectAnimations } from './CherryObjectAnimations';
import { CherryObjectInfo } from './CherryObjectInfo';
import { CherryObjectComponents } from './CherryObjectComponents';

export type CherryObject = {
  object: CherryProjectManagerObject;
  meshes: CherryObjectMeshes;
  animations: CherryObjectAnimations;
  info: CherryObjectInfo;
  components: CherryObjectComponents;
};
