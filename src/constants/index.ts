import { cameraDefaults } from './entities/cameraDefaults';
import { hudDefaults } from './entities/hudDefaults';
import { lightDefaults } from './entities/lightDefaults';
import { objectDefaults } from './entities/objectDefaults';
import { objectGroupDefaults } from './entities/objectGroupDefaults';
import { objectHudDefaults } from './entities/objectHudDefaults';
import { videoDefaults } from './entities/videoDefaults';
import { htmlHudDefaults } from './entities/htmlHudElementDefaults';

export * from './nodeTypes';

export const GIZMO_KEY = '__gizmo__' as const;
export const GIZMO_ROTATE_KEY = '__gizmoRotate__' as const;
export const ASSETS_FILES_FOLDER = 'files';

export const DEFAULTS = {
  cameraDefaults,
  hudDefaults,
  lightDefaults,
  objectDefaults,
  objectGroupDefaults,
  objectHudDefaults,
  videoDefaults,
  htmlHudDefaults,
} as const;
