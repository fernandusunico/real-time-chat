const jwt = require("jsonwebtoken");
const { appSecretKey } = require("../config/appConfig");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "No token provided." });
  }

  jwt.verify(token, appSecretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to authenticate token." });
    } else {
      req.decoded = decoded;
      next();
    }
  });
}

module.exports = {
  authenticateToken,
};
