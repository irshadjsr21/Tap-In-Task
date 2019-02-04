// ********* Importing Modules *************
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const { createError } = require("./utils/helperFunctions");
const addUserMiddleware = require("./middlewares/addUser");

// *** Initializing app and Middleware ******
const app = express();
app.use(bodyParser.json());
app.use(addUserMiddleware);

// ********* Importing Routers *************
const authRouter = require("./routes/auth");

// ********* Setting Routers *************
app.use("/api", authRouter);

// ********* Invalid URL *************
app.use((req, res, next) => {
  throw createError(404, "Invalid URL");
});

// ********* Error Handler *************
app.use((error, req, res, next) => {
  let errorMsg = "Some Internal Error Occured";
  let status = 500;

  if (error.customError || error.statusCode) {
    // If error has been handled extract it's details

    errorMsg = error.customError;
    status = error.statusCode;
  } else {
    // If error is unhandled, log the error

    console.log(error);
  }

  return res.status(status).json({ error: errorMsg });
});

app.listen(config.PORT, () => {
  console.log("Server Started on Port : " + config.PORT);
});
