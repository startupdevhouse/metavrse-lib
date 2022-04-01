import { CherryAnimation, ShaderParameterType } from '..';
import { RGB } from '../common/RGB';
import { Vector3 } from '../common/Vector3';
import { TreeNodeType } from '../tree/TreeNodeType';
import { CherryKey } from './CherryKey';
import { CherryMesh } from './CherryMesh';

export type GetterSetterPropertyType =
  | 'position'
  | 'scale'
  | 'rotate'
  | 'groupMat'
  | 'anchor'
  | 'hud'
  | 'pivot'
  | 'visible'
  | 'show_shadow'
  | 'cast_shadow'
  | 'front_facing'
  | 'autoscale'
  | 'controller'
  | 'frame'
  | 'mesh'
  | 'finalTransformation'
  | 'finalVisibility'
  | 'parentOpts'
  | 'animation'
  | 'animations'
  | 'hudscale';

export type ProjectManagerObjectPropertyType =
  | string
  | boolean
  | number
  | Vector3
  | RGB;

/**
 * @description ProjectManager.getObject(key) result
 */
export type CherryProjectManagerObject = {
  addToBucket: () => void;
  addToRedraw: () => void;

  insertIntoBucket: () => void;
  regenerateLink: () => void;
  toggleLink: () => void;
  setProperty: (prop: string, value: any, key?: CherryKey) => void;
  getProperty: (prop: string, key: CherryKey) => [string, Vector3];
  removeLink: { (): void; (prop: string, key: CherryKey): boolean };
  clearRender: () => void;
  remove: () => void;

  applyAutoScale: () => void;
  applyAutoPivot: () => void;

  addChangeListener: (callback: any) => void;
  removeChangeListener: (callback: any) => void;
  clearChangeHandlers: () => void;

  /** @description Getter & Setter */
  position: Vector3;
  scale: Vector3;
  rotate: Vector3;
  groupMat: number[];
  anchor: Vector3;
  hud: boolean;
  pivot: Vector3;
  visible: boolean;
  show_shadow: boolean;
  cast_shadow: boolean;
  front_facing: boolean;
  autoscale: number;
  controller: string;
  frame: number;
  /** @description Use to retrive mesh specify by index or update mesh by it index */
  mesh: {
    get: (index: number, property: ShaderParameterType) => CherryMesh;
    set: (index: number, property: ShaderParameterType, value: unknown) => void;
  };
  finalTransformation: Float32Array;
  finalVisibility: boolean;
  parentOpts: { visible: boolean; transforms: Vector3; transform: any };
  animation: CherryAnimation;
  animations: any;
  hudscale: Vector3;

  /** @description Additional parameters */
  buckets: any;
  children: any;
  meshdata: Map<unknown, unknown>;
  color: RGB;
  intensity: number;
  finalPosition: Vector3;
  transparent: boolean;
  item: {
    type: TreeNodeType;
    title: string;
    key: CherryKey;
  };
  parent: CherryProjectManagerObject;
};
