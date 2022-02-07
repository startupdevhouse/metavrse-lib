import { CherryKey } from './../../cherry/CherryKey';

export type OldTreeNode = {
  key: CherryKey;
  title: string;
  type:
    | 'camera'
    | 'configuration'
    | 'hud'
    | 'light'
    | 'object'
    | 'object-group'
    | 'object-hud'
    | 'video'
    | 'world'
    | 'hud-link'
    | 'light-link'
    | 'object-link'
    | 'object-group-link'
    | 'video-link';
  disableCheckbox?: boolean;
  children?: OldTreeNode[];
  id?: CherryKey;
  skey?: CherryKey;
};
