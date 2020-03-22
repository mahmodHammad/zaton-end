const { admin } = require("../util/admin");

exports.FBauth = (req, res, next) => {
  let idToken;
  if (req.headers.auth) {
    idToken = req.headers.auth;
  } else {
    console.error("NO Token found");
    return res.status(403).json({ error: "unAuthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then(decodedToken => {
      console.log(decodedToken);
      req.user = decodedToken;
      return next();
    })
    .catch(err => {
      console.error(err, "ERROR WHILE BARIFYING TOKEN");
      res.status(400).json({ body: "body must not be empty" });
    });
};
