const UserError = require('../Errors/UserError');
const { User } = require('../models');
const jwtUtils = require('../utils/JWT');

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

  const token = jwtUtils.generateToken(userWithoutPassword);

  return token;
};

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) throw new UserError('User does not exist', 404);

  return user;
};

const deleteUser = async (userData) => {
  const user = await getUserById(userData.id);

  await User.destroy({ where: { id: user.id } });
};

module.exports = { createUser, getAllUsers, getUserById, deleteUser };