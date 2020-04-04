const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllPlaylists, postOnePlaylist } = require("./routes/videos");
const { getAllSubject, postOneSubject } = require("./routes/subjects");
// const { FBauth } = require("./middlewares/FBauth");

// Videos Route
app.get("/subjects", getAllSubject);
app.post("/subjects", postOneSubject);

app.get("/videos", getAllPlaylists);
app.post("/videos", postOnePlaylist);

exports.api = functions.https.onRequest(app);
