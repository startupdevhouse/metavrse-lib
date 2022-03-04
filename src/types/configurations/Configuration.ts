import { ConfigurationType } from '..';
import { CherryKey } from '../cherry/CherryKey';

export type Configuration = {
  key: CherryKey;
  title: string;
  type: ConfigurationType;
};
