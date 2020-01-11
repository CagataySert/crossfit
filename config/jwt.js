require('dotenv').config();

const { SECRET_KEY, EXP } = process.env;

module.exports = {
  secretKey: SECRET_KEY,
  exp: EXP
};
