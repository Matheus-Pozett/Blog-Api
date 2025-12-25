const UserError = require('../Errors/UserError');
const { User } = require('../models');
const { generateToken } = require('../utils/JWT');

const findUser = async (email) => {
  const user = await User.findOne({ where: { email } });

  return user;
};

const createUser = async (userData) => {
  const userExists = await findUser(userData.email);

  if (userExists) {
    throw new UserError('User already registered', 409);
  }

  const newUser = await User.create(userData);

  const { password, ...userWithoutPassword } = newUser.dataValues;

  const token = generateToken(userWithoutPassword);

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

module.exports = { createUser, getAllUsers };