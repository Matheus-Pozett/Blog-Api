const { CategoryService } = require('../service');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

const getCategories = async (req, res) => {
  const categories = await CategoryService.getCategories();

  return res.status(200).json(categories);
};

module.exports = { createCategory, getCategories };