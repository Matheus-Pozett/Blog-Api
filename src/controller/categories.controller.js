const { CategoryService } = require('../service');

const createCategory = async (req, res) => {
  const newCategory = await CategoryService.createCategory(req.body);

  return res.status(201).json(newCategory);
};

module.exports = { createCategory };