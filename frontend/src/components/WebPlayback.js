import React, { useState, useEffect } from "react";

function WebPlayback({ track, player }) {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState(track);
  console.log("webplayback", track, player);

  useEffect(() => {
    player.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      setTrack(state.track_window.current_track);
      setPaused(state.paused);

      player.getCurrentState().then((state) => {
        !state ? setActive(false) : setActive(true);
      });
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="main-wrapper">
          <img
            src={current_track.album.images[0].url}
            className="now-playing__cover"
            alt=""
          />

          <div className="now-playing__side">
            <div className="now-playing__name">{current_track.name}</div>

            <div className="now-playing__artist">
              {current_track.artists[0].name}
            </div>
          </div>
          <button
            className="btn-spotify"
            onClick={() => {
              player.previousTrack();
            }}
          >
            &lt;&lt;
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.togglePlay();
              setPaused(!is_paused);
            }}
          >
            {is_paused ? "PLAY" : "PAUSE"}
          </button>

          <button
            className="btn-spotify"
            onClick={() => {
              player.nextTrack();
            }}
          >
            &gt;&gt;
          </button>
        </div>
      </div>
    </>
  );
}

export default WebPlayback;
