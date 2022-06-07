export type MegaControllerVideoComponent = {
  label: 'Video Component';
  field: 'videos';
  type: 'video';
  header: 'Video Component';
  description: 'Drop Video';
  allowed: ['video'];
  list: true;
  value: {
    file: string;
    type: 'play' | 'pause' | 'stop';
    aftercamera: boolean;
  };
};
