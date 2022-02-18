import { CherryKey } from '../cherry/CherryKey';
import { RGB } from '../common/RGB';
import { Vector3 } from '../common/Vector3';

export type World = {
  skybox: {
    key: CherryKey;
    show: boolean;
  };
  color: RGB;
  transparent: boolean;
  skyboxRotation: Vector3;
  shadow: {
    level: number;
    enabled: boolean;
    position: Vector3;
    fov: boolean;
    texture: [number, number];
  };
  controller: CherryKey;
  dpr: number;
  fps: number;
  fxaa: number;
};
