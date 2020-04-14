const functions = require("firebase-functions");
const cors = require('cors');
const express = require("express");
const app = express();

app.use(cors({ origin: true }));

const { getAllPlaylists, postOnePlaylist } = require("./routes/videos");
const { getAllSubject, postOneSubject } = require("./routes/subjects");
const { getSubject } = require("./routes/pl");
// const { FBauth } = require("./middlewares/FBauth");

// Videos Route
app.get("/subjects", getAllSubject);
app.post("/subjects", postOneSubject);

app.get("/videos/:subject", getAllPlaylists);
app.post("/videos", postOnePlaylist);

app.get("/subject/:subject", getSubject);


exports.api = functions.https.onRequest(app);
