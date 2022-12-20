'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        event_id: {
          type: Sequelize.BIGINT.UNSIGNED,
          field: 'event_id',
          references: {
          // This is a reference to another model
            model: 'Events',
        
            // This is the column name of the referenced model
            key: 'id',
          },
         },
      },
      redeemed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};