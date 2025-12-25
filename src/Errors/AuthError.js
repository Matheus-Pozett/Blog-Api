class AuthError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'TokenError';
    this.status = status;
  }
}

module.exports = AuthError;