import boombox from '../assets/boombox.png';
import musicplayer from '../assets/musicplayer.png';
import radio from '../assets/radio.png';
import recordplayer from '../assets/recordplayer.png';

export const items = {
  hidden: {
    filter: 'blur(10px)',
    opacity: 0.3,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.2,
      // ease: 'linear',
      staggerDirection: -1,
      duration: 1,
    },
  },
  visible: {
    filter: 'blur(0px)',
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
    background: '#2B3656',
    text: '#F79423',
  },
  {
    background: '#EFC64E',
    text: '#392F27',
  },
  {
    background: '#FFED99',
    text: '#F54505',
  },
  {
    text: '#F46004',
    background: '#CAD0C7',
  },
  {
    text: '#576FD7',
    background: '#E3D9CC',
  },
  {
    text: '#462C2C',
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
  {
    text: '#F15922',
    background: '#D3CEC2',
  },
];

export const LAYOUTS = [
  {
    text: {
      top: '22vh',
      left: '3vw',
      width: '60%',
      height: '40vh',
    },
    album: {
      right: '3vw',
      bottom: '23vh',
    },
  },
  {
    text: {
      top: '10vh',
      left: '3vw',
      width: '60%',
      height: '50vh',
    },
    album: {
      right: '8vw',
      bottom: '25vh',
    },
  },
  {
    text: {
      top: '10vh',
      right: '3vw',
      width: '60%',
      height: '70vh',
      textAlign: 'left',
    },
    album: {
      left: '8vw',
      bottom: '25vh',
    },
  },
  {
    text: {
      top: '20vh',
      right: '3vw',
      width: '60%',
      textAlign: 'left',
      height: '40vh',
    },
    album: {
      left: '8vw',
      bottom: '25vh',
    },
  },
];

export const ASCII_ART = [boombox, radio, recordplayer, musicplayer];

export const BACKEND_ROOT = 'http://localhost:3001';
