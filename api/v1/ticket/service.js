const BadRequestError = require('../../../errors/BadRequestError');
const EventService = require('../event/service');

const moment = require('moment');
const db = require('../../../models');
const NotFoundError = require('../../../errors/NotFoundError');
const ConflictError = require('../../../errors/ConflictError');

class TicketService {
  async getTickets() {
    const tickets = await db.Ticket.findAll({ raw: true });

    return tickets;
  }

  async buyTicket(eventId) {
    const event = await EventService.getEvent(eventId);

    if (event.quantity === event.sold) {
      // No tickets left
      throw new BadRequestError(`Tickets for event ${event.name} sold out`);
    }

    if (moment(event.end_date, 'DD/MM/YYYY').isBefore(moment.now())) {
      // Events end_date already passed
      throw new BadRequestError(`Event ${event.name} is past its end_date`);
    }

    const newTicket = await db.Ticket.create({ event_id: eventId, redeemed: false });

    return { id: newTicket.id };
  }

  async redeemTicket(ticketId) {

    const ticket = await db.Ticket.findByPk(ticketId);

    // ticket doesnt exists
    if (!ticket) throw new NotFoundError('Ticket not found');

    // ticket already redeemd
    if (ticket.redeemed) throw new ConflictError('Ticket already redeemed');

    // event is not between start and end dates
    const event = await EventService.getEvent(ticket.event_id);
    if (!moment(moment.now()).isBetween(moment(event.start_date, 'DD/MM/YYYY'), moment(event.end_date, 'DD/MM/YYYY'))) {
          throw new BadRequestError('Ticket not redeemable right now');
        }

    // ticket valid for redeeming
    ticket.redeemed = true;

    await ticket.save();

    return ticket;
  }
}

module.exports = new TicketService();