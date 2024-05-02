import React, { useState, useContext, useEffect } from 'react';
import cn from 'classnames';
import { TypeAnimation } from 'react-type-animation';
import debounce from 'lodash.debounce';
import { motion } from 'framer-motion';

import refresh from '../../assets/refresh.svg';
import styles from './Search.module.css';
import { fromMS, queryString } from '../../lib/helpers';
import AuthContext from '../../lib/AuthContext';
import { items } from '../../lib/constants';

export const PROMPTS = [
  {
    choice: "that's special to you",
    question: 'Why is this song special to you? What memories does it hold?',
  },
  {
    choice: 'that reminds you of someone',
    question:
      'Who does this song remind you of? Why is this person special to you? How does this song connect you?',
  },
  {
    choice: 'that reminds you of a place',
    question:
      'Where does this song remind you of? What makes this place special? How is this song special to this place?',
  },
  {
    choice: 'that reminds you of a moment',
    question: 'What memories do this song evoke?',
  },
  {
    choice: 'that brings you joy',
    question: 'Why is this song special to you? What memories does it hold?',
  },
  {
    choice: 'that reminds you everything will be okay',
    question:
      'How does this song make you feel? Did it get you through a hard time? How does it give you hope?',
  },
  {
    choice: 'that never gets old',
    question:
      'How did this song come into your life? What memories does it hold?',
  },
  {
    choice: 'that you relate to',
    question:
      'Why do you feel connected to this song? What does it mean to you?',
  },
];

function Search({ setSong, setStep }) {
  const { token, play, player } = useContext(AuthContext);
  console.log('token', token);

  const [q, setQ] = useState('');
  const [res, setRes] = useState([]);
  const [curPrompt, setCurPrompt] = useState(0);

  const base = 'https://api.spotify.com/v1/search';
  const headers = new Headers({
    Authorization: 'Bearer ' + token,
  });
  console.log(headers);

  async function search(q) {
    const response = await fetch(
      `${base}?${queryString({
        q,
        type: 'track',
      })}`,
      {
        headers,
      }
    );
    const json = await response.json();
    if (json?.tracks?.items && json?.tracks?.items.length > 0)
      setRes(json?.tracks?.items);
  }

  const throttled_search = debounce((q) => search(q), 1000);

  const handleSubmit = () => {
    search(q);
  };

  const handleChange = (e) => {
    throttled_search(e.target.value);
    setQ(e.target.value);
  };

  useEffect(() => {
    console.log(curPrompt);
  }, [curPrompt]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      variants={items}
      className={styles.container}
      key="search"
    >
      <div className={styles.innerContainer}>
        <p className={styles.searchPrompt}>
          A song{' '}
          <TypeAnimation
            // Same String at the start will only be typed once, initially
            sequence={[PROMPTS[curPrompt].choice, 200]}
            speed={40} // Custom Speed from 1-99 - Default Speed: 40
            key={curPrompt}
            wrapper="span"
            cursor={false}
          />
          <img
            alt="refresh prompt"
            src={refresh}
            width="30px"
            height="30px"
            className={styles.refresh}
            onClick={() => setCurPrompt((curPrompt + 1) % PROMPTS.length)}
          />
        </p>
        <div className={styles.searchContainer}>
          <input
            id="track"
            className={styles.search}
            type="text"
            onChange={handleChange}
            value={q}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
            autoComplete="off"
          />
        </div>
        <div className={styles.tracksContainer}>
          <table className={styles.tracks}>
            {res?.map(
              ({ album, artists, duration_ms, name, id, uri }, index) => {
                const key = id;
                const image = album.images[album.images.length - 1].url;
                const artistStr = artists.map(({ name }) => name).join(', ');
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
                      play({
                        playerInstance: player,
                        spotify_uri: uri,
                      });
                      setSong({
                        id,
                        name,
                        artists: artistStr,
                        question: PROMPTS[curPrompt].question,
                      });
                      setStep('compose');
                    }}
                  />
                );
              }
            )}
          </table>
        </div>
      </div>
    </motion.div>
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
