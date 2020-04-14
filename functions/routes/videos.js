// for Contributers
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
      res.json(err)
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

  db.collection("subjects")
    .doc(subject.subject)
    .collection("videos")
    .doc("videos")
    .set(subject.videos, { merge: true })
    .then(e => {
      res.json(subject.videos);
    })
    .catch(err => {
      console.error(err);
      res.json(err)
    });
};
