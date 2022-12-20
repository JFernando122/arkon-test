const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Event, {
        foreignKey: 'event_id',
      });
    }
  }
  Ticket.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true, primaryKey: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: sequelize.models.Event,
        key: 'id',
      }
    },
    redeemed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Ticket',
    timestamps: false,
  });
  return Ticket;
};