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

module.exports = { createUser, getUsers };