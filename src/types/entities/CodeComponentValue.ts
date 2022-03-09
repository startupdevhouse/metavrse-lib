import { CameraCodeComponent } from './CameraCodeComponent';
import { FileCodeComponent } from './FileCodeComponent';

export type CodeComponentValue =
  | FileCodeComponent
  | CameraCodeComponent
  | string
  | boolean;
