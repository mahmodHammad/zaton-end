const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllVideos, postOneVideo } = require("./routes/videos");
const {getOneVideos} = require("./routes/video")
// const { FBauth } = require("./middlewares/FBauth");

// Videos Route
app.get("/videos", getAllVideos);
app.post("/videos", postOneVideo);

app.get("/video", getOneVideos);

exports.api = functions.https.onRequest(app);
