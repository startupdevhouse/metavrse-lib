import { ConfigurationEntity } from '../../types/entities/ConfigurationEntity';
import { NODE_TYPES } from '../nodeTypes';

export const configurationDefaults: Omit<ConfigurationEntity, 'key' | 'skey'> =
  {
    type: NODE_TYPES.configuration,
    visible: true,
  };
