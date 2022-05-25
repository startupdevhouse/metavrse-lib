export const NODE_TYPES = {
  hud: 'hud',
  hudLink: 'hud-link',
  HTMLHudElement: 'HTMLElement',
  HTMLHudLink: 'HTMLElement-link',
  image: 'image',
  imageLink: 'image-link',
  light: 'light',
  lightLink: 'light-link',
  object: 'object',
  objectLink: 'object-link',
  objectHud: 'object-hud',
  objectHudLink: 'object-hud-link',
  objectGroup: 'object-group',
  objectGroupLink: 'object-group-link',
  video: 'video',
  videoLink: 'video-link',
  camera: 'camera',
  configuration: 'configuration',
  folder: 'folder',
  javascript: 'javascript',
  stylesheet: 'stylesheet',
} as const;

export const GIZMO_KEY = '__gizmo__' as const;
export const GIZMO_ROTATE_KEY = '__gizmoRotate__' as const;
