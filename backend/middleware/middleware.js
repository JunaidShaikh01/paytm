const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const middleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(404).json({
      msg: "Invalid credentials",
    });
  }

  const token = authHeader.split(" ")[1];

  const verifyToken = jwt.verify(token, jwtSecret);
  if (!verifyToken) {
    return res.status(404).json({
      msg: "Token expired",
    });
  }

  req.userId = verifyToken.userId;

  next();
};

module.exports = middleware;
