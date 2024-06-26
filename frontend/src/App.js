import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import View from './pages/View/View';
import AuthContext from './lib/AuthContext';
import { getSize, refreshToken } from './lib/helpers';
import queryString from 'query-string';

import './App.css';
import Navigation from './components/Navigation';
import ThemeContext from './lib/ThemeContext';
import { ASCII_ART, COLOR_THEMES, LAYOUTS } from './lib/constants';

function App() {
  const [token, setToken] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [deviceID, setDeviceID] = useState(undefined);
  const [theme, setTheme] = useState(undefined);
  const [positions, setPositions] = useState(LAYOUTS.md[0]);
  const [shown, setShown] = useState(true);
  const [body, setBody] = useState(undefined);
  const [post, setPost] = useState(undefined);
  const [asciiIndex, setAsciiIndex] = useState(0);

  const colorScheme =
    theme == null
      ? { text: 'black', background: 'white' }
      : COLOR_THEMES[theme];

  const randomTheme = () => {
    const randomIndex = Math.floor(Math.random() * COLOR_THEMES.length);
    setTheme(randomIndex);
    const size = getSize(body ?? '');
    const LAYOUT_CONFIG = LAYOUTS[size];
    const randomLayout = Math.floor(Math.random() * LAYOUT_CONFIG?.length);
    console.log(size, randomLayout);
    const newPositions = LAYOUT_CONFIG[randomLayout];
    setPositions(newPositions);
    const ascii = Math.floor(Math.random() * ASCII_ART.length);
    setAsciiIndex(ascii);
  };

  const [playbackReady, setPlaybackReady] = useState(false);
  const location = useLocation();

  const { access_token } = queryString.parse(location.hash);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if (access_token) setToken(access_token);
      else {
        navigate('/');
        return;
      }
    }
  }, [access_token, token, navigate]);

  useEffect(() => {
    if (location.pathname === '/') {
      setToken(null);
    }
    if (location.pathname !== '/view') {
      setTheme(null);
    }
  }, [location]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (!token) return;
      const player = new window.Spotify.Player({
        name: 'Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceID(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  }, [token]);

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

  return (
    <div
      className="container"
      style={{
        backgroundColor: colorScheme.background,
        color: colorScheme.text,
        transition: 'background-color 2s',
      }}
    >
      <AuthContext.Provider
        value={{
          shown,
          setShown,
          token,
          setToken,
          player,
          setPlayer,
          deviceID,
          setDeviceID,
          play,
          body,
          setBody,
          post,
          setPost,
        }}
      >
        <ThemeContext.Provider
          value={{
            theme,
            setTheme,
            colorScheme,
            randomTheme,
            positions,
            asciiIndex,
          }}
        >
          <Navigation />
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/post" element={<Post />} />
            <Route
              exact
              path="/view"
              element={
                <View
                  playbackReady={playbackReady}
                  setPlaybackReady={setPlaybackReady}
                />
              }
            />
          </Routes>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
