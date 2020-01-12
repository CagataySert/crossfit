const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');
const User = require('../db/models/user');

const verifyToken = async token => {
  try {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    const decoded = await jwt.verify(token, jwtConfig.secretKey);
    return decoded;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).send({ status: false, message: 'unauthorized' });
  }

  const token = bearer.split('Bearer ')[1].trim();

  try {
    const payload = await verifyToken(token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).send({ status: false, message: 'unauthorized' });
    }

    req.user = user;
  } catch (error) {
    console.log(error);
    return res.status(401).send({ status: false, message: error.message });
  }

  next();
};
