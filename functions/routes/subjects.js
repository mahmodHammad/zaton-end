// for initializing a subject & getting it
const { db } = require("../util/admin");

exports.getOneSubject = (req, res) => {
  const document = req.body.Id;
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
