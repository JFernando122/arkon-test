const { Router } = require('express');
const middlewares = require('./validator');

const EventController = require('./controller');

module.exports = Router()

// GET
  .get('/', EventController.getEvents)
  .get('/:id', middlewares.validateId, EventController.getEvent)

// POST
  .post('/', middlewares.validateCreation, EventController.createEvent)

// PUT
  .put('/:id', middlewares.validateId, middlewares.validateUpdate, EventController.updateEvent)

// Delete
  .delete('/:id', middlewares.validateId, EventController.deleteEvent)