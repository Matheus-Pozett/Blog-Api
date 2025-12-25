const AuthError = require('../Errors/AuthError');
const jwt = require('../utils/JWT');

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AuthError('Token not found', 401);

  const token = authorization.split(' ')[1];

  jwt.verifyToken(token);

  next();
};

module.exports = authToken;