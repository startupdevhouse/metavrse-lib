export type CherryViewer3D = {
  noInitialRun?: boolean;
  Handlers: any;
  logReadFiles: boolean;
  canvas?: HTMLCanvasElement;
  print: (text: string) => void;
  printErr: (text: string) => void;
  locateFile?: (filename: string, prefix: string) => string;
};
