export type ShaderType = 'PBR' | 'STANDARD';
export type ShaderParameterType =
  | 'use_pbr'
  | 'ao_ratio'
  | 'ao_texture'
  | 'ao_texture_channel'
  | 'metalness_ratio'
  | 'metalness_texture'
  | 'metalness_texture_channel'
  | 'roughness_ratio'
  | 'roughness_texture'
  | 'roughness_texture_channel'
  | 'albedo_ratio'
  | 'albedo_texture'
  | 'albedo_video'
  | 'use_alpha_channel'
  | 'emissive_ratio'
  | 'emissive_texture'
  | 'diffuse_ibl_ratio'
  | 'specular_pbr_ratio'
  | 'specular_ibl_ratio'
  | 'normal_texture'
  | 'normal_ratio'
  | 'uv_animation'
  | 'opacity_ratio'
  | 'opacity_texture'
  | 'opacity_texture_channel'
  | 'ambient_ratio'
  | 'ambient_texture'
  | 'ambient_video'
  | 'diffuse_ratio'
  | 'diffuse_texture'
  | 'specular_ratio'
  | 'specular_texture'
  | 'specular_power'
  | 'normal_texture'
  | 'normal_ratio'
  | 'uv_animation'
  | 'opacity_ratio'
  | 'opacity_texture'
  | 'opacity_texture_channel';

export type ShaderValueType = 'float' | 'file' | 'string' | 'vec3' | 'boolean';

export const SHADER: ShaderType[] = ['PBR', 'STANDARD'];

export const SHADER_TYPES: Record<ShaderType, ShaderParameterType[]> = {
  PBR: [
    'ao_ratio',
    'ao_texture',
    'ao_texture_channel',

    'metalness_ratio',
    'metalness_texture',
    'metalness_texture_channel',

    'roughness_ratio',
    'roughness_texture',
    'roughness_texture_channel',

    'albedo_ratio',
    'albedo_texture',
    'albedo_video',

    'use_alpha_channel',

    'emissive_ratio',
    'emissive_texture',

    // diffuse_pbr_ratio: [255,255,255],
    'diffuse_ibl_ratio',

    'specular_pbr_ratio',
    'specular_ibl_ratio',

    'normal_texture',
    'normal_ratio',

    'uv_animation',

    'opacity_ratio',
    'opacity_texture',
    'opacity_texture_channel',
  ],
  STANDARD: [
    'ambient_ratio',
    'ambient_texture',
    'ambient_video',

    'diffuse_ratio',
    'diffuse_texture',

    'specular_ratio',
    'specular_texture',
    'specular_power',

    'normal_texture',
    'normal_ratio',

    'uv_animation',

    'opacity_ratio',
    'opacity_texture',
    'opacity_texture_channel',
  ],
};

export const SHADER_PROPERTY_TYPES: Record<
  ShaderParameterType,
  ShaderValueType
> = {
  use_pbr: 'boolean',

  ao_ratio: 'float',
  ao_texture: 'file',
  ao_texture_channel: 'string',

  metalness_ratio: 'float',
  metalness_texture: 'file',
  metalness_texture_channel: 'string',

  roughness_ratio: 'float',
  roughness_texture: 'file',
  roughness_texture_channel: 'string',

  albedo_ratio: 'vec3',
  albedo_texture: 'file',
  albedo_video: 'file',

  emissive_ratio: 'vec3',
  emissive_texture: 'file',

  diffuse_ibl_ratio: 'vec3',
  specular_pbr_ratio: 'vec3',
  specular_ibl_ratio: 'vec3',

  normal_texture: 'file',
  normal_ratio: 'float',
  uv_animation: 'float',

  opacity_ratio: 'float',
  opacity_texture: 'file',
  opacity_texture_channel: 'string',

  ambient_ratio: 'vec3',
  ambient_texture: 'file',
  ambient_video: 'file',

  diffuse_ratio: 'vec3',
  diffuse_texture: 'file',

  specular_ratio: 'vec3',
  specular_texture: 'file',
  specular_power: 'float',

  use_alpha_channel: 'boolean', // maybe does not needed ?
};

export const RGB_PARAMETERS = [
  'albedo_ratio',
  'emissive_ratio',
  'diffuse_pbr_ratio',
  'diffuse_ibl_ratio',
  'specular_pbr_ratio',
  'specular_ibl_ratio',
  'ambient_ratio',
  'diffuse_ratio',
  'specular_ratio',
  'sheen_color_ratio',
  'specular_glossiness_diffuse_ratio',
  'specular_glossiness_specular_ratio',
];

export const TEXTURE_PARAMETERS = [
  'ao_texture',
  'specular_texture',
  'metalness_texture',
  'roughness_texture',
  'albedo_texture',
  'emissive_texture',
  'normal_texture',
  'opacity_texture',
  'ambient_texture',
  'diffuse_texture',
  'clearcoat_texture',
  'transmission_texture',
  'sheen_color_texture',
  'sheen_roughness_texture',
  'specular_glossiness_texture',
  'specular_glossiness_diffuse_texture',
];

export const VIDEO_PARAMETERS = ['albedo_video', 'ambient_video'];

export const PBR_TEXTURES_PARAMETERS = [
  'ao_texture',
  'roughness_texture',
  'metalness_texture',
];

export const TRANSPARENCY_TEXTURES_PARAMETERS = [
  'albedo_texture',
  'diffuse_texture',
  'opacity_texture',
];
