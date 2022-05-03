import { CherrySurfaceSceneObject } from '..';

export type CherryObjectByPixel = {
  meshid: number;
  object: {
    object_ptr: () => CherrySurfaceSceneObject;
  };
  x: number;
  y: number;
  z: number;
};
