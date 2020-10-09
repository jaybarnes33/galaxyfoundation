const express = require("express");
const ejs = require("ejs");

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
    const posts = await Post.find();
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
    const posts = await Post.find();
    res.render("blog", {
      title: "Blog",
      sheet: "css/blog.css",
      posts: posts,
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
