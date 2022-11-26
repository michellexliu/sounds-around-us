import React, { useState, useContext } from "react";

import styles from "./Compose.module.css";
import { fromMS } from "../../lib/helpers";
import AuthContext from "../../lib/AuthContext";

function Compose({ setPost, setStep, song }) {
  const { token, setToken } = useContext(AuthContext);
  const [body, setBody] = useState("");

  return (
    <div>
      <button
        onClick={() => {
          setStep("search");
        }}
      >
        Select a different song
      </button>
      <form
        className="form-group compose-form"
        action="/submit"
        method="post"
        autoComplete="off"
      >
        <h1>
          Song: {song.name} - {song.artists}
        </h1>
        <input name="song" value={song.id} hidden readOnly></input>
        <label htmlFor="message">What does {song.name} mean to you?</label>
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
