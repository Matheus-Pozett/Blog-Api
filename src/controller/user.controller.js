const { UserService } = require('../service');

const createUser = async (req, res) => {
  const user = req.body;
  const token = await UserService.createUser(user);
  return res.status(201).json({ token });
};

const getUsers = async (req, res) => {
  const users = await UserService.getAllUsers();

  return res.status(200).json(users);
};

const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  const user = await UserService.getUserById(id);

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { user } = req;

  await UserService.deleteUser(user);

  return res.status(204).end();
};

module.exports = { createUser, getUsers, getUserById, deleteUser };