export const items = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.2,
      // ease: 'linear',
      staggerDirection: -1,
      duration: 1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      // ease: 'linear',
      staggerDirection: 1,
      duration: 1,
    },
  },
};

export const COLOR_THEMES = [
  {
    text: '#B2C1DE',
    background: '#4F2E2D',
  },
  {
    text: '#FFFFFF',
    background: '#7E7F2D',
  },
  {
    text: '#7E7F2D',
    background: '#E8BE2C',
  },
  {
    text: '#4FA055',
    background: '#E9C7DC',
  },
  {
    text: '#D8BFD8',
    background: '#556B2F',
  },
  {
    text: '#3470A3',
    background: '#E3D9CC',
  },
  {
    text: '#F7DAE4',
    background: '#C07138',
  },
];

export const BACKEND_ROOT = 'http://localhost:3001';
