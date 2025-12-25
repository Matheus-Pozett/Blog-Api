const express = require('express');
const { LoginController, UserController } = require('../controller');
const { loginMiddleware, userMiddleware, authToken } = require('../middleware');

const router = express.Router();

router.post('/login', loginMiddleware, LoginController.login);
router.post('/user', userMiddleware, UserController.createUser);
router.get('/user', authToken, UserController.getUsers);
router.get('/user/:id', authToken, UserController.getUserById);

module.exports = router;