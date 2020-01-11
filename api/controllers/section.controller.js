const crudControllers = require('./crud.controller');
const Section = require('../../db/models/section');

module.exports = crudControllers(Section);
