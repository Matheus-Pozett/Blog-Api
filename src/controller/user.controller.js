const { UserService } = require('../service');

const createUser = async (req, res) => {
  const user = req.body;
  const token = await UserService.createUser(user);
  return res.status(201).json({ token });
};

module.exports = { createUser };