const AuthError = require('../Errors/AuthError');
const jwt = require('../utils/JWT');

const authToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) throw new AuthError('Token not found', 401);

  const token = authorization.split(' ')[1];

  const user = jwt.verifyToken(token);

  req.user = user;

  next();
};

module.exports = authToken;