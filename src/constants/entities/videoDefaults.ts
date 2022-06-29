import { mat4 } from 'gl-matrix';
import { NODE_TYPES } from '../nodeTypes';
import { VideoEntity } from '../..';

export const videoDefaults: Omit<VideoEntity, 'key'> = {
  type: NODE_TYPES.video,
  visible: true,
  position: [0, 0, 0],
  rotate: [0, 0, 0],
  groupMat: [...mat4.create()],
  scale: [1, 1, 1],
  src: '',
  pixel: [3, 4, 255],
  isurl: false,
  autoplay: true,
  loop: false,
  muted: false,
  startTime: '0.0',
  endTime: '0.0',
  volume: '0.1',
};
