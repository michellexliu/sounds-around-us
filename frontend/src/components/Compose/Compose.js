import React, { useState, useContext } from "react";

import styles from "./Compose.module.css";
import { fromMS } from "../../lib/helpers";
import AuthContext from "../../lib/AuthContext";

function Compose() {
  const { token, setToken } = useContext(AuthContext);

  const [res, setRes] = useState([]);

  return <div></div>;
}

export default Compose;
