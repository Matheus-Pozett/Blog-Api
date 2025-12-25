const loginMiddleware = require('./login.middleware');
const userMiddleware = require('./user.middleware');
const errorMiddleware = require('./error.middleware');
const authToken = require('./auth.middleware');

module.exports = { loginMiddleware, userMiddleware, errorMiddleware, authToken };