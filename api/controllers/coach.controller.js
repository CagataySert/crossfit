const crudControllers = require('./crud.controller');
const Coach = require('../../db/models/coach');

module.exports = crudControllers(Coach);
