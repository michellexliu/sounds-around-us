import React, { useState, useEffect } from "react";

function Login({ token }) {
  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const base = "https://api.spotify.com/v1/search";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  const queryString = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

  async function search(q) {
    const response = await fetch(
      `${base}?${queryString({
        q,
        type: "track",
      })}`,
      {
        headers,
      }
    );
    const json = await response.json();
    setRes(json?.tracks?.items);
    console.log(res);
  }

  const handleSubmit = () => {
    search(q);
  };

  const handleChange = (e) => {
    setQ(e.target.value);
  };

  return (
    <div className="search-container">
      <label htmlFor="track">Search</label>
      <input id="track" type="text" onChange={handleChange} value={q} />

      <button onClick={handleSubmit} disabled={q === ""}>
        Submit
      </button>
      {res.map(({ album, artists }, index) => {
        const key = `${q} option ${index}`;
        return (
          <img src={album.images[0].url} alt={key} key={key} width={300} />
        );
      })}
    </div>
  );
}

export default Login;
