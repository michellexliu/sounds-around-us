import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Marquee from 'react-fast-marquee';

import styles from './View.module.css';
import WebPlayback from '../../components/WebPlayback/WebPlayback';
import AuthContext from '../../lib/AuthContext';
import { ASCII_ART, BACKEND_ROOT, items } from '../../lib/constants';
import { useTheme } from '../../lib/ThemeContext';
import Directions from './Directions';

function View() {
  const { token, player, deviceID, shown, setShown } = useContext(AuthContext);

  const [post, setPost] = useState(undefined);
  const [body, setBody] = useState(undefined);
  const [trackInfo, setTrackInfo] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(trackInfo);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [is_paused, setPaused] = useState(false);
  const [clickCount, setClickCount] = useState(true);

  const { randomTheme, positions } = useTheme();

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
    // if (!token) {
    //   getToken();
    // }
    setClickCount(clickCount + 1);
    async function getPost() {
      const response = await axios.get(`${BACKEND_ROOT}/post`);
      console.log(response?.data?.result);
      setPost(response?.data?.result);
    }

    getPost();
  };

  useEffect(() => {
    getNewPost();
  }, []);

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
          console.log(res.external_urls.spotify);
        });
      }
    }
  }, [post]);

  useEffect(() => {
    randomTheme();
  }, [shown]);

  return (
    <AnimatePresence mode="wait" onExitComplete={randomTheme}>
      {/* <img src={ASCII_ART[0]} alt="music player" className={styles.ascii} /> */}
      <Directions />
      {!shown && (
        <motion.div
          variants={items}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.container}
          key={clickCount}
        >
          {currentTrack && currentTrack.artists ? (
            <motion.a
              href={trackInfo?.external_urls?.spotify}
              target="_blank"
              rel="noreferrer"
              initial="hidden"
              animate="visible"
              transition={{ duration: 2.5 }}
              className={styles.nameBanner}
            >
              <Marquee speed={150}>
                <h1 className={styles.trackName}>
                  {currentTrack?.name} - {currentTrack?.artists[0].name}
                  &nbsp;&nbsp;
                </h1>
              </Marquee>
            </motion.a>
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
              <p
                className={styles.body}
                onClick={getNewPost}
                style={{
                  fontSize: body.length > 600 ? '32px' : '48px',
                  ...positions.text,
                }}
              >
                {body}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default View;
