const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllVideos, postOneVideo } = require("./routes/videos");
const { FBauth } = require("./middlewares/FBauth");

// Videos Route
app.get("/videos", getAllVideos);

app.post("/videos", postOneVideo);

exports.api = functions.https.onRequest(app);
