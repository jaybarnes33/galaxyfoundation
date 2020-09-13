const express = require("express");
const router = express.Router();
const controller = require("../controllers/admin");

// @Route POST /
// @Desc Register
// @Access Public
router.post("/", controller.register);

// @Route POST /login
// @Desc login
// @Access Public

router.post("/login", controller.login);

module.exports = router;
