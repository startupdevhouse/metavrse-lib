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

const NOT_ALLOWED_TYPES = ['configuration', 'world'];

export const restructureData = (
  nodes: OldTreeNode[],
  entities: Record<CherryKey, OldData>,
  squarePrimitiveKey: CherryKey
): {
  newTree: TreeNode[];
  newEntities: Entities;
  newHTMLHudTree: HTMLHudNode[];
  newHTMLHudEntities: HTMLHudEntities;
  lastDataId: number;
} => {
  let incrementalId = 0;
  const newEntities: Record<CherryKey, Entity> = {};

  const deepTreeIteration = (data: OldTreeNode[]) => {
    const newNodes: TreeNode[] = [];
    data.forEach((node) => {
      if (!NOT_ALLOWED_TYPES.includes(node.type)) {
        if (+node.key > incrementalId) {
          incrementalId = +node.key;
        }

        if (node.type === 'HTMLElement') {
          console.error('HTMLElement is not yet implemented');
          return;
        }

        const primitiveKey =
          node.id === 'assets/square.c3b' ? squarePrimitiveKey : node.id;

        const newNode = {
          id: primitiveKey,
          key: node.key,
          type: node.type,
          title: node.title,
          children: [],
          visible: true,
        } as TreeNode;

        newEntities[node.key] = {
          ...(entities[node.key] as Entity),
          key: node.key,
          type: node.type,
        };

        if (node.children && node.children?.length > 0) {
          newNode.children = deepTreeIteration(node.children);
        } else {
          newNode.children = [];
        }

        newNodes.push(newNode);
      }
    });
    return newNodes;
  };
  return {
    newTree: deepTreeIteration(nodes),
    newEntities,
    lastDataId: incrementalId,
    // TODO: change this to proper values
    newHTMLHudTree: [],
    newHTMLHudEntities: {},
  };
};
