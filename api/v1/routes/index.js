const { Router } = require('express');

const EventRouter = require('../event/router');
const TicketRouter = require('../ticket/router');


module.exports = Router()
  .use('/event', EventRouter)
  .use('/ticket', TicketRouter)

;