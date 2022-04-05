import {
  CherryMesh,
  CherryMeshGroup,
  CherryMeshMaterial,
} from '../types/cherry/CherryMesh';
import { CherryKey } from '../types/cherry/CherryKey';
import { CherryViewer } from '../types/cherry/CherryViewer';
import { ShaderParameterType } from '../types/facade/ShaderParameterType';
import { RGB_PARAMETERS, SHADER_PROPERTY_TYPES, SHADER_TYPES } from './shaders';
import { CherrySurfaceSceneObject } from '../types/cherry/CherrySurfaceSceneObject';
import { Asset } from '../types/assets/Asset';
import { Entity } from '../types/entities/Entity';
import { NODE_TYPES } from './../constants';
import { vec3, mat4 } from 'gl-matrix';
import {
  GetterSetterPropertyType,
  ProjectManagerObjectPropertyType,
} from '../types/cherry/CherryProjectManagerObject';
import { ShaderValue } from '../types/facade/ShaderValueType';
import { TreeNode } from '../types/tree/TreeNode';
import { Entities } from '../types/entities/Entities';
import { CherryObjectMeshes } from '../types/facade/CherryObjectMeshes';
import { CherryObjectInfo } from '../types/cherry/CherryObjectInfo';
import { CherryObjectAnimations } from '../types/facade/CherryObjectAnimations';

export * from './shaders';

export const cherryFacade = (cherryViewer: CherryViewer) => {
  const pm = cherryViewer.ProjectManager;
  const surface = cherryViewer.getSurface();
  const scene = surface.getScene();

  /**
   *
   * @param assetsFiles
   * Script object that holds all javascript files as strings. Necessary to run the cherryGL object
   */
  const loadAssetsAndRun = async (assetsFiles: {
    [key: string]: string;
  }): Promise<void> => {
    const files = Object.keys(assetsFiles);
    for (const path of files) {
      const content = assetsFiles[path];
      if (content) {
        const lastSlash = path.lastIndexOf('/') + 1;
        const fullpath = path.substring(0, lastSlash);

        cherryViewer.FS.createPath('/', fullpath);
        cherryViewer.FS.writeFile(path, new TextEncoder().encode(content));
      }
    }

    cherryViewer._main();
  };

  /**
   *
   * @param object
   * @param index
   */
  const getMaterialValues = (
    object: CherrySurfaceSceneObject,
    index: number
  ) => {
    const mesh_id = 0;
    const data = {} as Record<ShaderParameterType, any>;
    const pbr = object.getParameterBool(index, 'use_pbr');

    Object.keys(SHADER_PROPERTY_TYPES).forEach((key) => {
      const paramter = key as ShaderParameterType;
      const valueType = SHADER_PROPERTY_TYPES[paramter];

      if (pbr && SHADER_TYPES.PBR[paramter]) {
      }
      if (valueType === 'vec3') {
        const vec = object.getParameterVec3(index, paramter);
        if (RGB_PARAMETERS.includes(key)) {
          data[key as ShaderParameterType] = [
            +(vec.f1 * 255).toFixed(0),
            +(vec.f2 * 255).toFixed(0),
            +(vec.f3 * 255).toFixed(0),
          ];
        } else {
          data[paramter] = [
            +vec.f1.toFixed(0),
            +vec.f2.toFixed(0),
            +vec.f3.toFixed(0),
          ];
        }
      } else if (valueType === 'boolean') {
        data[paramter] = object.getParameterBool(mesh_id, paramter);
      } else if (valueType === 'float') {
        data[paramter] = object.getParameterFloat(mesh_id, paramter);
      } else if (valueType === 'string') {
        data[paramter] = object.getParameterString(mesh_id, paramter);
      }
    });

    return data;
  };

  /**
   *
   * @param key
   * @returns Object meshes
   */
  const getObjectMeshes = (key: CherryKey): CherryObjectMeshes => {
    const sceneObject = scene.getObject(key);
    const meshes = sceneObject.getMeshes();
    const meshMaterials = sceneObject.getMeshMaterials();
    const meshGroups = sceneObject.getMeshGroups();

    const generate = <T>(data: any): T[] => {
      const values = [];
      for (let x = 0; x < data.size(); x++) {
        values.push(data.get(x));
      }
      return values;
    };

    return {
      objectMeshes: generate<CherryMesh>(meshes),
      objectMeshMaterials: generate<CherryMeshMaterial>(meshMaterials),
      objectMeshGroups: generate<CherryMeshGroup>(meshGroups),
      shaderTypes: {
        0: 'PBR',
        1: 'STANDARD',
      },
    };
  };

  /**
   *
   * @param key
   * @returns Object info
   */
  const getObjectInfo = (key: CherryKey): CherryObjectInfo => {
    // Read object info
    return {
      file_size: 25_1024_000,
      number_of_meshes: 21,
      number_of_triangles: 321_412,
      number_of_vertices: 231,
      number_of_positions: 0,
      number_of_normals: 0,
      number_of_uvs: 1,
    };
  };

  /**
   *
   * @param key
   * @returns Object animations
   */
  const getObjectAnimation = (key: CherryKey): CherryObjectAnimations => {
    const object = pm.getObject(key);
    const { animations } = object.animation;
    const { animation } = object;

    return {
      animation,
      animations,
    };
  };

  /**
   *
   * @param key
   * @param property
   * @param value
   */
  const setObjectProperty = (
    key: CherryKey,
    propertyName: GetterSetterPropertyType,
    value: ProjectManagerObjectPropertyType
  ) => {
    const object = pm.getObject(key);
    (object[propertyName] as ProjectManagerObjectPropertyType) = value;
  };

  /**
   *
   * @param key
   * @param index
   * @param property
   * @param value
   */
  const setObjectMaterial = (
    key: CherryKey,
    index: number,
    property: ShaderParameterType, // albedo_texture | albedo_ratio
    value: ShaderValue
  ) => {
    const object = pm.getObject(key);
    object.mesh.set(index, property, value);
  };

  /**
   *
   * @param key
   * @param index
   * @param property
   * @param value
   */
  const removeObjectMaterial = (
    key: CherryKey,
    index: number,
    property: ShaderParameterType
  ) => {
    const object = pm.getObject(key);
    object.mesh.set(index, property, null);
  };

  /**
   *
   * @param index
   * @param meshType
   * @param shaderType
   */
  const setObjectShaderType = (
    index: number,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP',
    shaderType: any
  ) => {};

  /**
   *
   * @param key
   * @param index
   * @param value
   * @param meshType 'MESH' | 'MATERIAL' | 'GROUP'
   */
  const highlightMesh = (
    key: CherryKey,
    index: number,
    value: boolean,
    meshType: 'MESH' | 'MATERIAL' | 'GROUP'
  ) => {
    const parameter = 'highlighted';
    const object = scene.getObject(key);
    object.setParameter(index, parameter, value);
    pm.isDirty = true;
  };

  /**
   *
   * @param assets Asset[]
   * @description Set the assets paths so the 3d viewer can reload the objects
   */
  const setAssets = (assets: Asset[]): void => {
    pm.loadPaths(assets);
  };

  /**
   *
   * @param node
   * @param entities
   * @param parent
   * @param rescale
   * @returns
   */
  const addObjectToScene = (
    node: TreeNode,
    entities: Entities,
    parent?: TreeNode,
    rescale: boolean = true
  ) => {
    const parentObject = parent ? pm.getObject(parent.key) : null;
    const currentObject = pm.addObject(node, entities, parentObject);
    const currentEntity = entities[node.key];

    if (rescale && node.type === NODE_TYPES.object) {
      currentObject.applyAutoScale();
      currentObject.applyAutoPivot();
    }

    if (node.type === NODE_TYPES.light) {
      const { key } = node;
      const light = pm.getObject(key);
      let lightobj = scene.getObject(key);

      if (!lightobj) {
        lightobj = scene.addObject(key, '/assets/sun.c3b');
        pm.objects[lightobj.$$.ptr] = { key };
        lightobj.setParameter('front_facing', true);
        lightobj.setParameter('visible', light.parentOpts.visible);
      }

      const updatePosition = () => {
        const vec = vec3.fromValues(
          light.finalPosition[0],
          light.finalPosition[1],
          light.finalPosition[2]
        );
        const scale = vec3.fromValues(1 / 100, 1 / 100, 1 / 100);
        const m = mat4.create();
        mat4.translate(m, m, vec);
        mat4.scale(m, m, scale);
        lightobj.setTransformMatrix(m);
      };

      // light.clearChangeHandlers();
      light.addChangeListener((type: string) => {
        switch (type) {
          case 'removed':
            scene.removeObject(key);
            break;
          case 'transform':
            updatePosition();
            break;
          case 'visible':
            lightobj.setParameter('visible', light.parentOpts.visible);
            break;
        }
      });

      updatePosition();
    }

    return {
      ...currentEntity,
      autoscale: currentObject.autoscale,
      pivot: currentObject.pivot,
    } as Entity;
  };

  return {
    loadAssetsAndRun,
    getMaterialValues,
    getObjectMeshes,
    getObjectInfo,
    getObjectAnimation,
    setObjectProperty,
    setObjectMaterial,
    removeObjectMaterial,
    setObjectShaderType,
    highlightMesh,
    setAssets,
    addObjectToScene,
  };
};

export default cherryFacade;
