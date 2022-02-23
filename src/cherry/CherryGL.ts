import { CherryViewer } from '../types';
import { CherryViewer3D } from '../types';

declare function CherryGL(args: CherryViewer3D): Promise<CherryViewer>;

export default CherryGL;
