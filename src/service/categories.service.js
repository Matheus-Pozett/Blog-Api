const CategoryError = require('../Errors/CategoryError');
const { Category } = require('../models');

const findCategoryByName = async (categoryData) => {
  const category = await Category.findOne({ where: { name: categoryData.name } });
  return category;
};

const createCategory = async (categoryData) => {
  const categoryExists = await findCategoryByName(categoryData);

  if (categoryExists) throw new CategoryError('Category already registered', 409);
  const newCategory = await Category.create(categoryData);

  return newCategory;
};

module.exports = { createCategory };