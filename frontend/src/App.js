import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
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

  return <>{token === "" ? <Login /> : <p>{token}</p>}</>;
}

export default App;
