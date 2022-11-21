const express = require("express");
const request = require("request");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { URLSearchParams } = require("url");
require("dotenv").config();

const client_id = process.env.CLIENT_ID; // Your client id
const client_secret = process.env.CLIENT_SECRET; // Your client id
console.log(client_id);
const scope = "user-read-private user-read-email user-top-read";
var redirect_uri = process.env.redirect_uri || "http://localhost:3000/callback";

const generateRandomString = (length) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(cors())
  .use(cookieParser());

app.listen(PORT, () => {
  console.log("started");
});

app.get("/login", function (req, res) {
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

app.get("/callback", function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        new URLSearchParams({
          error: "state_mismatch",
        })
    );
  } else {
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
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token } = body;

        res.redirect(
          "/#" +
            new URLSearchParams({
              client: "spotify",
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.send("There was an error during authentication.");
      }
    });
  }
});
