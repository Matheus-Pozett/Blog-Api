const { LoginService } = require('../service/index');

const login = async (req, res) => {
  const loginData = req.body;
  const token = await LoginService.login(loginData);

  return res.status(200).json({ token });
};

module.exports = { login };