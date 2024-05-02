import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import styles from './Compose.module.css';
import back from '../../assets/back.svg';
import { BACKEND_ROOT } from '../../lib/constants';

function Compose({ setPost, setStep, song }) {
  const [body, setBody] = useState('');
  const navigate = useNavigate();

  const onClick = async () => {
    const response = await axios.post(`${BACKEND_ROOT}/submit`, {
      song: song.id,
      message: body,
    });
    setPost(response.data.result);
    navigate('/view');
  };

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
      <div
        className="form-group compose-form"
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
          style={{ alignSelf: 'flex-end', marginRight: '0px' }}
          onClick={onClick}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Compose;
