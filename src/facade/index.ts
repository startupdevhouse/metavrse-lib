import {
  CherryMesh,
  CherryMeshGroup,
  CherryMeshMaterial,
} from '../types/cherry/CherryMesh';
import { CherryKey } from '../types/cherry/CherryKey';
import { CherryProjectManagerObject } from '../types/cherry/CherryProjectManagerObject';
import { CherryViewer } from '../types/cherry/CherryViewer';
import { Vector3 } from '../types/common/Vector3';

type CherryObjectMeshes = {
  materials: any;
  objectMeshes: CherryMesh[];
  objectMeshMaterials: CherryMeshMaterial[];
  objectMeshGroups: CherryMeshGroup[];
  shaderTypes: any;
};
type CherryObjectAnimations = {};
type CherryObjectInfo = {};
type CherryObjectComponents = {};

export type CherryObject = {
  object: CherryProjectManagerObject;
  meshes: CherryObjectMeshes;
  animations: CherryObjectAnimations;
  info: CherryObjectInfo;
  components: CherryObjectComponents;
};

export type CherryFacade = {
  getObject: (key: CherryKey) => CherryObject;
  setObjectProperty: (key: CherryKey, property: string, value: any) => void;
  setObjectMaterial: (
    key: CherryKey,
    index: number,
    property: string,
    value: number | Vector3 | string
  ) => void;
  setObjectShaderType: (
    index: number,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP',
    shaderType: any
  ) => void;
  highlightMesh: (
    key: CherryKey,
    index: number,
    value: boolean,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP'
  ) => void;
};

export const cherryFacade = (cherryViewer: CherryViewer): CherryFacade => {
  const pm = cherryViewer.ProjectManager;
  const surface = cherryViewer.getSurface();
  const scene = surface.getScene();

  return {
    /**
     *
     * @param key
     * @returns
     */
    getObject: (key: CherryKey): CherryObject => {
      const object = pm.getObject(key);
      const sceneObject = scene.getObject(key);
      const meshes = sceneObject.getMeshes();
      const meshMaterials = sceneObject.getMeshMaterials();
      const meshGroups = sceneObject.getMeshGroups();

      const generate = <T>(data: any): T[] => {
        const values = [];
        for (var x = 0; x < data.size(); x++) {
          var m = data.get(x);

          values.push(m);
        }
        return values;
      };

      return {
        object,
        meshes: {
          objectMeshes: generate<CherryMesh>(meshes),
          objectMeshMaterials: generate<CherryMeshMaterial>(meshMaterials),
          objectMeshGroups: generate<CherryMeshGroup>(meshGroups),
          shaderTypes: {
            0: 'PBR',
            1: 'STANDARD',
          },
          materials: {
            0: {},
            1: {},
          },
        },
        animations: [],
        info: {
          file_size: 25_1024_000,
          number_of_meshes: 21,
          number_of_triangles: 321_412,
          number_of_vertices: 231,
          number_of_positions: 0,
          number_of_normals: 0,
          number_of_uvs: 1,
        },
        components: {},
      };
    },
    /**
     *
     * @param key
     * @param property
     * @param value
     */
    setObjectProperty: (key: CherryKey, property: string, value: any) => {
      const object = pm.getObject(key);
      object.setProperty(property, value);
    },
    /**
     *
     * @param key
     * @param index
     * @param property
     * @param value
     */
    setObjectMaterial: (
      key: CherryKey,
      index: number,
      property: string, // albedo_texture | albedo_ratio
      value: number | Vector3 | string
    ) => {
      const object = pm.getObject(key);
      object.mesh.set(index, property, value);
    },
    /**
     *
     * @param index
     * @param meshType
     * @param shaderType
     */
    setObjectShaderType: (
      index: number,
      meshType: 'MESH' | 'MATERIAL' | 'GROUP',
      shaderType: any
    ) => {},
    /**
     *
     * @param key
     * @param index
     * @param value
     * @param meshType 'MESH' | 'MATERIAL' | 'GROUP'
     */
    highlightMesh: (
      key: CherryKey,
      index: number,
      value: boolean,
      meshType: 'MESH' | 'MATERIAL' | 'GROUP'
    ) => {
      const parameter = 'highlighted';
      const object = scene.getObject(key);
      object.setParameter(index, parameter, value);
      pm.isDirty = true;
    },
  };
};

export default cherryFacade;
