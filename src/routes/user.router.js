const express = require('express');
const { LoginController } = require('../controller');
const loginMiddleware = require('../middleware/login.middleware');

const router = express.Router();

// router.post('/login', UserController.createUser);
router.post('/login', loginMiddleware, LoginController.login);

module.exports = router;