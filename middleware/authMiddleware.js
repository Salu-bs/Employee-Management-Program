const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/regmodel');

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (req.cookies && req.cookies.token) {
    try {
      token = req.cookies.token;
      console.log("hi")
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      // const decoded = jwt.verify(token, 'ACCESS_TOKEN_SECRET', { expiresIn: '10m' });
     console.log(decoded)
     console.log(req.user);
      req.user = decoded;

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
});

module.exports = { protect };

