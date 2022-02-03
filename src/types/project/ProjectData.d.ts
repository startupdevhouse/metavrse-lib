import { Scene } from '../scene/Scene';

export type ProjectData = {
  id: string;
  incrementalId: number;
  version: number | string;
  title: string;
  createDate: string;
  updateDate: string;
  startingScene: string;
  selectedScene: string;
  scenes: Scene[];
};
