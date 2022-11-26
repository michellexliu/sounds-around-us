import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";
import cn from "classnames";

import styles from "./View.module.css";
import AuthContext from "../../lib/AuthContext";
import { refreshToken } from "../../lib/helpers";
import WebPlayback from "../../components/WebPlayback/WebPlayback";

function View({ playbackReady, setPlaybackReady }) {
  const { token, setToken } = useContext(AuthContext);

  const [post, setPost] = useState(undefined);
  const [body, setBody] = useState(undefined);
  const [trackInfo, setTrackInfo] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [deviceID, setDeviceID] = useState(undefined);
  const [currentTrack, setCurrentTrack] = useState(trackInfo);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [is_paused, setPaused] = useState(false);

  const getToken = () => refreshToken(setToken);

  const base = "https://api.spotify.com/v1/tracks";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  async function getSong(id) {
    const response = await fetch(`${base}/${id}`, {
      headers,
    });
    const json = await response.json();
    return json;
  }

  const getNewPost = () => {
    if (!token) {
      getToken();
    }
    async function getPost() {
      const response = await fetch("/post");
      const json = await response.json();
      console.log(json);
      setPost(json?.result);
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
        method: "PUT",
        body: JSON.stringify({ uris: [spotify_uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });
    });
  };

  useEffect(() => {
    if (!token) {
      getToken();
      window.onSpotifyWebPlaybackSDKReady = () => {
        setPlaybackReady(true);
      };
    } else {
      if (playbackReady) {
        const player = new window.Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
          setDeviceID(device_id);
        });

        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.connect();
      }
    }
  }, [token]);

  useEffect(() => {
    if (post && post.length > 0) {
      const { track, body } = post[0];
      setBody(body);
      console.log(track);
      if (track)
        getSong(track).then((res) => {
          setTrackInfo(res);
          setCurrentTrack(res);
          console.log(res);
        });
    }
  }, [post]);

  return (
    <div className={styles.container}>
      {/* {trackInfo ? (
        <div>
          <p>{trackInfo.name}</p>
          <ReactAudioPlayer src={trackInfo.preview_url} autoPlay controls />
        </div>
      ) : (
        <></>
      )} */}
      {currentTrack && currentTrack.artists ? (
        <div className={styles.text}>
          <h1>
            {currentTrack?.name} - {currentTrack?.artists[0].name}
          </h1>
          <p>
            Put your volume on. Click the story text area to load a new song and
            story. Click the vinyl to pause and unpause the song.
          </p>
          {autoplayFailed === true && <p>Click the vinyl to begin.</p>}
        </div>
      ) : (
        <div className={styles.text}>
          <p>Your Spotify access token has expired. Please log in again.</p>
          <Link to="/" className={cn("btn", styles.back)}>
            Back to Home
          </Link>
        </div>
      )}
      {trackInfo && player && deviceID ? (
        <div className={styles.player}>
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
        </div>
      ) : (
        <></>
      )}
      <Link
        to="/post"
        className={cn("btn", styles.submit)}
        onClick={() => {
          if (!is_paused && player) {
            player.togglePlay();
            setPaused(!is_paused);
          }
        }}
      >
        Submit your own song
      </Link>
    </div>
  );
}

export default View;
