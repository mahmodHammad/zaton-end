const { db } = require("../util/admin");

exports.getOneVideos = (req, res) => {
  const document = req.body.docId;
  const docRef = db.collection("subjects").doc(document);
  docRef
    .get()
    .then(data => {
      //if exist -> return it - else return empty object
      let videos = data.data();
      return res.json(videos);
    })
    .catch(err => console.log(err));
};

exports.getAllVideos = (req, res) => {
  const subject={
    id:req.body.id
  }
  db.collection("subjects")
  .doc(subject.id)
  .collection("videos")
  .doc("videos").get().then(e=>{
    console.log(e)
    console.log(e.data())
    res.json(e.data())
  }).catch(err=>{
    console.log(err)
  })
  // db.collection("subjects")
  //   .get()
  //   .then(data => {
  //     let videos = [];
  //     data.forEach(doc => {
  //       videos.push(doc.data());
  //     });
  //     return res.json(videos);
  //   })
  //   .catch(err => console.log(err));
};

exports.postOneVideo = (req, res) => {
  const subject = {
    id: req.body.id
  };

  const vid = {
    playlists: [
      {
        title: "lectures",
        videos: [
          {
            title: "section1",
            id: "1111111111",
            goto: [
              {
                value: "80",
                label: "part1"
              },
              {
                value: "200",
                label: "part2"
              }
            ]
          }
        ]
      }
    ]
  };
  
  db.collection("subjects")
    .doc(subject.id)
    .collection("videos")
    .doc("videos")
    .set(vid)
    .then(e => {
      console.log(e);
      res.json("writeed sucessfully");
    }).catch(err=>{
      console.error(err)
    })
};
