import { ConfigurationNodeType, TreeNodeType } from '../..';
import { CherryKey } from '../../cherry/CherryKey';

export type OldTreeNode = {
  key: CherryKey;
  title: string;
  type: (ConfigurationNodeType & TreeNodeType) & 'HTMLElement';
  disableCheckbox?: boolean;
  children?: OldTreeNode[];
  id?: CherryKey;
  skey?: CherryKey;
};
