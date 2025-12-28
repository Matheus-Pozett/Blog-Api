const LoginInvalidError = require('../Errors/LoginInvalidError');
const { User } = require('../models');
const jwtUtil = require('../utils/JWT');

const login = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({
    where: { email },
  });
  if (!user || user.password !== password) {
    throw new LoginInvalidError('Invalid fields');
  }

  const { password: _password, ...userWithoutPassword } = user.dataValues;

  const token = jwtUtil.generateToken(userWithoutPassword);

  return token;
};

module.exports = { login };