import { TreeNodeType } from './../../common/TreeNodeType';
import { CherryKey } from './../../cherry/CherryKey';
import { NODE_TYPES } from '../../common/NODE_TYPES';

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
