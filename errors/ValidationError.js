const UserError = require('./UserError');

class ValidationError extends UserError {
  status;
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.name = 'ValidationError';
  }
}

module.exports = ValidationError;