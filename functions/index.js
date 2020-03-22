const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello Worked fucken world!");
});

exports.getVideos = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("videos")
    .get()
    .then(data => {
      let videos = [];
      data.forEach(doc => {
        videos.push(doc.data());
      });
      return res.json(videos);
    })
    .catch(err => console.log(err));
});
