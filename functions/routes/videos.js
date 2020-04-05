const { db } = require("../util/admin");

exports.getAllPlaylists = (req, res) => {
  const subject = {
    subject: req.params.subject
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

/**
 * subject -> id
 * playListName -> "string"
 * videos ->[{title , value(id) ,goto{}}]
 */
exports.postOnePlaylist = (req, res) => {
  const subject = {
    subject: req.body.subject,
    playListName: req.body.playListName,
    videos: req.body.videos
  };

  let vid = {};
  // cool trick for better structure

  if (subject.playListName === 10) {
    // 10 as identifier for update all the playlist
    //videos will be object of arrays
    vid = subject.videos;
  } else {
    // we will update only one playlist
    // videos will be an array
    vid[subject.playListName] = subject.videos;
  }

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
