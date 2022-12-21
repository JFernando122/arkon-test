const UserError = require("../../../errors/UserError");
const TicketService = require('./service');

class TicketController {
  async buyTicket(req, res) {
    try {
      const { eventId } = req.params;

      const response = await TicketService.buyTicket(eventId);

      return res.status(201).send(response);
    } catch(error) {
      if (error instanceof UserError) {
        return res.status(error.status).send(error.message);
      } else {
        console.log(error);
        return res.sendStatus(500);
      }
    }
  }

  async redeemTicket(req, res) {
    try {
      const { ticketId } = req.params;

      const response = await TicketService.redeemTicket(ticketId);

      return res.send(response);
    } catch(error) {
      if (error instanceof UserError) {
        return res.status(error.status).send(error.message);
      } else {
        console.log(error);
        return res.sendStatus(500);
      }
    }

  }
}

module.exports = new TicketController();