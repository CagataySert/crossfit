const crudControllers = require('./crud.controller');
const Movement = require('../../db/models/movement');

module.exports = crudControllers(Movement);
