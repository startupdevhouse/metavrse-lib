import { CherryKey } from '../../types/cherry/CherryKey';
import { MegaControllerCamera } from '../scripts/MegaController/MegaControllerCamera';
import { MegaControllerCameraComponent } from '../scripts/MegaController/MegaControllerCameraComponent';
import { MegaControllerCameraDuration } from '../scripts/MegaController/MegaControllerCameraDuration';
import { MegaControllerConfigurationFolders } from '../scripts/MegaController/MegaControllerConfigurationFolders';
import { MegaControllerObjectAnimation } from '../scripts/MegaController/MegaControllerObjectAnimation';
import { MegaControllerObjectAnimationSequence } from '../scripts/MegaController/MegaControllerObjectAnimationSequence';
import { MegaControllerPostCameraJS } from '../scripts/MegaController/MegaControllerPostCameraJS';
import { MegaControllerPreCameraJS } from '../scripts/MegaController/MegaControllerPreCameraJS';
import { MegaControllerVideoComponent } from '../scripts/MegaController/MegaControllerVideoComponent';

/**
 * Some of this properties need to be in a tuple
 * please look into line 12 of MegaController.ts for reference
 */
export type CodeObject = {
  camera: MegaControllerCamera['value'];
  cameracomponent: [] | [MegaControllerCameraComponent['value']];
  duration: MegaControllerCameraDuration['value'];
  configurationfolders: [] | [MegaControllerConfigurationFolders['value']];
  objectanimations: Array<MegaControllerObjectAnimation['value']>;
  objectanimationsequence: Array<
    MegaControllerObjectAnimationSequence['value']
  >;
  videos: Array<MegaControllerVideoComponent['value']>;
  prejs: MegaControllerPreCameraJS['value'];
  postjs: MegaControllerPostCameraJS['value'];
};
export type Code = Record<CherryKey, Partial<CodeObject>>;
