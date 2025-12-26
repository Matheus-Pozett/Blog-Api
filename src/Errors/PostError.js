class PostError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PostError';
    this.status = 400;
  }
}

module.exports = PostError;