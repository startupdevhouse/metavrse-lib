import {
  CherryMesh,
  CherryMeshGroup,
  CherryMeshMaterial,
} from '../types/cherry/CherryMesh';
import { CherryKey } from '../types/cherry/CherryKey';
import { CherryViewer } from '../types/cherry/CherryViewer';
import { ShaderParameterType } from '../types/facade/ShaderParameterType';
import { RGB_PARAMETERS, SHADER_PROPERTY_TYPES } from './shaders';
import { Asset } from '../types/assets/Asset';
import { Entity } from '../types/entities/Entity';
import { NODE_TYPES } from './../constants';
import { vec3, mat4 } from 'gl-matrix';
import {
  GetterSetterPropertyType,
  ProjectManagerObjectPropertyType,
} from '../types/cherry/CherryProjectManagerObject';
import { ShaderValue, ShaderValueType } from '../types/facade/ShaderValueType';
import { TreeNode } from '../types/tree/TreeNode';
import { Entities } from '../types/entities/Entities';
import { CherryObjectMeshes } from '../types/facade/CherryObjectMeshes';
import { CherryObjectInfo } from '../types/cherry/CherryObjectInfo';
import { CherryObjectAnimations } from '../types/facade/CherryObjectAnimations';
import { CherrySurfaceSceneObject, Vector3, World } from '..';

export * from './shaders';

export const cherryFacade = (cherryViewer: CherryViewer) => {
  const pm = cherryViewer.ProjectManager;
  const surface = cherryViewer.getSurface();
  const scene = surface.getScene();

  const getParameterType = (
    object: CherrySurfaceSceneObject,
    meshId: number,
    propertyName: ShaderParameterType,
    valueType: ShaderValueType,
    data?: Record<ShaderParameterType, ShaderValue>
  ) => {
    const newData = !data
      ? ({} as Record<ShaderParameterType, ShaderValue>)
      : data;
    if (valueType === 'vec3') {
      const vec = object.getParameterVec3(meshId, propertyName);
      if (RGB_PARAMETERS.includes(propertyName)) {
        newData[propertyName as ShaderParameterType] = [
          +(vec.f1 * 255).toFixed(0),
          +(vec.f2 * 255).toFixed(0),
          +(vec.f3 * 255).toFixed(0),
        ];
      } else {
        newData[propertyName] = [
          +vec.f1.toFixed(0),
          +vec.f2.toFixed(0),
          +vec.f3.toFixed(0),
        ];
      }
    } else if (valueType === 'boolean') {
      newData[propertyName] = object.getParameterBool(meshId, propertyName);
    } else if (valueType === 'float') {
      newData[propertyName] = object.getParameterFloat(meshId, propertyName);
    } else if (valueType === 'string') {
      const value = object.getParameterString(meshId, propertyName);
      if (propertyName.includes('channel')) {
        newData[propertyName] = value === '' ? 'r' : value;
      } else {
        newData[propertyName] = value;
      }
    }

    return newData;
  };

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
   * @param key
   * @param meshId
   * @param propertyName
   */
  const getMaterialValue = (
    key: CherryKey,
    meshId: number,
    propertyName: ShaderParameterType
  ): Record<ShaderParameterType, ShaderValue> => {
    const object = scene.getObject(key);
    const paramter = propertyName;
    const valueType = SHADER_PROPERTY_TYPES[paramter];

    return getParameterType(object, meshId, propertyName, valueType);
  };

  /**
   *
   * @param key
   * @param meshId
   */
  const getMaterialValues = (
    key: CherryKey,
    meshId: number
  ): Record<ShaderParameterType, ShaderValue> => {
    const object = scene.getObject(key);
    const data = {} as Record<ShaderParameterType, any>;

    Object.keys(SHADER_PROPERTY_TYPES).forEach((key) => {
      const paramter = key as ShaderParameterType;
      const valueType = SHADER_PROPERTY_TYPES[paramter];
      getParameterType(object, meshId, paramter, valueType, data);
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
   * The CherryKey value
   * @param id
   * The Asset id that represents the file in scenegraph = "/project/assets/"
   * @returns Object info
   */
  const getObjectInfo = (key: CherryKey, id: CherryKey): CherryObjectInfo => {
    const object = scene.getObject(key);
    const sceneObject = scene.getObject(key);
    const meshes = sceneObject.getMeshes();
    const meshMaterials = sceneObject.getMeshMaterials();
    const meshGroups = sceneObject.getMeshGroups();

    try {
      const stats = cherryViewer.FS.stat(`/project/assets/${id}`);
      const fileSize = stats.size;

      return {
        fileSize,
        meshes: meshes.size(),
        materials: meshMaterials.size(),
        groups: meshGroups.size(),
        triangles: object.getParameterInt('number_of_triangles'),
        vertices: object.getParameterInt('number_of_vertices'),
        positions: object.getParameterInt('number_of_positions'),
        normals: object.getParameterInt('number_of_normals'),
        uvs: object.getParameterInt('number_of_uvs'),
      };
    } catch (e) {
      console.log(e);
    }

    return {
      fileSize: 0,
      meshes: 0,
      materials: 0,
      groups: 0,
      triangles: 0,
      vertices: 0,
      positions: 0,
      normals: 0,
      uvs: 0,
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
    ids: number[],
    property: ShaderParameterType, // albedo_texture | albedo_ratio
    value: ShaderValue
  ) => {
    const object = pm.getObject(key);

    if (!ids.length) {
      return;
    }

    for (const id of ids) {
      object.mesh.set(id, property, value);
    }
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
    ids: number[],
    property: ShaderParameterType
  ) => {
    const object = pm.getObject(key);

    if (!ids.length) {
      return;
    }

    for (const id of ids) {
      object.mesh.set(id, property, null);
    }
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

  const setSkyboxVisibility = (isVisible: boolean) => {
    scene.showSkybox(isVisible);
    pm.isDirty = true;
  }

  const setSkyboxTransformMatrix = (vector: Vector3) => {
    scene.setSkyboxTransformMatrix(vector);
    pm.isDirty = true;
  }

  const setSkyboxKey = (currentScene: CherryKey, key: CherryKey) => {
    pm.project.data[currentScene].data.world.skybox.key = key;
    pm.isDirty = true;
  }

  return {
    loadAssetsAndRun,
    getMaterialValue,
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
    setSkyboxVisibility,
    setSkyboxTransformMatrix,
    setSkyboxKey
  };
};

export default cherryFacade;
