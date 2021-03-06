import {
  OldTreeNode,
  CherryKey,
  OldData,
  TreeNode,
  Entities,
  HTMLHudNode,
  Entity,
  ConfigurationNode,
} from '..';

const ALLOWED_CONFIGURATION_TYPES = [
  'hud-link',
  'hud-html-link',
  'HTMLElement-link',
  'light-link',
  'object-link',
  'object-hud-link',
  'object-group-link',
  'video-link',
  'configuration',
];

const ALLOWED_TREE_TYPES = [
  'hud',
  'light',
  'object',
  'object-hud',
  'object-group',
  'video',
  'camera',
];

export const restructureData = (
  nodes: OldTreeNode[],
  entities: Record<CherryKey, OldData>,
  squarePrimitiveKey: CherryKey
): {
  newTree: TreeNode[];
  newEntities: Entities;
  newHTMLHudTree: HTMLHudNode[];
  lastDataId: number;
  newConfigurationsTree: any;
} => {
  let incrementalId = 0;
  const newEntities: Record<CherryKey, Entity> = {};

  const deepTreeIteration = (data: OldTreeNode[]): any[] => {
    let hasConfig = false;
    const newTree: TreeNode[] = [];
    const newConfigurationsTree: any[] = [];

    data.forEach((node) => {
      const entity = entities[node.key];
      if (+node.key > incrementalId) {
        incrementalId = +node.key;
      }

      const primitiveKey =
        node.id === 'assets/square.c3b' ? squarePrimitiveKey : node.id;

      const newNode = createNewNode(primitiveKey, node, entity as any);
      const newConfiguration = createNewConfiguration(
        primitiveKey,
        node,
        entity
      );

      if (node.children && node.children?.length > 0) {
        const [tree, configurations, config] = deepTreeIteration(node.children);

        hasConfig = config;
        newNode.children = tree;
        newConfiguration.children = configurations;
      }

      if (ALLOWED_CONFIGURATION_TYPES.includes(node.type)) {
        hasConfig = node.type === 'configuration';
        newConfigurationsTree.push(newConfiguration);

        newEntities[node.key] = {
          ...(entity as Entity),
          key: node.key,
          skey: node.skey,
          type: node.type,
        };
      }

      if (ALLOWED_TREE_TYPES.includes(node.type)) {
        newTree.push(newNode);

        newEntities[node.key] = {
          ...(entity as Entity),
          key: node.key,
          type: node.type,
        };
      }

      if (node.type === 'object-group' && hasConfig) {
        newConfigurationsTree.push(newConfiguration);
      }
    });

    return [newTree, newConfigurationsTree, hasConfig];
  };

  const [newTree, newConfigurationsTree] = deepTreeIteration(nodes);

  return {
    lastDataId: incrementalId,
    newTree,
    newEntities,
    newHTMLHudTree: [],
    newConfigurationsTree,
  };
};

const createNewConfiguration = (
  primitiveKey: string | undefined,
  node: OldTreeNode,
  entity: OldData
): ConfigurationNode => {
  let newNode = {
    key: node.key,
    type: node.type,
    title: node.title,
    children: [],
    visible: entity && entity.visible !== undefined ? entity.visible : true,
  } as ConfigurationNode;

  if (primitiveKey) {
    newNode = {
      ...newNode,
      id: primitiveKey,
    };
  }

  if (node.skey) {
    newNode = {
      ...newNode,
      skey: node.skey,
    };
  }

  return newNode;
};

const createNewNode = (
  primitiveKey: string | undefined,
  node: OldTreeNode,
  entity: OldData
): TreeNode => ({
  id: primitiveKey,
  key: node.key,
  type: node.type,
  title: node.title,
  children: [],
  visible: entity && entity.visible !== undefined ? entity.visible : true,
});
