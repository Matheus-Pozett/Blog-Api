const express = require('express');
const { LoginController, UserController } = require('../controller');
const { loginMiddleware, userMiddleware } = require('../middleware');

const router = express.Router();

router.post('/login', loginMiddleware, LoginController.login);
router.post('/user', userMiddleware, UserController.createUser);

module.exports = router;