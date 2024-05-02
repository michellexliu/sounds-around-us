import React, { useState, useEffect, useContext } from 'react';
import spotify from '../../assets/spotify-logo.png';

import styles from './WebPlayback.module.css';
import { LAYOUTS } from '../../lib/constants';
import { useTheme } from '../../lib/ThemeContext';
import AuthContext from '../../lib/AuthContext';

function WebPlayback({
  track,
  player,
  currentTrack,
  setCurrentTrack,
  setAutoplayFailed,
  is_paused,
  setPaused,
}) {
  const [is_active, setActive] = useState(false);
  const { positions } = useTheme();
  const { shown, play } = useContext(AuthContext);

  useEffect(() => {
    player.addListener('autoplay_failed', () => {
      console.log('Autoplay is not allowed by the browser autoplay rules');
      setAutoplayFailed(true);
    });
    player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }

      setCurrentTrack(state.track_window.current_track);
      setPaused(state.paused);
      player.activateElement();
      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
    play({
      playerInstance: player,
      spotify_uri: currentTrack?.uri,
    });
  }, [player]);

  useEffect(() => {
    console.log(currentTrack);
    setCurrentTrack(track);
    play({
      playerInstance: player,
      spotify_uri: track.uri,
    });
  }, [track, shown]);

  return (
    <div
      className={styles.album}
      onClick={() => {
        player.togglePlay();
        setPaused(!is_paused);
        setAutoplayFailed(false);
      }}
      style={positions.album}
    >
      <img
        className={styles.albumCover}
        src={currentTrack?.album?.images[0].url}
        alt={`album cover for ${currentTrack?.album?.name}`}
      />
      <img src={spotify} alt={`spotify logo`} className={styles.logo} />
    </div>
  );
}

export default WebPlayback;
