// @ts-nocheck
import ARObjectController from './scripts/ARObjectController';
import Animations from './scripts/Animations';
import CameraBase from './scripts/CameraBase';
import CameraPerspective from './scripts/CameraPerspective';
import OrbitalController from './scripts/OrbitalController';
import TrackballCamera from './scripts/TrackballCamera';
import TrackballController from './scripts/TrackballController';
import axios from './scripts/axios.min';
import encoding from './scripts/encoding';
import glmatrix from './scripts/gl-matrix';
import idb from './scripts/idb';
import jszip from './scripts/jszip.min';
import main from './scripts/main';
import socketio from './scripts/socketio';

import LoadingBar from './scripts/Components/LoadingBar.js';

import ProjectManager from './scripts/ProjectManager/ProjectManager';
import Scenegraph from './scripts/ProjectManager/Scenegraph';
import URLLoader from './scripts/ProjectManager/URLLoader';

import Camera from './scripts/ProjectManager/Scene/Camera';
import CameraLink from './scripts/ProjectManager/Scene/CameraLink';
import Configuration from './scripts/ProjectManager/Scene/Configuration';
import GenericObject from './scripts/ProjectManager/Scene/GenericObject';
import HTMLElement from './scripts/ProjectManager/Scene/HTMLElement';
import HTMLElementLink from './scripts/ProjectManager/Scene/HTMLElementLink';
import Hud from './scripts/ProjectManager/Scene/Hud';
import HudLink from './scripts/ProjectManager/Scene/HudLink';
import Light from './scripts/ProjectManager/Scene/Light';
import LightLink from './scripts/ProjectManager/Scene/LightLink';
import Object_ from './scripts/ProjectManager/Scene/Object';
import ObjectGroup from './scripts/ProjectManager/Scene/ObjectGroup';
import ObjectGroupLink from './scripts/ProjectManager/Scene/ObjectGroupLink';
import ObjectLink from './scripts/ProjectManager/Scene/ObjectLink';
import Video from './scripts/ProjectManager/Scene/Video';
import VideoLink from './scripts/ProjectManager/Scene/VideoLink';
import World from './scripts/ProjectManager/Scene/World';

const MAIN_PATH = 'assets';
const PROJECT_MANAGER = `${MAIN_PATH}/ProjectManager`;
const SCENE = `${PROJECT_MANAGER}/Scene`;
const COMPONENTS = `${MAIN_PATH}/Components`;

export const scripts = {
  [`${MAIN_PATH}/`]: null, // Folder to create
  [`${MAIN_PATH}/ARObjectController.js`]: ARObjectController,
  [`${MAIN_PATH}/Animations.js`]: Animations,
  [`${MAIN_PATH}/CameraBase.js`]: CameraBase,
  [`${MAIN_PATH}/CameraPerspective.js`]: CameraPerspective,
  [`${MAIN_PATH}/OrbitalController.js`]: OrbitalController,
  [`${MAIN_PATH}/TrackballCamera.js`]: TrackballCamera,
  [`${MAIN_PATH}/TrackballController.js`]: TrackballController,
  [`${MAIN_PATH}/axios.min.js`]: axios,
  [`${MAIN_PATH}/encoding.js`]: encoding,
  [`${MAIN_PATH}/gl-matrix.js`]: glmatrix,
  [`${MAIN_PATH}/idb.js`]: idb,
  [`${MAIN_PATH}/jszip.min.js`]: jszip,
  [`${MAIN_PATH}/main.js`]: main,
  [`${MAIN_PATH}/socketio.js`]: socketio,

  [`${COMPONENTS}/`]: null, // Folder to create
  [`${COMPONENTS}/LoadingBar.js`]: LoadingBar,

  [`${PROJECT_MANAGER}/`]: null, // Folder to create
  [`${PROJECT_MANAGER}/ProjectManager.js`]: ProjectManager,
  [`${PROJECT_MANAGER}/Scenegraph.js`]: Scenegraph,
  [`${PROJECT_MANAGER}/URLLoader.js`]: URLLoader,
  [`${SCENE}/Camera.js`]: Camera,
  [`${SCENE}/CameraLink.js`]: CameraLink,
  [`${SCENE}/Configuration.js`]: Configuration,
  [`${SCENE}/GenericObject.js`]: GenericObject,
  [`${SCENE}/HTMLElement.js`]: HTMLElement,
  [`${SCENE}/HTMLElementLink.js`]: HTMLElementLink,
  [`${SCENE}/Hud.js`]: Hud,
  [`${SCENE}/HudLink.js`]: HudLink,
  [`${SCENE}/Light.js`]: Light,
  [`${SCENE}/LightLink.js`]: LightLink,
  [`${SCENE}/Object.js`]: Object_,
  [`${SCENE}/ObjectGroup.js`]: ObjectGroup,
  [`${SCENE}/ObjectGroupLink.js`]: ObjectGroupLink,
  [`${SCENE}/ObjectLink.js`]: ObjectLink,
  [`${SCENE}/Video.js`]: Video,
  [`${SCENE}/VideoLink.js`]: VideoLink,
  [`${SCENE}/World.js`]: World,
  // png
  // c3b
};
