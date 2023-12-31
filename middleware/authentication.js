const User = require('../models/User')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET)
      req.userId = data.id
      req.username = data.username
      return next()
    } catch {
      return res.sendStatus(403)
    }
  }
module.exports = authentication