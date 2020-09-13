const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Admin = require("../models/Admin");

// @Desc login
// @Access Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.find({ username });
    if (!admin) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
    const payload = {
      user: {
        name: admin.firstname,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "30d" },
      (error, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
  }
};

// @Desc register
// @Access Public
exports.register = async (req, res) => {
  const { firstname, lastname, password, username } = req.body;

  try {
    let admin = await Admin.findOne({ username: username });
    if (admin) {
      return res.status(403).json({ msg: "User Already Exists" });
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
        name: admin.firstname,
      },
    };
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "30d" },
      (error, token) => {
        if (err) throw err;
        res.status(200).json({ token });
      }
    );
  } catch (error) {}
};
