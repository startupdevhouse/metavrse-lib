import { HudEntity } from './HudEntity';
import { LightEntity } from './LightEntity';
import { Vector3 } from '../common/Vector3';
import { VectorKeys } from '../common/VectorKeys';
import { ObjectEntity } from './ObjectEntity';
import { ObjectGroupEntity } from './ObjectGroupEntity';
import { ObjectHudEntity } from './ObjectHudEntity';
import { VideoEntity } from './VideoEntity';
import { CameraEntity } from './CameraEntity';
import { HudHtmlEntity } from './HudHtmlEntity';

export type Entity = Partial<Record<VectorKeys, Vector3>> &
  (
    | HudEntity
    | HudHtmlEntity
    | LightEntity
    | ObjectEntity
    | ObjectGroupEntity
    | ObjectHudEntity
    | VideoEntity
    | CameraEntity
  );
