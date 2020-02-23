const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const bcrypt = require('bcrypt');
const User = require('../../db/models/user');
const statusCodeMessages = require('../../utils/status.codes');

const createNewToken = user => {
  return jwt.sign({ id: user.id }, jwtConfig.secretKey, {
    expiresIn: jwtConfig.exp
  });
};

module.exports.signup = async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return res.status(400).json({
      status: false,
      message: statusCodeMessages[400]
    });
  }

  if (req.body.password.length < 5)
    return res.status(400).json({
      status: false,
      message: statusCodeMessages[400]
    });

  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashPassword;

    const {
      firstName,
      lastName,
      email,
      password,
      startOfMembership,
      endOfMembership,
      role
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      startOfMembership,
      endOfMembership,
      role
    });

    const token = createNewToken(newUser);
    return res.status(201).json({
      status: true,
      token,
      user: newUser,
      message: statusCodeMessages[201]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

//Todo: yanlış giriş ypaınca patlıyor, kontrol et
module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: false, message: statusCodeMessages[400] });
  }

  try {
    const passwordObj = await User.findOne({
      where: { email }
    });
    const user = passwordObj.dataValues;

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatched) {
      return res
        .status(401)
        .json({ status: false, message: statusCodeMessages[401] });
    }

    const token = createNewToken(user);
    return res
      .status(200)
      .json({ success: true, token, message: statusCodeMessages[200] });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
