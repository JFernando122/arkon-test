const UserError = require("./UserError");

class NotFoundError extends UserError {
  status = 404;
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;