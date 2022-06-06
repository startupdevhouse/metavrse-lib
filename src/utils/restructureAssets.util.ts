import { OldAsset, Asset } from '..';

type ReturnType = {
  newAssets: Asset[];
  files: OldAsset[];
  lastAssetId: number;
};

export const restructureAssets = (nodes: OldAsset[]): ReturnType => {
  let incrementalId = 0;
  const filesTypes = ['image', 'object', 'javascript', 'stylesheet'];
  const files: OldAsset[] = [];

  const deepIteration = (data: OldAsset[], newAssets: Asset[]) => {
    data.forEach((asset) => {
      if (+asset.key > incrementalId) {
        incrementalId = +asset.key;
      }

      const assetType = asset.type === 'css' ? 'stylesheet' : asset.type;

      const newAsset = {
        key: asset.key,
        type: assetType,
        title: asset.title,
      } as Asset;

      if (filesTypes.includes(newAsset.type)) {
        files.push(asset);
      }

      if (asset.children && asset.children?.length > 0) {
        newAsset.children = deepIteration(asset.children, []);
      } else {
        newAsset.children = [];
      }

      newAssets.push(newAsset);
    });
    return newAssets;
  };

  return {
    newAssets: deepIteration(nodes, []),
    files,
    lastAssetId: incrementalId,
  };
};
