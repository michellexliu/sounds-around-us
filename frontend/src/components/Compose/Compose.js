import React, { useState, useContext } from 'react';

import styles from './Compose.module.css';
import { fromMS } from '../../lib/helpers';
import AuthContext from '../../lib/AuthContext';
import back from '../../assets/back.svg';

function Compose({ setPost, setStep, song }) {
  const { token, setToken } = useContext(AuthContext);
  const [body, setBody] = useState('');

  return (
    <div className={styles.container}>
      <h1
        onClick={() => {
          setStep('search');
        }}
      >
        <img
          alt="refresh prompt"
          src={back}
          width="24px"
          height="24px"
          className={styles.back}
        />
        {song.name} - {song.artists}
      </h1>
      <form
        className="form-group compose-form"
        action="/submit"
        method="post"
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        <input name="song" value={song.id} hidden readOnly></input>
        <label className={styles.prompt} htmlFor="message">
          Tell us about this song. {song.question}
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
          disabled={!body || body === ''}
          className="compose-btn btn btn-primary"
          type="submit"
          style={{ alignSelf: 'flex-end', marginRight: '0px' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Compose;
