const express = require("express");
const ejs = require("ejs");

const app = express();
// const connectDB = require("./config/db");
const port = 3000;

// connectDB();
app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { title: "Home", sheet: "css/home.css" });
});

// app.use("/admin/", require("./routes/admin"));
app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", sheet: "css/contact.css" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About Us", sheet: "css/about.css" });
});

app.get("/projects", (req, res) => {
  res.render("projects", { title: "Projects", sheet: "css/projects.css" });
});

app.get("/blog", (req, res) => {
  res.render("blog", { title: "Blog", sheet: "css/blog.css" });
});

app.get("/gallery", (req, res) => {
  res.render("gallery", { title: "Gallery", sheet: "css/gallery.css" });
});

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on port ${port}`);
});
