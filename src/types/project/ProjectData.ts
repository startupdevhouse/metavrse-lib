import { Scene } from '../scene/Scene';

export type ProjectData = {
  id: string;
  incrementalId: number;
  version: string;
  title: string;
  createDate: string;
  updateDate: string;
  startingScene: string;
  selectedScene: string;
  scenes: Scene[];
  /**
   * @description This value is used to determine if user needs to save a project before publishing it.
   * This logic should later be changed to e.g. comparing current time with updateDate
   */
  requiresSaveBeforePublish: boolean;
};
