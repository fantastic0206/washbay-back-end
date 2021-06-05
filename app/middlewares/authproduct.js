// AUTH MIDDLEWARE

const jwt = require("jsonwebtoken");
const config = require("../config/jwt.config");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  jwt.verify(authorizationHeader, config.jwtSecret, (err, decoded) => { // DECODE THE AUTHORIZATION
    if (err) { // AUTHORIZATIONHEADER isn't EXISTED
      req.authorId = null;
      next();
    } else { // AUTHORIZATIONHEADER is EXISTED
      req.authorId = decoded.id;
      next();
    }
  });
};

module.exports = isAuthenticated;
