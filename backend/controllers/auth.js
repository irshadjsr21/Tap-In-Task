const { createError, signJwt } = require("../utils/helperFunctions");

// ***** Protected Data *****
const secretData = [
  {
    username: "user1",
    age: 18
  },
  {
    username: "user2",
    age: 25
  },
  {
    username: "user3",
    age: 20
  },
  {
    username: "user4",
    age: 19
  }
];

// **************** Handles Login ****************
module.exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (username == "admin" && password == "admin") {
    const payload = {
      username: "admin"
    };

    signJwt(payload)
      .then(token => {
        return res.status(200).json({ token });
      })
      .catch(error => {
        next(error);
      });
  } else {
    throw createError(401, "Invalid Credentials");
  }
};

// **************** Get Protected Data ****************
module.exports.getSecret = (req, res, next) => {
  res.status(200).json({ data: secretData });
};
