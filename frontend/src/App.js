import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Redirect } from 'react-router-dom';

import Login from './pages/Login/Login';
import Post from './pages/Post/Post';
import View from './pages/View/View';
import AuthContext from './lib/AuthContext';
import { refreshToken } from './lib/helpers';
import queryString from 'query-string';

import './App.css';

function App() {
  const [token, setToken] = useState(undefined);
  const [playbackReady, setPlaybackReady] = useState(false);
  const location = useLocation();

  const { access_token } = queryString.parse(location.hash);

  useEffect(() => {
    if (!token) setToken(access_token);
    console.log('access_token', access_token);

    window.onSpotifyWebPlaybackSDKReady = () => {
      setPlaybackReady(true);
    };
  }, [access_token]);

  return (
    <div className="container">
      <AuthContext.Provider value={{ token, setToken }}>
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
