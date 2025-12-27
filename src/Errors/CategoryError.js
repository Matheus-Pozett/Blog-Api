class CategoryError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'CategoryError';
    this.status = status;
  }
}

module.exports = CategoryError;