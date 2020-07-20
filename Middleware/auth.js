const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function async(req, res, next) {
  token = req.header('x-auth-token');
  if (!token) {
    res.status(401).json({ msg: 'No token, Autherization denied.' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Token not valid.');
  }
};
