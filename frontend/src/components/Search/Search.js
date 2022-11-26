import React, { useState, useContext, useEffect } from "react";
import cn from "classnames";

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
    <>
      <label className={styles.searchPrompt} htmlFor="track">
        What's a song that means something to you?
      </label>
      <div className={styles.searchContainer}>
        <input
          id="track"
          className={styles.search}
          type="text"
          onChange={handleChange}
          value={q}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit();
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={q === ""}
          className={cn(styles.submit, "btn")}
        >
          Search
        </button>
      </div>
      <div className={styles.tracksContainer}>
        <table className={styles.tracks}>
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
                  setSong({ id, name, artists: artistStr });
                  setStep("compose");
                }}
              />
            );
          })}
        </table>
      </div>
    </>
  );
}

function Track({ image, artists, name, album, duration_ms, onClick }) {
  return (
    <tr className={styles.track} onClick={onClick}>
      <td>
        <img src={image} alt={`${name} by ${artists} album cover`} width={50} />
      </td>
      <td className={styles.trackInfo}>
        <p className={styles.trackTitle}>{name}</p>
        <p>{artists}</p>
      </td>
      <td>{album}</td>
      <td>{fromMS(duration_ms)}</td>
    </tr>
  );
}

export default Search;
