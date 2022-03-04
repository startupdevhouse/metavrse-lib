import { CherryKey } from '../..';
import { OldAsset } from './OldAsset';
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
      data: Record<CherryKey, OldData | OldWorld>;
    };
  };
  assets: {
    tree: OldAsset[];
    data: null; // Not used ?
  };
  starting_scene: string;
  selected_scene: string;
};
