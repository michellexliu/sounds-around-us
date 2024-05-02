import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

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
        {step === 'search' ? (
          <Search setSong={setSong} setStep={setStep} />
        ) : (
          <Compose setPost={setPost} setStep={setStep} song={song} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Post;
