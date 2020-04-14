// for users
const { db } = require("../util/admin");

function exrtactID(url) {
  return url.split("=")[1].split("&")[0];
}

function timeToSeconds(time) {
  let times = time.split(":");
  let seconds = 0;
  if (times.length === 2) {
    let min = parseInt(times[0]);
    let sec = parseInt(times[1]);
    seconds = min * 60 + sec;
  } else if (times.length === 3) {
    let h = parseInt(times[0]);
    let min = parseInt(times[1]);
    let sec = parseInt(times[2]);
    seconds = h * 60 * 60 + min * 60 + sec;
  }
  return seconds;
}

exports.getSubject = (req, res) => {
  const subject = {
    subject: req.params.subject
  };

  db.collection("subjects")
    .doc(subject.subject)
    .collection("videos")
    .doc("videos")
    .get()
    .then(e => {
      let pls = e.data();
      let allpls = Object.keys(pls);
      let result={}
      let modifiedpl = allpls.forEach(plName => {
        // loop over each playlist
        let modifiedPL = pls[plName].map(video => {
          // loop over each video

          let oldgoto = video.goto;
          let name = video.name;
          let url = exrtactID(video.url);

          let goto = oldgoto.map(e => {
            //   loop over goto
            let title = e.title;
            let time = timeToSeconds(e.time);

            return [title, time];
          });
          return { name, url, goto };
        });

        result[plName]=modifiedPL
      });
      console.log("modifiedpl", modifiedpl);
      res.json(result);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
};
// https://www.youtube.com/watch?v=wv3AH8jylP0
