require('dotenv').config();
const Sequelize = require('sequelize');

const { DATABASE, USER_NAME, PASSWORD, HOST, DIALECT } = process.env;

// Option 1: Passing parameters separately
module.exports = new Sequelize(DATABASE, USER_NAME, PASSWORD, {
  host: HOST,
  dialect: DIALECT
});
