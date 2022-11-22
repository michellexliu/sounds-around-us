import React, { useState, useEffect } from "react";
import Login from "./pages/Login/Login";
import Search from "./pages/Search/Search";
import "./App.css";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetch("/auth/token");
      const json = await response.json();
      setToken(json.access_token);
    }

    getToken();
    console.log(token);
  }, []);

  return <>{token === "" ? <Login /> : <Search token={token} />}</>;
}

export default App;
