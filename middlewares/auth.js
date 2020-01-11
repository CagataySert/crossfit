const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.js');

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
    return res.status(401).send();
  }

  const token = bearer.split('Bearer ')[1].trim();

  let payload;
  try {
    payload = await verifyToken(token);
  } catch (error) {
    console.log(error);
    return res.status(401).send();
  }

  //TODO: search for user by payload.id from db and add to req.user. Also check if user is empty.
  next();
};
