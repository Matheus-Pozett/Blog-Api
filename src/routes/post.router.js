const express = require('express');
const { PostController } = require('../controller');
const { authToken, postMiddleware } = require('../middleware');

const router = express.Router();

router.post('/post', authToken, postMiddleware, PostController.createPost);
router.get('/post', authToken, PostController.getAllPosts);

module.exports = router;