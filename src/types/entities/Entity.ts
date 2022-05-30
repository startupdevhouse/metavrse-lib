import { Vector3 } from '../common/Vector3';
import { ObjectEntity } from './ObjectEntity';
import { CameraEntity } from './CameraEntity';
import { HudEntity } from './HudEntity';
import { LightEntity } from './LightEntity';
import { ObjectGroupEntity } from './ObjectGroupEntity';
import { ObjectHudEntity } from './ObjectHudEntity';
import { VideoEntity } from './VideoEntity';

export type Entity =
  | CameraEntity
  | HudEntity
  | LightEntity
  | ObjectEntity
  | ObjectGroupEntity
  | ObjectHudEntity
  | VideoEntity;
