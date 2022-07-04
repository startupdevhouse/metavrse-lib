import { MoveMesh } from '../types';

export const GIZMO_ROTATE_KEY = '__gizmoRotate__';
export const GIZMO_ROTATE_OBJECT = '/assets/rotate.c3b'
export const GIZMO_KEY = '__gizmo__';
export const GIZMO_MOVE_OBJECT =  '/assets/gizmo.c3b'

export const GIZMO_INITIAL_MESHES: MoveMesh[] = [
  {
    name: 'x',
    values: [1, 0, 0],
  },
  {
    name: 'Cylinder_2',
    values: [1, 0, 0],
  },
  {
    name: 'y',
    values: [0, 1, 0],
  },
  {
    name: 'Cylinder',
    values: [0, 1, 0],
  },
  {
    name: 'z',
    values: [0, 0, 1],
  },
  {
    name: 'Cylinder_3',
    values: [0, 0, 1],
  },
  {
    name: 'Cube_1',
    values: [1, 0, 0],
  },
  {
    name: 'Cube_1_2',
    values: [0, 0, 1],
  },
  {
    name: 'Cube_1_3',
    values: [0, 1, 0],
  },
];
