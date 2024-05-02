import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import styles from './Post.module.css';
import AuthContext from '../../lib/AuthContext';
import Search from '../../components/Search/Search';
import Compose from '../../components/Compose/Compose';

function Post() {
  const { token, setToken } = useContext(AuthContext);

  const [step, setStep] = useState('search');
  const [post, setPost] = useState(undefined);
  const [song, setSong] = useState(undefined);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
          className={styles.container}
          key={step}
        >
          {step === 'search' ? (
            <Search setSong={setSong} setStep={setStep} />
          ) : (
            <Compose setPost={setPost} setStep={setStep} song={song} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Post;
