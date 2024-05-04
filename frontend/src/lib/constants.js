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
  {
    text: '#DBCEAF',
    background: '#EF5F47',
  },
];

// xs = <=250 --> 60
// sm = 250-450 --> 48
// md = 450-550 --> 40
// lg = 620+ --> 32
// export const LAYOUTS = {
//     small: [{
//       text: {
//         top: '10vh',
//         right: '1vw',
//         width: '60%',
//         height: '40vh',
//         textAlign: 'center',
//         fontSize: '60px',
//       },
//       album: {
//         right: '16vw',
//         bottom: '25vh',
//       },
//       albumCover: {
//         width: ''
//       }
//     },
//     ]
// };

export const SIZES = {
  xs: {
    text: '72px',
    album: '350px',
  },
  sm: {
    text: '54px',
    album: '300px',
  },
  md: {
    text: '42px',
    album: '275px',
  },
  lg: {
    text: '36px',
    album: '260px',
  },
  xl: {
    text: '28px',
    album: '230px',
  },
};
export const XS_LAYOUTS = [
  {
    text: {
      top: '10vh',
      left: '3vw',
      width: '50%',
      height: '40vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '16vw',
      bottom: '25vh',
    },
    ascii: {
      left: '10vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      bottom: '22vh',
      right: '2vw',
      width: '90%',
      height: '23vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      left: '16vw',
      top: '8vh',
    },
    ascii: {
      right: '6vw',
      top: '4vh',
    },
  },
  {
    text: {
      top: '10vh',
      right: '3vw',
      width: '50%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      left: '16vw',
      bottom: '25vh',
    },
    ascii: {
      right: '10vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      top: '10vh',
      left: '5vw',
      width: '50%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '10vw',
      bottom: '25vh',
    },
    ascii: {
      left: '10vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      bottom: '22vh',
      left: '14vw',
      width: '60%',
      height: '35vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '2vw',
      top: '8vh',
    },
    ascii: {
      left: '6vw',
      top: '10vh',
    },
  },
];

export const SM_LAYOUTS = [
  {
    text: {
      top: '10vh',
      left: '3vw',
      width: '60%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '12vw',
      bottom: '25vh',
    },
    ascii: {
      left: '10vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      top: '10vh',
      right: '3vw',
      width: '50%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      left: '16vw',
      bottom: '25vh',
    },
    ascii: {
      left: '10vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      bottom: '20vh',
      right: '3vw',
      width: '50%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      left: '13vw',
      top: '15vh',
    },
    ascii: {
      left: '20vw',
      bottom: '1vh',
    },
  },
  {
    text: {
      bottom: '20vh',
      right: '3vw',
      width: '70%',
      height: '45vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      left: '6vw',
      top: '12vh',
    },
    ascii: {
      left: '10vw',
      bottom: '1vh',
    },
  },
];

const MD_LAYOUTS = SM_LAYOUTS;

export const LG_LAYOUTS = [
  {
    text: {
      top: '10vh',
      left: '3vw',
      width: '70%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '8vw',
      bottom: '25vh',
    },
    ascii: {
      right: '15vw',
      bottom: '-10vh',
    },
  },
  {
    text: {
      top: '10vh',
      right: '3vw',
      width: '65%',
      height: '60vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      left: '12vw',
      bottom: '25vh',
    },
    ascii: {
      left: '3vw',
      bottom: '-14vh',
    },
  },
  {
    text: {
      bottom: '20vh',
      right: '3vw',
      width: '70%',
      height: '55vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      left: '4vw',
      top: '13vh',
    },
    ascii: {
      left: '12vw',
      top: '-2vh',
    },
  },
  {
    text: {
      top: '7vh',
      left: '5vw',
      width: '90%',
      height: '30vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      right: '15vw',
      bottom: '20vh',
    },
    ascii: {
      left: '5vw',
      bottom: '-15vh',
    },
  },
];

export const XL_LAYOUTS = [
  {
    text: {
      top: '8vh',
      left: '3vw',
      width: '68%',
      height: '70vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      right: '8vw',
      bottom: '25vh',
    },
    ascii: {
      right: '-13vw',
      top: '-10vh',
    },
  },
  {
    text: {
      top: '8vh',
      right: '3vw',
      width: '70%',
      maxHeight: '65vh',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    album: {
      left: '9vw',
      top: '20vh',
    },
    ascii: {
      left: '-13vw',
      bottom: '-10vh',
    },
  },
  {
    text: {
      bottom: '20vh',
      right: '3vw',
      width: '70%',
      height: '55vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      left: '4vw',
      top: '13vh',
    },
    ascii: {
      left: '12vw',
      top: '-2vh',
    },
  },
  {
    text: {
      top: '7vh',
      left: '5vw',
      width: '90%',
      height: '30vh',
      textAlign: 'left',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    album: {
      right: '15vw',
      bottom: '20vh',
    },
    ascii: {
      left: '5vw',
      bottom: '-15vh',
    },
  },
];
export const LAYOUTS = {
  xs: XS_LAYOUTS,
  sm: SM_LAYOUTS,
  md: MD_LAYOUTS,
  lg: LG_LAYOUTS,
  xl: XL_LAYOUTS,
};

export const ASCII_ART = [boombox, radio, recordplayer, musicplayer];

export const BACKEND_ROOT =
  'https://someones-favorite-song-8d3e09586c1c.herokuapp.com';

// export const BACKEND_ROOT = 'http://localhost:3001';
