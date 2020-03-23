const { db } = require("../util/admin");

exports.getOneVideos = (req, res) => {
  const document = req.body.docId;
  const docRef = db.collection("videos").doc(document);
  docRef
    .get()
    .then(data => {
      console.log("IS Exist", data.exists);
      console.log("Data", data.data());
      let videos = data.data()
      return res.json(videos);
    })
    .catch(err => console.log(err));
};
