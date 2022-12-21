const EventValidation = require('../../../validation/EventValidation');

class EventMiddlewares{
  validateCreation(req, res, next) {
    try {
      const { name, start_date, end_date, quantity } = req.body;

      EventValidation.validateQuantity(quantity);
      EventValidation.validateDateFormat(start_date);
      EventValidation.validateDateFormat(end_date);
      EventValidation.validateDates(start_date, end_date);

      // check if theres a name
      if(name)
        return next();
      
      // If the user didnt put a name we return 400
      return res.sendStatus(400).send("name is required");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };

  validateUpdate(req, res, next) {
    try {
      const { start_date, end_date, quantity } = req.body;

      if(start_date) EventValidation.validateDateFormat(start_date);
      if(end_date) EventValidation.validateDateFormat(end_date);

      // If both dates are being updated we check if they are in the correct order
      if(start_date && end_date) EventValidation.validateDates(start_date, end_date);

      if(quantity) EventValidation.validateQuantity(quantity)
      
      return next();
      
      return res.sendStatus(400);
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  validateId(req, res, next) {
    const { id } = req.params;

    if(!id) return res.sendStatus(400);

    if(isNaN(id)) return res.sendStatus(400);

    return next();
  }
}

module.exports = new EventMiddlewares();