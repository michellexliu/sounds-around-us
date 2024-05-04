import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Marquee from 'react-fast-marquee';

import styles from './View.module.css';
import WebPlayback from '../../components/WebPlayback/WebPlayback';
import AuthContext from '../../lib/AuthContext';
import { ASCII_ART, BACKEND_ROOT, SIZES, items } from '../../lib/constants';
import { useTheme } from '../../lib/ThemeContext';
import Directions from './Directions';
import { getSize } from '../../lib/helpers';

function View() {
  const { token, player, deviceID, shown, body, setBody, post, setPost } =
    useContext(AuthContext);

  const [trackInfo, setTrackInfo] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(trackInfo);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [is_paused, setPaused] = useState(false);
  const [clickCount, setClickCount] = useState(true);

  const { randomTheme, positions, colorScheme } = useTheme();
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
    async function getPost() {
      const response = await axios.get(`${BACKEND_ROOT}/post`);
      console.log(response?.data?.result);
      setPost(response?.data?.result);
    }

    getPost();
  };

  const size = getSize(body);

  useEffect(() => {
    if (post == null) getNewPost();
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
      console.log(post);
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
              <Marquee key={currentTrack?.name} speed={150}>
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
              style={{
                backgroundColor: colorScheme.background,
                transition: 'background-color 2s',
              }}
            >
              <WebPlayback
                track={trackInfo}
                player={player}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                setAutoplayFailed={setAutoplayFailed}
                is_paused={is_paused}
                setPaused={setPaused}
                size={size}
              />
              <div className={styles.body} style={positions.text}>
                <p
                  onClick={getNewPost}
                  style={{ fontSize: SIZES[size ?? 'sm']?.text }}
                >
                  {body}
                </p>
              </div>
              <img
                src={ASCII_ART[1]}
                alt="music player"
                className={styles.ascii}
                style={positions.ascii}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default View;
