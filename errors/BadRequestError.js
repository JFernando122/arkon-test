const UserError = require("./UserError");

class BadRequestError extends UserError {
  status = 400;
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}

module.exports = BadRequestError;