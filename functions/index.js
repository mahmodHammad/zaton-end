const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const express = require('express')
const app =express()


const FBauth =(req,res ,next)=>{
    let idToken ;
    if (req.headers.auth){
        idToken = req.headers.auth
    }
    else{
        console.error("NO Token found")
        return res.status(403).json({error:"unAuthorized"})
    }

    admin.auth().verifyIdToken(idToken).then(decodedToken => {
        console.log(decodedToken)
        req.user = decodedToken;
       return next()
    }).catch(err=>{
        console.error(err , "ERROR WHILE BARIFYING TOKEN")
        res.status(400).json({body:"body must not be empty"})
    })
}


app.get('/videos' , (req, res) => {
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


app.post('/videos' ,FBauth,(req, res) => {
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

  const newAddedVideo ={
    title:req.body.title,
    value:req.body.value
  }

  admin.firestore().collection('videos').add(newAddedVideo).then(doc=>{
      res.json({message:"Document Created successfully"})
  }).catch(err=>{
      res.status(500).json({error:"EEEEEEEEEEEEEEEEEror"});
      console.error(err)
  })
});



exports.api = functions.https.onRequest(app)