import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import styles from './Login.module.css';

/**
 * "It's someone's favorite song" is an exploration of the emotional connections we have to music.
 */
function Login() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className={styles.container}
        key="home"
      >
        <p className={styles.subtext}>
          What does&nbsp;
          <TypeAnimation
            // Same String at the start will only be typed once, initially
            sequence={[
              'love',
              2000,
              'joy',
              2000,
              'heartbreak',
              2000,
              'hope',
              2000,
              'grief',
              2000,
              'optimism',
              2000,
              'nostalgia',
              2000,
            ]}
            speed={40} // Custom Speed from 1-99 - Default Speed: 40
            style={{ fontSize: '2em' }}
            wrapper="span" // Animation will be rendered as a <span>
            repeat={Infinity} // Repeat this Animation Sequence infinitely
          />
          sound like?
        </p>
        <div
          className="btn"
          onClick={() => {
            window.location.href = 'http://localhost:3001/auth/login';
            // const res = await axios.get('https://localhost:3001/auth/login');
            // const data = await res.json();
            // console.log(data);
          }}
        >
          Login with Spotify
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Login;
