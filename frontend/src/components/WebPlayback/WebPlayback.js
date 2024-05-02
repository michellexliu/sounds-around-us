import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import styles from './WebPlayback.module.css';
import { LAYOUTS } from '../../lib/constants';
import { useTheme } from '../../lib/ThemeContext';

function WebPlayback({
  track,
  player,
  play,
  currentTrack,
  setCurrentTrack,
  setAutoplayFailed,
  is_paused,
  setPaused,
}) {
  const [is_active, setActive] = useState(false);
  const { positions } = useTheme();

  useEffect(() => {
    player.addListener('autoplay_failed', () => {
      console.log('Autoplay is not allowed by the browser autoplay rules');
      setAutoplayFailed(true);
    });
    player.addListener('player_state_changed', (state) => {
      if (!state) {
        return;
      }
      console.log('state changed', state);

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
  }, [track]);

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
        src={currentTrack?.album?.images[0].url}
        alt={`album cover for ${currentTrack?.album?.name}`}
      />
    </div>
  );
}

export default WebPlayback;
