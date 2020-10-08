const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin");
const mongoose = require("mongoose");
// @Route POST /
// @Desc Register
// @Access Public
router.post("/", controller.register);

// @Route POST /login
// @Desc login
// @Access Public

router.post("/auth", controller.login);

module.exports = router;
