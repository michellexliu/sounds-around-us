import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Post from "./pages/Post/Post";
import AuthContext from "./lib/AuthContext";
import "./App.css";

function App() {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
    console.log(token);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/post" element={<Post />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
