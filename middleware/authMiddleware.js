const jwt = require("jsonwebtoken");

const requireAtuh = (req, res, next) => {
  const token = req.cookies.jwt;

  // check JWT exists & is verified
  if (token) {
    jwt.verify(token, "vj86", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAtuh };