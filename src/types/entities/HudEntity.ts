import { EntityCreator } from './__EntityCreator';

type HudEntityRequiredStandardKeys = never;
type HudEntityOptionalStandardKeys = never;

export type HudEntity = EntityCreator<
  'hud',
  HudEntityRequiredStandardKeys,
  HudEntityOptionalStandardKeys
>;
