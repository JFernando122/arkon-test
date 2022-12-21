class UserError extends Error {
  status = 400;
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = 'UserError';
  }
}

module.exports = UserError;