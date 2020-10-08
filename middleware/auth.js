const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = auth = (req, res, next) => {
  // Get token
  const token = req.header("x-auth-token");

  // Check if token exists
  if (!token) {
    return res.status(401).json({ msg: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};
