import { Vector3 } from '../../types/common/Vector3';
import { CherryKey } from './CherryKey';
import { CherryObjectByPixel } from './CherryObjectByPixel';
import { CherrySurfaceSceneObject } from './CherrySurfaceSceneObject';

export type CherrySurfaceScene = {
  showRulerGrid: (value: boolean) => void;
  getObject: (key: CherryKey) => CherrySurfaceSceneObject;
  getObjectByPixel: (x: number, y: number) => CherryObjectByPixel;
  addObject: (key: CherryKey, path: string) => CherrySurfaceSceneObject;
  removeObject: (key: CherryKey) => void;
  showSkybox: (isVisible: boolean) => void;
  setSkyboxTransformMatrix: (vector: Vector3) => void;
  setShadowsTextureSize: (x: number, y: number) => void;
  setShadowsTexturePrecision: (precision: number) => void;
  setShadowsMethod: (level: number) => void;
  enableShadowsFOV: (isEnabled: boolean) => void;
  enableShadows: (isEnabled: boolean) => void;
  enableFOVforAnimated: (isEnabled: boolean) => void;
};
