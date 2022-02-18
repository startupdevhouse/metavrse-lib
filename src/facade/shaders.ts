export type ShaderType = 'PBR' | 'STANDARD';
export type ShaderValueType =
  | 'number'
  | 'file'
  | 'string'
  | 'vector'
  | 'boolean';

export const SHADERS: Record<ShaderType, { [key: string]: ShaderValueType }> = {
  PBR: {
    ao_ratio: 'number',
    ao_texture: 'file',
    ao_texture_channel: 'string',
    metalness_ratio: 'number',
    metalness_texture: 'file',
    metalness_texture_channel: 'string',
    roughness_ratio: 'number',
    roughness_texture: 'file',
    roughness_texture_channel: 'string',
    albedo_ratio: 'vector',
    albedo_texture: 'file',
    albedo_video: 'file',
    use_alpha_channel: 'boolean',
    emissive_ratio: 'vector',
    emissive_texture: 'file',
    diffuse_ibl_ratio: 'vector',
    specular_pbr_ratio: 'vector',
    specular_ibl_ratio: 'vector',
    normal_texture: 'file',
    normal_ratio: 'number',
    uv_animation: 'number',
    opacity_ratio: 'number',
    opacity_texture: 'file',
    opacity_texture_channel: 'string',
  },
  STANDARD: {
    ambient_ratio: 'vector',
    ambient_texture: 'file',
    ambient_video: 'file',
    diffuse_ratio: 'vector',
    diffuse_texture: 'file',
    specular_ratio: 'vector',
    specular_texture: 'file',
    specular_power: 'number',
    normal_texture: 'file',
    normal_ratio: 'number',
    uv_animation: 'number',
    opacity_ratio: 'number',
    opacity_texture: 'file',
    opacity_texture_channel: 'string',
  },
};
