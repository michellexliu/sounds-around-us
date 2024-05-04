import { motion, AnimatePresence } from 'framer-motion';

import styles from './View.module.css';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../lib/AuthContext';
import { useTheme } from '../../lib/ThemeContext';

const Directions = () => {
  const { shown, setShown } = useContext(AuthContext);
  const { randomTheme } = useTheme();

  useEffect(() => {
    randomTheme();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {shown && (
        <motion.div
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            style={{ width: '60%' }}
          >
            <p className={styles.instructions}>
              <i>It's Someone's Favorite Song</i>
            </p>
            <p className={styles.instructionsSubtitle}>
              Content Warning: Some submisisons may contain references to
              sensitive topics, such as trauma, suicidal ideation, eating
              disorders, substance abuse, and sexual assault. If these topics
              are triggering for you, please proceed with caution.
            </p>
            <p
              className={styles.instructionsSubtitle}
              style={{ marginTop: '20px' }}
            >
              To switch between submissions, click or tap the submission text.
              To play or pause audio, click or tap the album cover.
            </p>
            <p
              className={styles.instructionsSubtitle}
              style={{ textDecoration: 'underline', marginTop: '20px' }}
            >
              Enter site
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Directions;
