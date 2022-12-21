const ValidationError = require('../errors/ValidationError');

const moment = require('moment');

class EventValidation {
  static validateQuantity = (quantity) => {
    if(!quantity) {
      throw new ValidationError('Quantity is required');
    }
    if (isNaN(quantity)) throw new ValidationError("Quantity must be a number");

    if (quantity < 0 || quantity > 300) throw new ValidationError("Quantity must be a number between 1 and 300");

    return true;
  };

  // Validates if the date is in the correct format ("DD/MM/YYYY")
  static validateDateFormat = (date) => {
    if (!date) throw new ValidationError('Dates are required');
    if (moment(date, 'DD/MM/YYYY', true).isValid()) return true;

    throw new ValidationError("Dates must be in DD/MM/YYYY format");
  };

  // Validates that the start_date is before the end_date
  static validateDates = (start_date, end_date) => {
    if (moment(start_date, 'DD/MM/YYYY').isAfter(moment(end_date, 'DD/MM/YYYY'))) throw new ValidationError('start_date must be before end_date');
    return true;
  };
}

module.exports = EventValidation;