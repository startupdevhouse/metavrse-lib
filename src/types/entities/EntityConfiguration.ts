import { CherryKey } from '../cherry/CherryKey';
import { Entity } from './Entity';

export type EntityConfiguration = {
  key: CherryKey;
  entities: Entity[];
};
