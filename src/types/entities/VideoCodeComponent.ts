import { CherryKey } from '../../types/cherry/CherryKey';

export type VideoCodeComponent = {
  aftercamera: boolean;
  file: CherryKey;
  title: string;
  type: 'play' | 'pause' | 'stop';
};
