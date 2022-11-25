import React from "react";
import { TypeAnimation } from "react-type-animation";

import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <h1>The Sounds Around Us</h1>
      <p className={styles.subtext}>
        What does&nbsp;
        <TypeAnimation
          // Same String at the start will only be typed once, initially
          sequence={[
            "love",
            2000,
            "heartbreak",
            2000,
            "hope",
            2000,
            "grief",
            2000,
            "joy",
            2000,
            "optimism",
            2000,
            "nostalgia",
            2000,
          ]}
          speed={40} // Custom Speed from 1-99 - Default Speed: 40
          style={{ fontSize: "2em" }}
          wrapper="span" // Animation will be rendered as a <span>
          repeat={Infinity} // Repeat this Animation Sequence infinitely
        />
        sound like?
      </p>
      <a className="btn" href="/auth/login">
        Login with Spotify
      </a>
    </div>
  );
}

export default Login;
