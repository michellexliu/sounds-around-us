import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
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
      {token && token !== "" ? <Search /> : <Login />}
    </AuthContext.Provider>
  );
}

export default App;
