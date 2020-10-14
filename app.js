const express = require("express");
const ejs = require("ejs");
const axios = require("axios");
const app = express();
const connectDB = require("./config/db");
const Post = require("./models/Post");
const port = 3000;

connectDB();
app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");

// BodyParser
app.use(express.json());
app.use("/api/admins", require("./routes/admin"));
app.use("/api/posts", require("./routes/posts"));

app.get("/", async (req, res) => {
  try {
    let response = await axios.get("http://localhost:3000/api/posts/");

    const posts = response.data.data;

    res.render("home", {
      title: "Home",
      sheet: "css/home.css",
      posts: posts,
    });
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", sheet: "css/contact.css" });
});

app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", sheet: "css/about.css" });
});

app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects", sheet: "css/projects.css" });
});
app.get("/blog", async (req, res) => {
  try {
    let response = await axios.get("http://localhost:3000/api/posts/");

    const posts = response.data.data;
    res.render("blog", {
      title: "Blog",
      sheet: "css/blog.css",
      posts: posts,
    });
  } catch (error) {
    console.error(error.message);
  }
});
app.get("/blog/posts/:post_id", async (req, res) => {
  try {
    const post_id = req.params.post_id;
    let response = await axios.get(
      `http://localhost:3000/api/posts/${post_id}`
    );

    const post = response.data.data;
    console.log(post);
    res.render("blog", {
      title: "Blog",
      sheet: "css/blog.css",
      post: post,
    });
  } catch (error) {
    console.error(error.message);
  }
});
app.get("/gallery", (req, res) => {
  res.render("gallery", { title: "Gallery", sheet: "css/gallery.css" });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
