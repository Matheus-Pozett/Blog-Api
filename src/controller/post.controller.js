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

const updatePost = async (req, res) => {
  const id = Number(req.params.id);
  const post = req.body;

  if (!post.title || !post.content) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  const { user } = req;
  const updatedPost = await PostService.updatePost(id, user, post);
  return res.status(200).json(updatedPost);
};

const deletePost = async (req, res) => {
  const { user } = req;
  const id = Number(req.params.id);

  await PostService.deletePost(id, user);

  return res.status(204).end();
};

module.exports = { createPost, getAllPosts, getPostById, updatePost, deletePost };