const { Sequelize } = require('sequelize');

const config = require('./databaseConfig')[process.env.NODE_ENV];

const sequelize = new Sequelize({
  dialect: 'mysql',
  ...config,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

module.exports = sequelize;