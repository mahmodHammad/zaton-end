// for initializing a subject & getting it 
const { db } = require("../util/admin");


exports.getOneSubject = (req, res) => {
    const document = req.body.Id;
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
  
// Most likly we will not do that 
  exports.getAllSubject = (req, res) => {
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
  exports.postOneSubject = (req, res) => {
      const newSubject ={
         title: req.body.title,
         id: req.body.id,
         playlists:[
             {
                 name:'sections',
                 id:"1234",
                 goto:[ {
                    value: "80",
                    label: "part1"
                  },
                  {
                    value: "200",
                    label: "part2"
                  }]
             }
         ]
      }
  
    // const newAddedVideo = {
    //   title: "TITLE",
    //   id: "IDIDIDID"
    // };
  
    db.collection("subjects").doc(newSubject.id).set(newSubject)
      .then(doc => {
        console.log(doc)
        res.json(doc.id);
      })
      .catch(err => {
        res.status(500).json({ error: "EEEEEEEEEEEEEEEEEror" });
        console.error(err);
      });
  };
  

//   const documentRef1 = firestore.doc('collection/documetn')
//   const documentRef2 = firestore.collection("").doc("")

  
//   doc.onSnapshot(function(){

//   })