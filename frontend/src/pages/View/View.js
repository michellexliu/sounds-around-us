import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./View.module.css";
import AuthContext from "../../lib/AuthContext";

function View() {
  const { token } = useContext(AuthContext);

  const [posts, setPosts] = useState(undefined);
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
    async function getPosts() {
      const response = await fetch("/posts");
      const json = await response.json();
      console.log(json);
      setPosts(json?.posts);
    }

    getPosts();
  }, []);

  return (
    <div>
      <Link to="/post">Submit your own post</Link>
      {posts?.map((post) => {
        if (post.track) getSong(post.track).then((res) => console.log(res));
        return (
          <div>
            <p>{post.body}</p>
            <p>{post.track}</p>
          </div>
        );
      })}
    </div>
  );
}

export default View;
