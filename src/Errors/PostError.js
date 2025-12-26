class PostError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'PostError';
    this.status = status;
  }
}

module.exports = PostError;