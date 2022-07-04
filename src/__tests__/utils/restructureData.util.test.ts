import { NODE_TYPES } from '../../constants/nodeTypes';
import { restructureData } from '../../utils/restructureData.util';

export const debugFn = (data: unknown, label = ''): void => {
  console.log(label, JSON.stringify(data, null, 2));
};

const tree: any[] = [
  {
    key: '1',
    title: 'Objects',
    type: 'object-group',
    children: [
      {
        key: '2',
        title: 'Mute',
        type: 'configuration',
        children: [
          {
            key: '3',
            title: 'Logo & Graphics',
            skey: '33',
            type: 'hud-link',
            children: [
              {
                key: '4',
                title: 'Mute',
                skey: '44',
                id: 'assets/square.c3b',
                type: 'object-hud-link',
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '9',
    title: 'AR HUD ',
    type: 'hud',
    children: [],
  },
];

const entities: any = {
  '1': {
    groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    visible: true,
  },
  '2': { data: {} },
  '3': {
    data: {
      '0': {
        ambient_texture: '1',
        ambient_video: '',
        opacity_texture: '1',
        opacity_texture_channel: 'a',
      },
    },
    visible: false,
  },
  '4': {
    groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    visible: false,
  },
  '9': {
    visible: true,
    groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  },
};

describe('Test restructure', () => {
  describe('restructureData method for configurations', () => {
    it('should create group for configurations if exists', () => {
      const primitiveKey = '0';
      const { newConfigurationsTree } = restructureData(
        tree,
        entities,
        primitiveKey
      );

      expect([
        {
          key: '1',
          title: 'Objects',
          type: 'object-group',
          visible: true,
          children: [
            {
              key: '2',
              title: 'Mute',
              type: 'configuration',
              visible: true,
              children: [
                {
                  key: '3',
                  title: 'Logo & Graphics',
                  skey: '33',
                  type: 'hud-link',
                  visible: false,
                  children: [
                    {
                      key: '4',
                      title: 'Mute',
                      skey: '44',
                      id: primitiveKey,
                      type: 'object-hud-link',
                      visible: false,
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]).toEqual(newConfigurationsTree);
    });

    it('should create group for entities if exists', () => {
      const primitiveKey = '0';
      const { newEntities } = restructureData(tree, entities, primitiveKey);

      expect({
        '1': {
          ...entities['1'],
          key: '1',
          type: NODE_TYPES.objectGroup,
        },
        '2': {
          ...entities['2'],
          key: '2',
          type: NODE_TYPES.configuration,
        },
        '3': {
          ...entities['3'],
          key: '3',
          skey: '33',
          type: NODE_TYPES.hudLink,
        },
        '4': {
          ...entities['4'],
          key: '4',
          skey: '44',
          type: NODE_TYPES.objectHudLink,
        },
        '9': {
          ...entities['9'],
          key: '9',
          type: NODE_TYPES.hud,
        },
      }).toEqual(newEntities);
    });
  });
});
