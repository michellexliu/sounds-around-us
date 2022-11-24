import React, { useState, useContext } from "react";

import styles from "./Post.module.css";
import AuthContext from "../../lib/AuthContext";
import Search from "../../components/Search/Search";
import Compose from "../../components/Compose/Compose";

function Post() {
  const { token, setToken } = useContext(AuthContext);

  const [step, setStep] = useState("search");

  return <div>{step === "search" ? <Search /> : <Compose />}</div>;
}

export default Post;
