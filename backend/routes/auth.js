const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
const authenticator = require("../middlewares/authenticator");

router.post("/login", controller.postLogin);

router.get("/secret", authenticator(), controller.getSecret);

module.exports = router;
