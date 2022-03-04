import { ConfigurationType, TreeNode, TreeNodeType } from '../..';
import { CherryKey } from '../../cherry/CherryKey';

export type OldTreeNode = {
  key: CherryKey;
  title: string;
  type: keyof ConfigurationType & TreeNodeType & 'configuration';
  disableCheckbox?: boolean;
  children?: OldTreeNode[];
  id?: CherryKey;
  skey?: CherryKey;
};
