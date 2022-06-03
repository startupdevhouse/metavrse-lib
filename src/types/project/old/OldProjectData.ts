import { CherryKey } from '../..';
import { OldAsset } from './OldAsset';
import { OldData } from './OldData';
import { OldTreeNode } from './OldTreeNode';
import { OldWorld } from './OldWorld';

export type OldSceneData = {
  tree: OldTreeNode[];
  data: Record<CherryKey, OldData | OldWorld>;
};

export type OldScene = Record<string, OldSceneData>;

export type OldProjectData = {
  version: number;
  title: string;
  scene: OldScene;
  assets: {
    tree: OldAsset[];
    data: null; // Not used ?
  };
  starting_scene: string;
  selected_scene: string;
};
