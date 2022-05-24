export type GenericNode<NodeType extends string> = {
  children: GenericNode<NodeType>[];
  // TODO: [MET-640] Change property visible to disable and add visible property (boolean)
  visible: boolean;
  id?: string; // asset key
  key: string;
  title: string; // name will not work with SceneGraph in 3dviewer assets
  uiVisible?: boolean;
  uiHighlighted?: boolean;
  type: NodeType;
};
