'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('Events', null, {});
   await queryInterface.bulkDelete('Tickets', null, {});

   await queryInterface.bulkInsert('Events', [
    // regular event
    {
      id: 1,
      name: 'Regular show',
      start_date: '14/12/2022',
      end_date: '14/12/2030',
      quantity: 200,
    },
    // Event with past end_date
    {
      id: 2,
      name: 'Elizabeth show',
      start_date: '21/04/1926',
      end_date:'08/09/2020',
      quantity: 120,
    },
    // Sold out event
    {
      id: 3,
      name: 'Pentatonix concert',
      start_date: '14/12/2022',
      end_date: '14/12/2030',
      quantity: 5,
    },
    // DELETING TEST DUMMIES
    // can't delete since one ticket is sold
    {
      id: 4,
      name: 'Hoy',
      start_date: '14/12/2022',
      end_date: '14/12/2030',
      quantity: 100,
    },
    // can delete since the event didnt sell any tickets
    {
      id: 5,
      name: 'Birthday party',
      start_date: '14/12/2022',
      start_date: '18/03/2023',
      quantity: 120,
    },
    // Can delete since the event is past end_date (sold tickets)
    {
      id: 6,
      name: 'Thanksgiving',
      start_date: '24/11/2022',
      end_date: '24/11/2022',
      quantity: 15,
    },
    // can delete since the event is past end_date (no tickets sold)
    {
      id: 7,
      name: 'El mañanero',
      start_date: '13/12/2022',
      end_date: '13/12/2022',
      quantity: 200,
    },
    // Event in the future
    {
      id: 8,
      name: 'Elections',
      start_date: '05/06/2024',
      end_date: '06/06/2024',
      quantity: 120,
    },
    // Updating test dummies
    // Event with unique name
    {
      id: 9,
      name: 'AVeryUniqueNameIndeed',
      start_date: '14/12/2022',
      end_date: '14/12/2022',
      quantity: 120,
    },
    // Dummy to perfom the not posible tests
    {
      id: 10,
      name: 'changinName',
      start_date: '14/12/2030',
      end_date: '15/12/2030',
      quantity: 10,
    },

    // Dummy with succesfull update test
    {
      id: 11,
      name: 'notHereForTooLong',
      start_date: '10/12/2020',
      end_date: '14/12/2030',
      quantity: 250,
    }
   ]);

   await queryInterface.bulkInsert('Tickets', [
    // inserting 5 for event with id 3 (purchase/sold out test)
    {
      // Testing for successful redeem
      id: 1,
      event_id: 3,
      redeemed: false
    },
    {
      // Testing for trying to redeem already redeemed ticket
      id: 2,
      event_id: 3,
      redeemed: true
    },
    {
      id: 3,
      event_id: 3,
      redeemed: false
    },
    {
      id: 4,
      event_id: 3,
      redeemed: false
    },
    {
      id: 5,
      event_id: 3,
      redeemed: false
    },
    // Insterting ticket for id 2 trying to redeem(past end_date)
    {
      id: 6,
      event_id: 2,
      redeemed: false,
    },
    // inserting one ticket for event with id 4 (delete sold event)
    {
      id: 7,
      event_id: 4,
      redeemed: true,
    },
    // Inserting one ticket for id 5 (delete past end_date)
    {
      id: 8,
      event_id: 5,
      redeemed: false,
    },
    // Inserting tickets for id 10 to not be able to update below the sold tickets
    {
      id: 9,
      event_id: 10,
      redeemed: false,
    },
    {
      id: 10,
      event_id: 10,
      redeemed: false,
    },
    {
      id: 11,
      event_id: 10,
      redeemed: false,
    },
    {
      id: 12,
      event_id: 10,
      redeemed: false,
    },
    {
      id: 13,
      event_id: 10,
      redeemed: false,
    },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
