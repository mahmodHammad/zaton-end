// for initializing a subject & getting it
const { db } = require("../util/admin");

// Most likly we will not do that
exports.getAllSubject = (req, res) => {
  db.collection("subjects")
    .get()
    .then(data => {
      let videos = [];
      data.forEach(doc => {
        videos.push(doc.data());
      });
      return res.json(videos);
    })
    .catch(err => console.log(err));
};

exports.postOneSubject = (req, res) => {
  const newSubject = {
    title: req.body.title,
    id: req.body.id,
    playlists: []
  };

  db.collection("subjects")
    .doc(newSubject.id)
    .set(newSubject)
    .then(doc => {
      console.log(doc);
      res.json(doc.id);
    })
    .catch(err => {
      res.status(500).json({ error: "EEEEEEEEEEEEEEEEEror" });
      console.error(err);
    });
};
