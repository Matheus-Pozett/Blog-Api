const UserInvalidError = require('../Errors/UserInvalidError');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const login = async (loginData) => {
  const { email, password } = loginData;

  const user = await User.findOne({
    where: { email },
  });

  if (!user || user.password !== password) {
    throw new UserInvalidError();
  }

  const { password: _password, ...userWithoutPassword } = user.dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

module.exports = { login };