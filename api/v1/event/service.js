const db = require('../../../models');

const NotFoundError = require('../../../errors/NotFoundError');
const EventValidation = require('../../../validation/EventValidation');
const BadRequestError = require('../../../errors/BadRequestError');
const { UniqueConstraintError } = require('sequelize');

const moment = require('moment');
const ConflictError = require('../../../errors/ConflictError');

class EventService {
  async getEvents() {
    const events = await db.Event.findAll();

    return events;
  }

  async getEvent(id) {
    const event = await db.Event.findByPk(id);

    if(!event) throw new NotFoundError('Event not found');

    // get all the tickets of the event
    const tickets = await event.getTickets();

    // get the tickets that have been redeemed
    const redemmedTickets = tickets.filter((ticket) => ticket.redeemed);

    return {
      ...event.get(),
      sold: tickets.length,
      redeemed: redemmedTickets.length,
    };
  }

  async createEvent(name, start_date, end_date, quantity) {

    try {
      const newEvent = await db.Event.create({ name, start_date, end_date, quantity });

      return {
        ...newEvent.get(),
        sold: 0,
        redeemed: 0,
      }
    } catch (error) {
      // If the name is already in the database it throws the UniqueConstraintError
      if (error instanceof UniqueConstraintError) {
        throw new ConflictError('Event name already exists');
      }
      // Any other error we throw forward
      throw error;
    }
  }

  async updateEvent(id, updateData) {

    const event = await this.getEvent(id);

    // Check for both dates changing already done in mdw as well as format
    if(updateData.start_date && !updateData.end_date) {
      EventValidation.validateDates(updateData.start_date, event.end_date);
    } else if (!updateData.start_date, updateData.end_date) {
      EventValidation.validateDates(event.start_date, updateData.end_date);
    }

    // check if the quantity can be changed
    if(updateData.quantity && event.sold > updateData.quantity) {
      throw new BadRequestError(`Quantity cant be lower than the amount already sold (${event.sold})`);
    }

    try {
      await db.Event.update(updateData, { where: { id } });
      return await this.getEvent(id);
    } catch (error) {
      // Check if the new name is not unique
      if (error instanceof UniqueConstraintError) throw new ConflictError('Name already exists');

      throw error;
    }
  }

  async deleteEvent(id) {
    
    const event = await this.getEvent(id);

    // If the event end_date has not pass it checks if there are tickets sold for the event
    if (moment(event.end_date, 'DD/MM/YYYY').isAfter(moment.now())) {
      if (event.sold > 0) {
        throw new BadRequestError('Event cant be deleted since is not past the end_date and theres tickets already sold');
      }
    }

    await db.Event.destroy({ where: { id } });

    // Delete the tickets related to the event
    await db.Ticket.destroy({ where: { event_id: id } });

    return;
  }

}

module.exports = new EventService();