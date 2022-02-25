export type CherryViewerFileSystem = {
  readdir: (path: string) => string[];
  mkdir: (path: string) => void;
  createPath: (
    parent: string,
    path: string,
    canRead?: boolean,
    canWrite?: boolean
  ) => string;
  writeFile: (path: string, data: Uint8Array) => void;
};
