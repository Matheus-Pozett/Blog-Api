const express = require('express');
const { PostController } = require('../controller');
const { authToken, postMiddleware } = require('../middleware');

const router = express.Router();

router.get('/post/search', authToken, PostController.searchPostByTerm);

router.post('/post', authToken, postMiddleware, PostController.createPost);
router.get('/post', authToken, PostController.getAllPosts);
router.get('/post/:id', authToken, PostController.getPostById);
router.put('/post/:id', authToken, PostController.updatePost);
router.delete('/post/:id', authToken, PostController.deletePost);

module.exports = router;