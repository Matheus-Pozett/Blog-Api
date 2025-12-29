const jwt = require('jsonwebtoken');
const AuthError = require('../Errors/AuthError');

const TOKEN_SECRET = process.env.JWT_SECRET || 'secretJWT';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const generateToken = (payload) => jwt.sign(payload, TOKEN_SECRET, jwtConfig);

const verifyToken = (token) => jwt.verify(token, TOKEN_SECRET, (err, data) => {
  if (err) throw new AuthError('Expired or invalid token', 401);
  return data;
});

module.exports = { generateToken, verifyToken };