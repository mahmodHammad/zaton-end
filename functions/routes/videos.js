const { db } = require("../util/admin");

exports.getAllPlaylists = (req, res) => {
  const subject = {
    subject: req.body.subject
  };
  db.collection("subjects")
    .doc(subject.subject)
    .collection("videos")
    .doc("videos")
    .get()
    .then(e => {
      res.json(e.data());
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postOnePlaylist = (req, res) => {
  const subject = {
    subject: req.body.subject,
    playListName: req.body.playListName,
    videos:req.body.videos
  };

  let vid = {};
  // cool trick for better structure
  vid[subject.playListName] = subject.videos

  db.collection("subjects")
    .doc(subject.subject)
    .collection("videos")
    .doc("videos")
    .set(vid, { merge: true })
    .then(e => {
      res.json("writeed sucessfully");
    })
    .catch(err => {
      console.error(err);
    });
};
