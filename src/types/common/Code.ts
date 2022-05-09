import { CherryKey } from '../../types/cherry/CherryKey';
import { CodeComponentValue } from '../../types/entities/codeComponents/CodeComponentValue';

export type Code = Record<CherryKey, Record<string, CodeComponentValue>>;
