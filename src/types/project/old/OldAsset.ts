import { AssetType } from '../..';
import { CherryKey } from '../../cherry/CherryKey';

export type OldAsset = {
  key: CherryKey;
  title: string;
  type: AssetType | 'css';
  disableCheckbox?: boolean;
  children?: OldAsset[];
  id?: CherryKey;
  skey?: CherryKey;
};
