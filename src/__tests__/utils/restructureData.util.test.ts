import { restructureData } from '../../utils/restructureData.util';

export const debugFn = (data: unknown, label = ''): void => {
  console.log(label, JSON.stringify(data, null, 2));
};

const tree: any[] = [
  {
    key: '1608252638393',
    title: 'Objects',
    type: 'object-group',
    children: [
      {
        key: '1610339829473',
        title: 'Mute',
        type: 'configuration',
        children: [
          {
            key: '1610339854751',
            title: 'Logo & Graphics',
            skey: '1608413337359',
            type: 'hud-link',
            children: [
              {
                key: '1610339854753',
                title: 'Mute',
                skey: '1610157871034',
                id: 'assets/square.c3b',
                type: 'object-hud-link',
                children: [],
              },
            ],
          },
        ],
      },
      {
        key: '1611124999400',
        title: 'Quiz 12',
        type: 'configuration',
        disableCheckbox: false,
        children: [
          {
            key: '1611125242858',
            title: 'Quizes',
            skey: '1609903927365',
            type: 'object-group-link',
            disableCheckbox: false,
            children: [
              {
                key: '1611125242859',
                title: 'Main Objects',
                skey: '1609976244582',
                type: 'object-group-link',
                disableCheckbox: false,
                children: [
                  {
                    key: '1611125242860',
                    title: 'QUIZ updated FINAL.fbx.c3b',
                    skey: '1611054109409',
                    id: '0',
                    type: 'object-link',
                    disableCheckbox: false,
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: '1606255650220',
    title: 'AR HUD ',
    type: 'hud',
    children: [],
  },
];

const entities: any = {
  '1610339829473': {
    groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    visible: true,
  },
  '1610339854751': { data: {} },
  '1610339854753': {
    data: {
      '0': {
        ambient_texture: '1610157854060',
        ambient_video: '',
        opacity_texture: '1610157854060',
        opacity_texture_channel: 'a',
      },
    },
    visible: false,
  },
  '1611124999400': {
    groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    visible: false,
  },
  '1611125242858': { data: {} },
  '1611125242859': { data: {} },
  '1611125242860': {
    data: {
      '0': {
        albedo_ratio: [255, 255, 255],
        albedo_texture: '1611196831859',
        albedo_video: '',
        opacity_texture: '1611196831859',
        opacity_texture_channel: 'a',
        use_pbr: true,
      },
      '1': {
        albedo_ratio: [255, 255, 255],
        albedo_texture: '1611196831859',
        albedo_video: '',
        opacity_texture: '1611196831859',
        opacity_texture_channel: 'a',
        use_pbr: true,
      },
      '2': { opacity_ratio: 0 },
      '3': { opacity_ratio: 0 },
      '6': { opacity_ratio: 0 },
      '7': { opacity_ratio: 0 },
      '8': {
        albedo_texture: '1611196831859',
        albedo_video: '',
        opacity_texture: '1611196831859',
        opacity_texture_channel: 'a',
      },
    },
    visible: false,
  },
  '1606255650220': {
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
      debugFn(newConfigurationsTree);
      expect([
        {
          key: '1608252638393',
          title: 'Objects',
          type: 'object-group',
          visible: true,
          children: [
            {
              key: '1610339829473',
              title: 'Mute',
              type: 'configuration',
              visible: true,
              children: [
                {
                  key: '1610339854751',
                  title: 'Logo & Graphics',
                  skey: '1608413337359',
                  type: 'hud-link',
                  visible: true,
                  children: [
                    {
                      key: '1610339854753',
                      title: 'Mute',
                      skey: '1610157871034',
                      id: primitiveKey,
                      type: 'object-hud-link',
                      visible: false,
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              key: '1611124999400',
              title: 'Quiz 12',
              type: 'configuration',
              visible: false,
              children: [
                {
                  key: '1611125242858',
                  title: 'Quizes',
                  skey: '1609903927365',
                  type: 'object-group-link',
                  visible: true,
                  children: [
                    {
                      key: '1611125242859',
                      title: 'Main Objects',
                      skey: '1609976244582',
                      type: 'object-group-link',
                      visible: true,
                      children: [
                        {
                          key: '1611125242860',
                          title: 'QUIZ updated FINAL.fbx.c3b',
                          skey: '1611054109409',
                          id: primitiveKey,
                          type: 'object-link',
                          visible: false,
                          children: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ]).toEqual(newConfigurationsTree);
    });

    it('should create group for configurations if exists', () => {
      const primitiveKey = '0';
      const { newConfigurationsEntities } = restructureData(
        tree,
        entities,
        primitiveKey
      );
      debugFn(newConfigurationsEntities);
      expect({
        '1608252638393': {
          position: [0, 0, 0],
          scale: [1, 1, 1],
          rotate: [0, 0, 0],
          visible: true,
          opacity: 1,
          data: {},
          groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        },
        '1610339829473': {
          groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          visible: true,
        },
        '1610339854751': { data: {} },
        '1610339854753': {
          data: {
            '0': {
              ambient_texture: '1610157854060',
              ambient_video: '',
              opacity_texture: '1610157854060',
              opacity_texture_channel: 'a',
            },
          },
          visible: false,
        },
        '1611124999400': {
          groupMat: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
          visible: false,
        },
        '1611125242858': { data: {} },
        '1611125242859': { data: {} },
        '1611125242860': {
          data: {
            '0': {
              albedo_ratio: [255, 255, 255],
              albedo_texture: '1611196831859',
              albedo_video: '',
              opacity_texture: '1611196831859',
              opacity_texture_channel: 'a',
              use_pbr: true,
            },
            '1': {
              albedo_ratio: [255, 255, 255],
              albedo_texture: '1611196831859',
              albedo_video: '',
              opacity_texture: '1611196831859',
              opacity_texture_channel: 'a',
              use_pbr: true,
            },
            '2': { opacity_ratio: 0 },
            '3': { opacity_ratio: 0 },
            '6': { opacity_ratio: 0 },
            '7': { opacity_ratio: 0 },
            '8': {
              albedo_texture: '1611196831859',
              albedo_video: '',
              opacity_texture: '1611196831859',
              opacity_texture_channel: 'a',
            },
          },
          visible: false,
        },
      }).toEqual(newConfigurationsEntities);
    });
  });
});
