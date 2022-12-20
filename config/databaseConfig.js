require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQLDB_USER,
    "password": process.env.MYSQLDB_PASS,
    "database": process.env.MYSQLDB_NAME,
    "host": process.env.MYSQLDB_HOST,
    "port": process.env.MYSQLDB_DOCKER_PORT,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.MYSQLDB_USER,
    "password": process.env.MYSQLDB_PASS,
    "database": process.env.MYSQLDB_NAME,
    "host": process.env.MYSQLDB_HOST,
    "port": process.env.MYSQLDB_DOCKER_PORT,
    "dialect": "mysql",
    "logging": false,
  },
  "production": {
    "username": process.env.MYSQLDB_USER,
    "password": process.env.MYSQLDB_PASS,
    "database": process.env.MYSQLDB_NAME,
    "host": process.env.MYSQLDB_HOST,
    "port": process.env.MYSQLDB_DOCKER_PORT,
    "dialect": "mysql"
  }
}
