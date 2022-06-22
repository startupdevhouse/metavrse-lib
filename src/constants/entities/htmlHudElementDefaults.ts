export const htmlHudDefaults = <const>{
  hud: {
    type: 'div',
    visible: true,
    data: {
      default: {
        'box-sizing': 'border-box',
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '100%',
        'pointer-events': 'none',
      },
      '> *': {
        'pointer-events': 'all',
      },
    },
  },
  'square-floating': {
    type: 'div',
    visible: true,
    data: {
      default: {
        'box-sizing': 'border-box',
        position: 'absolute',
        top: '50%',
        left: '50%',
        height: '100px',
        width: '100px',
        background: 'white',
        transform: 'translate(-50%, -50%)',
      },
    },
  },
  'square-inline': {
    type: 'div',
    visible: true,
    data: {
      default: {
        'box-sizing': 'border-box',
        display: 'inline-block',
        height: '100px',
        width: '100px',
        background: 'white',
      },
    },
  },
  image: {
    type: 'img',
    visible: true,
    props: {
      src: 'url',
    },
    data: {
      default: {
        'box-sizing': 'border-box',
        height: '100px',
        width: '100px',
      },
    },
  },
  input: {
    type: 'input',
    visible: true,
    props: {
      type: 'text',
    },
    data: {
      default: {
        'box-sizing': 'border-box',
        height: 'auto',
        width: 'auto',
      },
    },
  },
  text: {
    type: 'div',
    text: 'Your text here',
    visible: true,
    data: {
      default: {
        'box-sizing': 'border-box',
        display: 'block',
        height: 'auto',
        width: 'auto',
        'font-size': '1.2em',
        color: 'black',
      },
    },
  },
};
