const { Router } = require('express');
const TicketController = require('./controller');

const TicketRouter = Router()

  .get('/', TicketController.getTickets)

  .post('/event/:eventId', TicketController.buyTicket)

  .put('/:ticketId', TicketController.redeemTicket);

module.exports = TicketRouter;