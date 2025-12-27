class LoginInvalidError extends Error {
  constructor(message) {
    super(message);
    this.name = 'LoginInvalidError';
    this.status = 400;
  }
}

module.exports = LoginInvalidError;