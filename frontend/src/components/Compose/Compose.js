import React, { useState, useContext } from "react";

import styles from "./Compose.module.css";
import { fromMS } from "../../lib/helpers";
import AuthContext from "../../lib/AuthContext";

function Compose({ setPost, setStep, song }) {
  const { token, setToken } = useContext(AuthContext);
  const [body, setBody] = useState("");

  return (
    <div className={styles.container}>
      <h1>
        Song: {song.name} - {song.artists}
      </h1>
      <button
        onClick={() => {
          setStep("search");
        }}
        className="btn"
      >
        Select a different song
      </button>
      <form
        className="form-group compose-form"
        action="/submit"
        method="post"
        autoComplete="off"
      >
        <input name="song" value={song.id} hidden readOnly></input>
        <label className={styles.prompt} htmlFor="message">
          Tell us about this song. What does it mean to you? Who does it remind
          you of? How does it make you feel? Where does it take you? When did it
          come into your life?
        </label>
        <br />
        <textarea
          onChange={(e) => {
            setBody(e.target.value);
          }}
          name="message"
          required
        ></textarea>
        <button
          disabled={!body || body === ""}
          className="compose-btn btn btn-primary"
          type="submit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Compose;
