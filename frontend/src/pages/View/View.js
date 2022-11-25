import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactAudioPlayer from "react-audio-player";

import styles from "./View.module.css";
import AuthContext from "../../lib/AuthContext";
import { refreshToken } from "../../lib/helpers";
import WebPlayback from "../../components/WebPlayback";

function View() {
  const { token, setToken } = useContext(AuthContext);

  const [post, setPost] = useState(undefined);
  const [trackInfo, setTrackInfo] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [deviceID, setDeviceID] = useState(undefined);
  const [playbackReady, setPlaybackReady] = useState(false);

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
      const { track } = post[0];
      console.log(track);
      if (track)
        getSong(track).then((res) => {
          setTrackInfo(res);
          console.log(res);
        });
    }
  }, [post]);

  return (
    <div onClick={getNewPost}>
      <Link to="/post">Submit your own post</Link>
      {/* {trackInfo ? (
        <div>
          <p>{trackInfo.name}</p>
          <ReactAudioPlayer src={trackInfo.preview_url} autoPlay controls />
        </div>
      ) : (
        <></>
      )} */}
      {trackInfo && player && deviceID ? (
        <WebPlayback track={trackInfo} player={player} play={play} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default View;
