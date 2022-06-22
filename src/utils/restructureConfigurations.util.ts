import {
  OldTreeNode,
  CherryKey,
  OldData,
  Asset,
  TreeNode,
  Entities,
  HTMLHudNode,
  HTMLHudEntities,
  Entity,
} from '..';

const ALLOWED_TYPES = [
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

export const restructureConfigurations = (
  nodes: any[],
  entities: Record<CherryKey, OldData>,
  squarePrimitiveKey: CherryKey
): {
  configurationsTree: any;
  configurationsEntities: any;
} => {
  let incrementalId = 0;

  const newEntities: Record<CherryKey, any> = {};

  const deepTreeIteration = (data: any[]) => {
    const newNodes: any = [];
    let hasConfig = false;

    data.forEach((node) => {
      if (+node.key > incrementalId) {
        incrementalId = +node.key;
      }

      const primitiveKey =
        node.id === 'assets/square.c3b' ? squarePrimitiveKey : node.id;

      const newNode = {
        id: primitiveKey,
        key: node.key,
        skey: node.skey,
        type: node.type,
        title: node.title,
        children: [],
        visible: true,
      } as any;

      if (node.children && node.children?.length > 0) {
        const [nodesss, config] = deepTreeIteration(node.children);
        hasConfig = config;
        newNode.children = nodesss;
      }

      if (ALLOWED_TYPES.includes(node.type)) {
        hasConfig = node.type === 'configuration';
        newEntities[node.key] = {
          ...(entities[node.key] as Entity),
          key: node.key,
          skey: node.skey,
          type: node.type,
        };

        newNodes.push(newNode);
      } else if (node.type === 'object-group' && hasConfig) {
        newNodes.push(newNode);
      }
    });

    return [newNodes, hasConfig];
  };

  const [configurationsTree] = deepTreeIteration(nodes);

  return {
    configurationsTree,
    configurationsEntities: newEntities,
  };
};
