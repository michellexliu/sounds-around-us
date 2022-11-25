import React, { useState, useEffect } from "react";

import styles from "./WebPlayback.module.css";

function WebPlayback({ track, player, play, currentTrack, setCurrentTrack }) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);

  useEffect(() => {
    player.addListener("autoplay_failed", () => {
      console.log("Autoplay is not allowed by the browser autoplay rules");
    });
    player.addListener("player_state_changed", (state) => {
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
  }, []);

  useEffect(() => {
    console.log(currentTrack);
    setCurrentTrack(track);
    play({
      playerInstance: player,
      spotify_uri: track.uri,
    });
  }, [track]);

  return (
    <div className={styles.container}>
      <div className="main-wrapper">
        {/* <img
          src={currentTrack?.album?.images[0].url}
          className={styles.cover}
          alt={`${currentTrack?.name} album cover`}
        /> */}
        <div className={styles.wrap}>
          <div className={styles.album}>
            <div className={styles.vinyl}>
              <div
                className={styles.print}
                style={{
                  backgroundImage: `url(${currentTrack?.album?.images[0].url})`,
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* <button
          className="btn-spotify"
          onClick={() => {
            player.togglePlay();
            setPaused(!is_paused);
          }}
        >
          {is_paused ? "PLAY" : "PAUSE"}
        </button> */}
      </div>
    </div>
  );
}

export default WebPlayback;
