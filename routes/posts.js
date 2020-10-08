const express = require("express");
const router = express.Router();
const controller = require("../controllers/posts");
const auth = require("../middleware/auth");
// Create
router.post("/", auth, controller.newPost);

// Delete
router.delete("/:post_id", auth, controller.deletePost);

// Get All
router.get("/", controller.getPosts);

// Get single
router.get("/:post_id", controller.getPost);

module.exports = router;
