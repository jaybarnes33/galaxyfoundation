const express = require("express");
const ejs = require("ejs");

const app = express();

const port = 3000;

app.use(express.static(__dirname + "/public/"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", { title: "Home", sheet: "css/home.css" });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us", sheet: "css/contact.css" });
});
app.listen(port || process.env.PORT, () => {
  console.log(`Server started on port ${port}`);
});
