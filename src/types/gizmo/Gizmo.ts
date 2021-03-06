import { Vector3 } from '../common/Vector3';

export type Meshes = Record<string, number>;

export type MoveMesh = {
  name: string;
  values: Vector3;
};

export type RotateMesh = {
  mesh_id: number;
  values: Vector3;
};

export type TargetConfig = Record<string, Record<string, number>> | undefined;

export type UpdateTypes = 'transform' | 'visible' | 'removed';
