const crudControllers = require('./crud.controller');
const User = require('../../db/models/user');

module.exports = crudControllers(User);
