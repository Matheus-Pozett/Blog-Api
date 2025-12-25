const express = require('express');
const { CategoriesController } = require('../controller');
const { categoryMiddleware, authToken } = require('../middleware');

const router = express.Router();

router.post(
  '/categories', 
  authToken,
  categoryMiddleware, 
  CategoriesController.createCategory,
);

module.exports = router;