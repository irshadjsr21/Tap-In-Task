const env = process.env.NODE_ENV;

let config = {
  PORT: 3000,
  JWT: {
    SECRET: "somesecret",
    EXPIRES_IN: "1d"
  }
};

if (env === "production") {
  config = {
    PORT: process.env.PORT,
    JWT: {
      SECRET: process.env.JWT_SECRET,
      EXPIRES_IN: process.env.EXPIRES_IN
    }
  };
}

module.exports = config;
