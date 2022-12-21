const UserError = require("./UserError");

class ConflictError extends UserError {
  status = 409;
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;