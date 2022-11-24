import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./View.module.css";
import AuthContext from "../../lib/AuthContext";
import { refreshToken } from "../../lib/helpers";

function View() {
  const { token, setToken } = useContext(AuthContext);

  const [post, setPost] = useState(undefined);
  const [trackInfo, setTrackInfo] = useState(undefined);

  const base = "https://api.spotify.com/v1/tracks";
  const headers = new Headers({
    Authorization: "Bearer " + token,
  });

  async function getSong(id) {
    const response = await fetch(`${base}/${id}`, {
      headers,
    });
    const json = await response.json();
    return json;
  }

  useEffect(() => {
    if (!token) {
      refreshToken(setToken)();
    }
    async function getPost() {
      const response = await fetch("/post");
      const json = await response.json();
      console.log(json);
      setPost(json?.result);
    }

    getPost();
  }, []);

  useEffect(() => {
    if (post && post.length > 0) {
      const { track } = post[0];
      console.log(track);
      if (track)
        getSong(track).then((res) => {
          setTrackInfo(res);
          console.log(res);
        });
    }
  }, [post]);

  return (
    <div>
      <Link to="/post">Submit your own post</Link>
      {trackInfo !== undefined ?? (
        <div>
          <p>hi</p>
          <p>{trackInfo.name}</p>
        </div>
      )}
    </div>
  );
}

export default View;
