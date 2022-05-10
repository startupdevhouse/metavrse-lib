import { ObjectAnimationSequenceComponent } from './ObjectAnimationSequenceComponent';
import { VideoCodeComponent } from './VideoCodeComponent';
import { CameraCodeComponent } from './CameraCodeComponent';
import { FileCodeComponent } from './FileCodeComponent';

export type CodeComponentValue =
  | FileCodeComponent
  | CameraCodeComponent
  | VideoCodeComponent[]
  | ObjectAnimationSequenceComponent[]
  | string
  | boolean;
