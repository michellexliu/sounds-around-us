import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

import styles from './View.module.css';
import AuthContext from '../../lib/AuthContext';
import { refreshToken } from '../../lib/helpers';
import { BACKEND_ROOT, items } from '../../lib/constants';
import WebPlayback from '../../components/WebPlayback/WebPlayback';
import { useTheme } from '../../lib/ThemeContext';

function View({ playbackReady, setPlaybackReady }) {
  const { token, player, deviceID } = useContext(AuthContext);

  const [post, setPost] = useState(undefined);
  const [body, setBody] = useState(undefined);
  const [trackInfo, setTrackInfo] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(trackInfo);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [is_paused, setPaused] = useState(false);
  const [clickCount, setClickCount] = useState(true);

  const { randomTheme, colorScheme } = useTheme();

  // const getToken = () => refreshToken(setToken);

  const base = 'https://api.spotify.com/v1/tracks';
  const headers = new Headers({
    Authorization: 'Bearer ' + token,
  });

  async function getSong(id) {
    const response = await fetch(`${base}/${id}`, {
      headers,
    });
    const json = await response.json();
    return json;
  }

  const getNewPost = () => {
    setClickCount(clickCount + 1);
    // if (!token) {
    //   getToken();
    // }
    async function getPost() {
      const response = await axios.get(`${BACKEND_ROOT}/post`);
      setPost(response?.data?.result);
    }

    getPost();
  };

  useEffect(() => {
    getNewPost();
  }, []);

  useEffect(() => {
    randomTheme();
  }, [post]);

  const play = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }) => {
    getOAuthToken((access_token) => {
      fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  useEffect(() => {
    if (post && post.length > 0) {
      const { track, body } = post[0];
      setBody(body);
      console.log(track);
      if (track) {
        getSong(track).then((res) => {
          setTrackInfo(res);
          setCurrentTrack(res);
          console.log(res);
        });
      }
    }
  }, [post]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        variants={items}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className={styles.container}
        key={clickCount}
        style={{}}
      >
        {currentTrack && currentTrack.artists ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className={styles.text}
          >
            <h1>
              {currentTrack?.name} - {currentTrack?.artists[0].name}
            </h1>
            <p>
              Turn your volume on. Click the story text area to load a new song
              and story. Click the vinyl to pause and unpause the song.
            </p>
            {autoplayFailed === true && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                Click the vinyl to begin.
              </motion.p>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
            className={styles.text}
          >
            <p>Your Spotify access token has expired. Please log in again.</p>
            <Link to="/" className={cn('btn', styles.back)}>
              Back to Home
            </Link>
          </motion.div>
        )}
        {trackInfo && player && deviceID && (
          <motion.div
            variants={items}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={styles.player}
          >
            <WebPlayback
              track={trackInfo}
              player={player}
              play={play}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrentTrack}
              setAutoplayFailed={setAutoplayFailed}
              is_paused={is_paused}
              setPaused={setPaused}
            />
            <p className={styles.body} onClick={getNewPost}>
              {body}
            </p>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default View;
