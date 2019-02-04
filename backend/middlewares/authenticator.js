const { createError } = require("../utils/helperFunctions");

// **************** Check User Authentication ****************
module.exports = () => {
  return (req, res, next) => {
    if (!req.user) {
      throw createError(401, "Unauthorized User");
    } else {
      next();
    }
  };
};
