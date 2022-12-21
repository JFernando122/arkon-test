const UserError = require("../../../errors/UserError");
const EventService = require('./service');

class EventController {
  async getEvents(_, res) {
    try {
      const response = await EventService.getEvents();

      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof UserError)
        return res.status(error.status).send(error.message)
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async getEvent(req, res) {
    try {
      const { id } = req.params;

      const response = await EventService.getEvent(id);

      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof UserError)
        return res.status(error.status).send(error.message)
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async createEvent(req, res) {
    try {
      const { name, start_date, end_date, quantity } = req.body;

      const response = await EventService.createEvent(name, start_date, end_date, quantity);

      return res.status(201).send(response);
    } catch (error) {
      if (error instanceof UserError)
        return res.status(error.status).send(error.message)
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async updateEvent(req, res) {
    try {
      const updateData = req.body;
      const { id } = req.params;

      const response = await EventService.updateEvent(id, updateData);

      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof UserError)
        return res.status(error.status).send(error.message)
      console.log(error);
      return res.sendStatus(500);
    }
  }

  async deleteEvent(req, res) {
    try {
      const { id } = req.params;

      const response = await EventService.deleteEvent(id);

      return res.status(200).send(response);
    } catch (error) {
      if (error instanceof UserError)
        return res.status(error.status).send(error.message)
      console.log(error);
      return res.sendStatus(500);
    }
  }
}

module.exports = new EventController();