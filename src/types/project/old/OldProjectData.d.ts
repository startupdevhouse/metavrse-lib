import { OldData } from './OldData';
import { OldTreeNode } from './OldTreeNode';
import { OldWorld } from './OldWorld';

type Data = OldData & OldWorld;

export type OldProjectData = {
  version: number;
  title: string;
  scene: {
    [key: string]: {
      tree: OldTreeNode[];
      data: {
        [key: string]: Data;
      };
    };
  };
  assets: {
    tree: any;
    data: any; // Not used ?
  };
  starting_scene: string;
  selected_scene: string;
};
