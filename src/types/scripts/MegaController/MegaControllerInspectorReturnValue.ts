import { MegaControllerCamera } from './MegaControllerCamera';
import { MegaControllerCameraComponent } from './MegaControllerCameraComponent';
import { MegaControllerCameraDuration } from './MegaControllerCameraDuration';
import { MegaControllerConfigurationFolders } from './MegaControllerConfigurationFolders';
import { MegaControllerObjectAnimation } from './MegaControllerObjectAnimation';
import { MegaControllerObjectAnimationSequence } from './MegaControllerObjectAnimationSequence';
import { MegaControllerPostCameraJS } from './MegaControllerPostCameraJS';
import { MegaControllerPreCameraJS } from './MegaControllerPreCameraJS';
import { MegaControllerVideoComponent } from './MegaControllerVideoComponent';

export type MegaControllerInspectorReturnValue = ReadonlyArray<
  | MegaControllerCamera
  | MegaControllerCameraComponent
  | MegaControllerCameraDuration
  | MegaControllerConfigurationFolders
  | MegaControllerObjectAnimation
  | MegaControllerObjectAnimationSequence
  | MegaControllerVideoComponent
  | MegaControllerPreCameraJS
  | MegaControllerPostCameraJS
>;
