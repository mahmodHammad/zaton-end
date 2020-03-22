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

exports.postVideos = functions.https.onRequest((req, res) => {
  const newVideo = {
    title: "Signal Analysis",
    value: [
      {
        name: "sections",
        id: "EmyArAqDEbs",
        goto: [
          {
            value: "80",
            label: "part1"
          },
          {
            value: "200",
            label: "part2"
          }
        ],
        name: "section1"
      }
    ]
  };

  admin.firestore().collection('videos').add(newVideo).then(doc=>{
      res.json({message:"Document Created successfully"})
  }).catch(err=>{
      res.status(500).json({error:"EEEEEEEEEEEEEEEEEror"});
      console.error(err)
  })
});
