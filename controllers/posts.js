const mongoose = require("mongoose");
const Post = require("../models/Post");
const Admin = require("../models/Admin");

// @Route POST "/"
// @DESC New Post
// Private

exports.newPost = async (req, res) => {
  let { title, content, date } = req.body;
  try {
    const post = new Post({
      title,
      content,
      date,
    });

    await post.save();
    res.status(200).json({ msg: "Post updated", data: post });
  } catch (error) {
    console.error(error.message);
    res.status(503).json({ msg: "Server Error" });
  }
};

// @Route GET "/"
// @DESC Get all Post
// Public

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error.message);
    res.status(503).json({ msg: "Server Error" });
  }
};

// @Route GET "/post_id"
// @DESC Get Post by id
// Public
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    !post
      ? res.status(404).json({ msg: "Page not Found" })
      : res.status(200).json({ data: post });
  } catch (error) {
    console.error(error.message);
    error.kind == "ObjectId"
      ? res.status(404).json({ msg: "Post not found" })
      : res.status(500).json({ msg: "Server error" });
  }
};

// @Route Delete "/post_id"
// @DESC Get Post by id
// Public
exports.deletePost = async (req, res) => {
  try {
    const post_id = req.params.post_id;
    const post = await Post.findById(post_id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    await post.remove();
    return res.status(200).json({ msg: "Post Deleted" });
  } catch (error) {
    console.error(error.message);
    error.kind == "ObjectId"
      ? res.status(404).json({ msg: "Post not found" })
      : res.status(500).json({ msg: "Server error" });
  }
};
