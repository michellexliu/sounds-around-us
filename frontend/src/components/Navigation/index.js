import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

import styles from './index.module.css';
import { fromMS } from '../../lib/helpers';
import AuthContext from '../../lib/AuthContext';
import back from '../../assets/back.svg';

const About = () => {};

function Navigation({ setPost, setStep, song }) {
  const { token, setToken } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className={styles.modalContainer}>
          <p className={styles.aboutTitle}>
            About <i>It's Someone's Favorite Song</i>
          </p>
          <p className={styles.aboutDescription}>
            <i>It's Someone's Favorite Song</i> explores the emotional, social,
            and cultural ties we have to music. Music is deeply woven into our
            lives, holding a mirror to our joys, our sorrows, our best memories,
            our worst ones. It can remind us of the people we love, the places
            that are special to us, and the pivotal times of our life. Each
            person has a unique experience with their favorite song, and the
            same song can mean so many different things to so many different
            people.
          </p>
          <p className={styles.aboutDescription}>
            This project aims to showcase how songs mark our personal histories
            and how we can foster more meaningful connection through music. It
            invites you to reflect on the place music holds in your life; to
            read about how your favorite song has also touched a stranger's life
            as much as it has yours; or to simply find some great beats.
          </p>
          <p className={styles.aboutDescription}>
            This project was in part inspired by Anya Chai's 2020{' '}
            <a
              href="https://open.spotify.com/playlist/1YE3RR4PW8QsWUbHopSAtN?si=d865a6eadc414ff3"
              target="_blank"
              rel="noreferrer"
            >
              project
            </a>{' '}
            of the same name, as well as{' '}
            <a href="https://chia.design/" target="_blank" rel="noreferrer">
              Chia Amisola's
            </a>{' '}
            project,{' '}
            <a href="https://thesoundof.love/" target="_blank" rel="noreferrer">
              The Sound of Love
            </a>
            .
          </p>
          <p className={styles.aboutDescription}>
            Created with {'<3'} by{' '}
            <a href="https://michellexliu.me/" target="_blank" rel="noreferrer">
              Michelle Liu
            </a>
          </p>
        </div>
      </Modal>
      <Modal
        isOpen={privacyModalOpen}
        onRequestClose={() => setPrivacyModalOpen(false)}
      >
        <div className={styles.modalContainer}>
          <p className={styles.aboutTitle}>Privacy Policy</p>
          <p className={styles.aboutDescription}>
            <i>It's Someone's Favorite Song</i> is powered by the Spotify API
            and Spotify Web Playback SDK. Permissions are needed to power the
            song search functionality and to play music through the Spotify web
            player. All submissions are anonymized and have no way of being
            traced to the user. By choosing to submit an entry, you consent to
            the public display of your entry.
          </p>
          <p className={styles.aboutDescription}>
            None of the data used by <i>It's Someone's Favorite Song</i> is
            shared with any third parties. All information is used solely for
            gaining access to Spotify features like search and playback.
            Although you can rest assured that your data is not being stored or
            used maliciously, if you would like to revoke the app's permissions,
            you can visit{' '}
            <a href="http://www.spotify.com/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427">
              your Spotify apps page
            </a>{' '}
            and click "REMOVE ACCESS" on <i>It's Someone's Favorite Song</i>.{' '}
            <a href="https://support.spotify.com/us/article/spotify-on-other-apps/">
              Here
            </a>{' '}
            is a more detailed guide for doing so.
          </p>
        </div>
      </Modal>
      <div className={styles.top}></div>
      <div className={styles.bottom}>
        <div>
          <p>Submit a Song</p>
        </div>
        <div>
          <p style={{ paddingRight: 20 }} onClick={() => setModalOpen(true)}>
            About
          </p>
          <p onClick={() => setPrivacyModalOpen(true)}>Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
