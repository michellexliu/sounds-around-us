const express = require("express");
const request = require("request");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const { URLSearchParams } = require("url");

require("dotenv").config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your client id
console.log(client_id);
const scope = "user-read-private user-read-email user-top-read";
const redirect_uri =
  process.env.redirect_uri || `http://localhost:${PORT}/auth/callback`;

let access_token = undefined;
let refresh_token = undefined;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

const sendRes = (res) => (err, posts) => {
  if (err) {
    console.log(err);
  } else if (posts) {
    res.json({ result: posts });
  }
};

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(cookieParser());

app.listen(PORT, () => {
  console.log("started");
});

mongoose.connect("mongodb://localhost:27017/songs");
// mongoose.connect(
//   `mongodb+srv://admin-michelle:${process.env.DB_PW}@cluster0.07bud.mongodb.net/userDB`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
//   }
// );
const postSchema = new mongoose.Schema({
  body: String,
  date: Date,
  track: String,
});
const Post = mongoose.model("Post", postSchema);

app.get("/auth/login", function (req, res) {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    `https://accounts.spotify.com/authorize?${new URLSearchParams({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    })}`
  );
});

app.get("/auth/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  res.clearCookie(stateKey);
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code,
      redirect_uri,
      grant_type: "authorization_code",
    },
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      refresh_token = body.refresh_token;
      res.redirect("http://localhost:3000/#/view");
    } else {
      res.send("There was an error during authentication.");
    }
  });
});

app.get("/auth/token", (req, res) => {
  res.json({
    access_token: access_token,
    refresh_token: refresh_token,
  });
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const { song, message } = req.body;
  Post.create({
    track: song,
    body: message,
    date: Date.now(),
  }).then((posts) => {
    console.log(posts);
    res.redirect("/#/view");
  });
});

app.get("/post", (req, res) => {
  Post.aggregate([{ $sample: { size: 1 } }], sendRes(res));
});

app.get("/posts", (req, res) => {
  Post.find({}, sendRes(res));
});
