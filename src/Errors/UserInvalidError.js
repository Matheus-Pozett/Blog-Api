class UserInvalidError extends Error {
  constructor() {
    super('Invalid fields');
    this.name = 'UserInvalidError';
    this.status = 400;
  }
}

module.exports = UserInvalidError;