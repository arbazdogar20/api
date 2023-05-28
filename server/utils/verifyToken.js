const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!token) return res.status(404).json('Token Not Found');

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(401).json('Token Is Not Valid');
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
