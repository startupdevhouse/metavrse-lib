import { ObjectAnimationSequence } from './ObjectAnimationSequence';
import { VideoCodeComponent } from './VideoCodeComponent';
import { CameraCodeComponent } from './CameraCodeComponent';
import { FileCodeComponent } from './FileCodeComponent';

export type CodeComponentValue =
  | FileCodeComponent
  | CameraCodeComponent
  | VideoCodeComponent[]
  | ObjectAnimationSequence[]
  | string
  | boolean;
