import { motion, AnimatePresence } from 'framer-motion';

import styles from './View.module.css';
import { useContext, useState } from 'react';
import AuthContext from '../../lib/AuthContext';

const Directions = () => {
  const { shown, setShown } = useContext(AuthContext);

  return (
    <AnimatePresence mode="wait">
      {shown && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onClick={() => setShown(false)}
        >
          <div style={{ width: '40%' }}>
            <p className={styles.instructions}>
              Welcome to <i>It's Someone's Favorite Song</i>
            </p>
            <p className={styles.instructionsSubtitle}>
              To switch between submissions, click or tap the submission text.
              To play or pause audio, click or tap the album cover.
            </p>
            <p
              className={styles.instructionsSubtitle}
              style={{ textDecoration: 'underline', marginTop: '20px' }}
            >
              Enter site
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Directions;