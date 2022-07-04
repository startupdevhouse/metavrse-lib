import {
  OldProjectData,
  CherryKey,
  OldTreeNode,
  World,
  ProjectData,
  CherryGLVersion,
  DEFAULTS,
  Scene,
  Asset,
  OldScene,
  OldSceneData,
} from '..';
import { restructureAssets } from './restructureAssets.util';
import { restructureConfigurations } from './restructureConfigurations.util';
import { restructureData } from './restructureData.util';
import { v4 as uuidv4 } from 'uuid';

const getSceneKey = (scenes: Scene[], key: string): string => {
  return scenes.find((scene) => scene.name === key)?.key || '';
};

const createNewScenes = (oldProject: OldProjectData): Scene[] => {
  const { scene } = oldProject;
  return Object.keys(scene).map((scene) => {
    return { key: uuidv4(), name: scene };
  });
};

const getOldScene = (oldProject: OldProjectData): OldSceneData => {
  const { scene, selected_scene, starting_scene } = oldProject;
  return scene[selected_scene || starting_scene];
};

const getOldTree = (oldScene: OldSceneData): OldTreeNode[] => {
  return oldScene.tree.filter((node: OldTreeNode) => node.key !== 'world');
};

export const regenerateStructure = (
  projectId: string,
  oldProject: OldProjectData,
  assetsFromAtom: Asset[],
  squarePrimitiveKey: CherryKey
) => {
  const { title, assets, selected_scene, starting_scene } = oldProject;
  const newScenes = createNewScenes(oldProject);
  const oldScene = getOldScene(oldProject);
  const oldTree = getOldTree(oldScene);

  const { lastDataId, newTree, newEntities, newHTMLHudTree } = restructureData(
    oldScene.tree,
    oldScene.data,
    squarePrimitiveKey
  );

  const { newAssets, files, lastAssetId } = restructureAssets(assets.tree);
  const newConfigurations = restructureConfigurations(oldTree);
  const newWorld = {
    ...DEFAULTS.worldDefaults,
    ...oldScene.data.world,
  } as World;

  const newProject: ProjectData = {
    id: projectId,
    incrementalId: Math.max(lastDataId, lastAssetId),
    scenes: newScenes,
    selectedScene: getSceneKey(newScenes, selected_scene),
    startingScene: getSceneKey(newScenes, starting_scene),
    title,
    createDate: new Date().toISOString(),
    updateDate: new Date().toISOString(),
    version: CherryGLVersion,
  };

  return {
    files,
    project: newProject,
    tree: newTree,
    world: newWorld,
    entities: newEntities,
    assets: [...assetsFromAtom, ...newAssets],
    configurations: newConfigurations,
    htmlHudTree: newHTMLHudTree,
  };
};
