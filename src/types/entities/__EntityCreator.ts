import { Vector3 } from '../common/Vector3';
import { CherryKey } from '../cherry/CherryKey';
import { GroupMat } from '../common/GroupMat';
import { Code } from '..';

export type EntityCreator<
  /**
   * This will be used as `type` property
   */
  T extends string,
  /**
   * `StandardEntityProperties` keys, that will be required in created type
   */
  RequiredStandardEntityProperties extends keyof StandardEntityProperties,
  /**
   * `StandardEntityProperties` keys, that will be optional in created type.
   * These cannot contain any of `RequiredStandardEntityProperties`
   */
  OptionalStandardEntityProperties extends Exclude<
    keyof StandardEntityProperties,
    RequiredStandardEntityProperties
  >
> = {
  type: T;
  key: CherryKey;
  visible: boolean;
} & Required<Pick<StandardEntityProperties, RequiredStandardEntityProperties>> &
  Partial<Pick<StandardEntityProperties, OptionalStandardEntityProperties>>;

type StandardEntityProperties = {
  position: Vector3;
  rotate: Vector3;
  scale: Vector3;
  anchor: Vector3;
  pivot: Vector3;
  groupMat: GroupMat;
  autoscale: number;

  hud: boolean;
  controller: CherryKey;
  code: Code;
  show_shadow: boolean;
  cast_shadow: boolean;
};
