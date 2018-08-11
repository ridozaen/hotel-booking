const jwt = require("jsonwebtoken");
function isAuthenticated(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.SECRET_KEY);
      req.user = user;
      next();
    } catch (err) {
      res.status(400).send({ message: err.message });
    }
  } else {
    res.status(400).send({ message: "empty token!" });
  }
}

function isAuthorized(req, res, next) {
  let token = req.headers.authorization;
  if (token) {
    let user = jwt.verify(token, process.env.SECRET_KEY);
    if (user.role === "admin") {
      next();
    } else {
      res.status(400).send({ message: "user role should be admin" });
    }
  } else {
    res.status(400).send({ message: "empty token!" });
  }
}

module.exports = { isAuthenticated, isAuthorized };
