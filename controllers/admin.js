const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

// @Desc register
// @Access Public
exports.register = async (req, res) => {
  const { firstname, lastname, password, username } = req.body;

  try {
    let admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(401).json({ msg: "User Already Exists" });
    }
    admin = new Admin({
      firstname,
      lastname,
      password,
      username,
    });
    admin.password = await bcrypt.hash(admin.password, 10);
    await admin.save();

    const payload = {
      user: {
        id: admin._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "36d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server error");
  }
};

// @Desc login
// @Access Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let admin = await Admin.findOne({ username: username });
    if (!admin) {
      return res.status(403).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    // JWT
    if (!isMatch) {
      return res.status(403).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
    const payload = {
      user: {
        id: admin._id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "36d" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};
