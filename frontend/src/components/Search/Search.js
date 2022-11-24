import React, { useState, useContext, useEffect } from "react";

import styles from "./Search.module.css";
import { fromMS, queryString } from "../../lib/helpers";
import AuthContext from "../../lib/AuthContext";
import { refreshToken } from "../../lib/helpers";
function Search({ setSong, setStep }) {
  const { token, setToken } = useContext(AuthContext);
  console.log("token", token);

  const [q, setQ] = useState("");
  const [res, setRes] = useState([]);
  const base = "https://api.spotify.com/v1/search";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  useEffect(() => {
    if (!token) {
      refreshToken(setToken)();
    }
  }, []);

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
    <div>
      <label htmlFor="track">Search</label>
      <input id="track" type="text" onChange={handleChange} value={q} />

      <button onClick={handleSubmit} disabled={q === ""}>
        Submit
      </button>
      <div className={styles.tracks}>
        {res?.map(({ album, artists, duration_ms, name, id }, index) => {
          const key = `${q} option ${index}`;
          const image = album.images[album.images.length - 1].url;
          const artistStr = artists.map(({ name }) => name).join(", ");
          const albumName = album.name;

          return (
            <Track
              image={image}
              artists={artistStr}
              album={albumName}
              duration_ms={duration_ms}
              key={key}
              name={name}
              onClick={() => {
                console.log("id", id);
                setSong(id);
                setStep("compose");
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

function Track({ image, artists, name, album, duration_ms, onClick }) {
  return (
    <div className={styles.track} onClick={onClick}>
      <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      <div className={styles.trackInfo}>
        <p>{name}</p>
        <p>{artists}</p>
      </div>
      <p>{album}</p>
      <p>{fromMS(duration_ms)}</p>
    </div>
  );
}

export default Search;
