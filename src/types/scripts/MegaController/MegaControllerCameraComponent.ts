export type MegaControllerCameraComponent = {
  label: 'Camera';
  field: 'cameracomponent';
  type: 'file';
  header: 'Camera';
  description: 'Drop Camera';
  allowed: ['camera'];
  list: false;
  toggle: false;
  aftercamera: false;
  value: {
    file: string;
    toggled: boolean;
    aftercamera: boolean;
  };
};
