import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import View from './pages/View/View';
import AuthContext from './lib/AuthContext';
import { refreshToken } from './lib/helpers';
import queryString from 'query-string';

import './App.css';
import Navigation from './components/Navigation';

function App() {
  const [token, setToken] = useState(undefined);
  const [player, setPlayer] = useState(undefined);
  const [deviceID, setDeviceID] = useState(undefined);

  const [playbackReady, setPlaybackReady] = useState(false);
  const location = useLocation();

  const { access_token } = queryString.parse(location.hash);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      if (access_token) setToken(access_token);
      else {
        console.log('blah');
        navigate('/');
        return;
      }
    }
    console.log('access_token', access_token);
  }, [access_token, token]);

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

  return (
    <div className="container">
      <AuthContext.Provider
        value={{ token, setToken, player, setPlayer, deviceID, setDeviceID }}
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
