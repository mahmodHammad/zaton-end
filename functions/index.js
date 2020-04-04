const functions = require("firebase-functions");

const express = require("express");
const app = express();

const { getAllVideos, postOneVideo ,getOneVideos} = require("./routes/videos");
const { getOneSubject, getAllSubject ,postOneSubject} = require("./routes/subjects");
// const { FBauth } = require("./middlewares/FBauth");

// Videos Route
app.get("/subjects", getAllSubject);
app.post("/subjects", postOneSubject);

app.get("/videos", getAllVideos);
app.post("/videos", postOneVideo);

exports.api = functions.https.onRequest(app);
