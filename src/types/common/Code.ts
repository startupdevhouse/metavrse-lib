import { CherryKey } from '../../types/cherry/CherryKey';
import { CodeComponentValue } from '../../types/entities/CodeComponentValue';

export type Code = Record<CherryKey, Record<string, CodeComponentValue>>;
