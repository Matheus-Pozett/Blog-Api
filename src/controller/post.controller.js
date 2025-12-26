const { PostService } = require('../service');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id: userId } = req.user;

  // Validação básica de campos obrigatórios (Pode ser feito com Joi tbm)
  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const newPost = await PostService.createPost({ title, content, categoryIds }, userId);

  return res.status(201).json(newPost);
};

const getAllPosts = async (req, res) => {
  const posts = await PostService.getAllPosts();

  return res.status(200).json(posts);
};

const getPostById = async (req, res) => {
  const id = Number(req.params.id);
  const post = await PostService.getPostById(id);
  return res.status(200).json(post);
};

module.exports = { createPost, getAllPosts, getPostById };