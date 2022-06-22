import {
  OldTreeNode,
  CherryKey,
  OldData,
  TreeNode,
  Entities,
  HTMLHudNode,
  Entity,
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
  newConfigurationsEntities: any;
} => {
  let incrementalId = 0;
  const newEntities: Record<CherryKey, Entity> = {};
  const newConfigurationsEntities: Record<CherryKey, Entity> = {};

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

        newConfigurationsEntities[node.key] = {
          ...(entity as any),
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
    newConfigurationsEntities,
  };
};

function createNewConfiguration(
  primitiveKey: string | undefined,
  node: OldTreeNode,
  entity: any
) {
  const isVisible = 'visible' in entity ? entity.visible : true;
  return {
    id: primitiveKey,
    key: node.key,
    skey: node.skey,
    type: node.type,
    title: node.title,
    children: [],
    visible: isVisible,
  };
}

function createNewNode(
  primitiveKey: string | undefined,
  node: OldTreeNode,
  entity: any
) {
  const isVisible = 'visible' in entity ? entity.visible : true;
  return {
    id: primitiveKey,
    key: node.key,
    type: node.type,
    title: node.title,
    children: [],
    visible: isVisible,
  };
}
