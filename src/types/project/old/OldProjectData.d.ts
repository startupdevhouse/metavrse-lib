import { OldData } from './OldData';
import { OldTreeNode } from './OldTreeNode';
import { OldWorld } from './OldWorld';

export type OldProjectData = {
  version: number;
  title: string;
  scene: {
    [key: string]: {
      tree: OldTreeNode[];
      data: {
        [key: string | 'world']: OldData | OldWorld;
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
