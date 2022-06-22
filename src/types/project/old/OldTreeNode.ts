import { ConfigurationType, TreeNodeType } from '../..';
import { CherryKey } from '../../cherry/CherryKey';

export type OldTreeNode = {
  key: CherryKey;
  title: string;
  type: (ConfigurationType & TreeNodeType) & 'HTMLElement';
  disableCheckbox?: boolean;
  children?: OldTreeNode[];
  id?: CherryKey;
  skey?: CherryKey;
};
