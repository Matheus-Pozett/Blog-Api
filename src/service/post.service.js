/* eslint-disable max-lines-per-function */
const CategoryError = require('../Errors/CategoryError');
const { Category, BlogPost, PostCategory, sequelize, User } = require('../models');

const createPost = async ({ title, content, categoryIds }, userId) => {
  const { count } = await Category.findAndCountAll({
    where: { id: categoryIds },
  });

  if (count !== categoryIds.length) {
    throw new CategoryError('one or more "categoryIds" not found', 400);
  }

  const t = await sequelize.transaction();

  try {
    const newPost = await BlogPost.create(
      { title, content, userId },
      { transaction: t },
    );

    const postCategories = categoryIds.map((id) => ({
      postId: newPost.id,
      categoryId: id,
    }));

    await PostCategory.bulkCreate(postCategories, { transaction: t });

    await t.commit();

    return newPost;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

module.exports = { createPost, getAllPosts };
