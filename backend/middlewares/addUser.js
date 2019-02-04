const jwt = require("jsonwebtoken");
const config = require("../config");

// ************ Adds User Object to every req ************
module.exports = (req, res, next) => {
  // Get Header and extract token

  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return next();
  }

  const authHeaderArray = authHeader.split(" ");

  if (authHeaderArray.length !== 2) {
    return next();
  }

  const token = authHeaderArray[1];

  // Verify JWT
  jwt.verify(token, config.JWT.SECRET, (error, payload) => {
    if (error || !payload) {
      return next();
    }

    req.user = {
      username: payload.username
    };

    next();
  });
};
