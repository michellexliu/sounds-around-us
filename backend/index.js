const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(PORT, () => {
  console.log("started");
});
