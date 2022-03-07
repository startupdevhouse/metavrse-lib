import { Asset } from '../assets/Asset';
import { Entity } from '../entities/Entity';
import { TreeNode } from '../tree/TreeNode';
import { World } from '../world/World';
import { CherryKey } from './CherryKey';

type Scenes = Record<
  string,
  {
    tree: TreeNode[];
    data: Record<CherryKey, Entity | World>;
  }
>;

export type CherryProjectData = {
  id: string;
  userid: number;
  title: string;
  data: {
    version: string;
    title: string;
    scene: Scenes;
    starting_scene: string;
    assets: {
      tree: Asset[];
    };
    selected_scene: string;
  };
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
};
