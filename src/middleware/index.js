const loginMiddleware = require('./login.middleware');
const userMiddleware = require('./user.middleware');
const errorMiddleware = require('./error.middleware');
const authToken = require('./auth.middleware');
const categoryMiddleware = require('./category.middleware');

module.exports = { loginMiddleware, 
  userMiddleware, 
  errorMiddleware,
  authToken,
  categoryMiddleware,
};