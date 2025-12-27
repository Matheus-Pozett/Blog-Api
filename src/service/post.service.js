/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
const CategoryError = require('../Errors/CategoryError');
const PostError = require('../Errors/PostError');
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

const getPostById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  
  if (!post) throw new PostError('Post does not exist', 404);
  return post;
};

const updatePost = async (id, user, postData) => {
  const post = await getPostById(id);
  const { title, content } = postData;
  if (!post) throw new PostError('Post does not exist', 404);

  if (post.userId !== user.id) throw new PostError('Unauthorized user', 401);

  await BlogPost.update({ title, content }, { where: { id } });

  const updatedPost = await getPostById(id);

  return updatedPost;
};

const deletePost = async (id, user) => {
  const post = await getPostById(id);

  if (!post) throw new PostError('Post does not exist', 404);

  if (post.userId !== user.id) throw new PostError('Unauthorized user', 401);
  await BlogPost.destroy({ where: { id } });
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };
