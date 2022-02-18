import { CherryKey } from '../cherry/CherryKey';

export type HudEntity = {
  key: CherryKey;
  type: 'hud';

  visible: boolean;
};
