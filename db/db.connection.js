require('dotenv').config();
const Sequelize = require('sequelize');

const { DATABASE, USER_NAME, PASSWORD, HOST, DIALECT, DB_PORT } = process.env;

// Option 1: Passing parameters separately
module.exports = new Sequelize(
  `${DIALECT}://${USER_NAME}:${PASSWORD}@${HOST}:/${DATABASE}`
);
