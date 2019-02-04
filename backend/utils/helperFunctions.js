const jwt = require("jsonwebtoken");
const config = require("../config");

// ************ Create Custom Error *****************
module.exports.createError = (status, errorMsg) => {
  const error = new Error(errorMsg);
  error.customError = errorMsg;
  error.statusCode = status;
  return error;
};

// ***************** Sign JWT ***********************
module.exports.signJwt = payload => {
  return new Promise(async (resolve, reject) => {
    try {
      // Try to generate Token

      const token = await jwt.sign(payload, config.JWT.SECRET, {
        expiresIn: config.JWT.EXPIRES_IN
      });

      resolve(token);
    } catch (error) {
      // If error Reject with Error

      reject(error);
    }
  });
};
