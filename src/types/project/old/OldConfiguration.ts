import { CherryKey } from '../../cherry/CherryKey';
import { OldTreeNode } from './OldTreeNode';

export type OldConfiguration = {
  key: CherryKey;
  title: string;
  type: 'configuration';
  disableCheckbox?: boolean;
  children?: OldTreeNode[];
};
