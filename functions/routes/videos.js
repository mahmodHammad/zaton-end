const { db } = require("../util/admin");

exports.getOneVideos = (req, res) => {
  const document = req.body.docId;
  const docRef = db.collection("videos").doc(document);
  docRef
    .get()
    .then(data => {
    //if exist -> return it - else return empty object
      let videos = data.data()
      return res.json(videos);
    })
    .catch(err => console.log(err));
};

exports.getAllVideos = (req, res) => {
  db.collection("videos")
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

exports.postOneVideo = (req, res) => {
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

  // const newAddedVideo = {
  //   title: req.body.title,
  //   value: req.body.value
  // };

  db.collection("videos")
    .add(newVideo)
    .then(doc => {
      res.json({ message: "Document Created successfully" });
    })
    .catch(err => {
      res.status(500).json({ error: "EEEEEEEEEEEEEEEEEror" });
      console.error(err);
    });
};
