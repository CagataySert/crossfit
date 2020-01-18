const jwt = require('jsonwebtoken');
const jwtConfig = require('../../config/jwt');
const bcrypt = require('bcrypt');
const User = require('../../db/models/user');

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
    return res.status(400).send({
      status: false,
      message: 'need email, password,first name and last name.'
    });
  }

  if (req.body.password.length < 5)
    res.status(400).send({
      status: false,
      message: 'password must be greater than 5 characters'
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
      isAdmin
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      startOfMembership,
      endOfMembership,
      isAdmin
    });

    const token = createNewToken(newUser);
    return res.status(201).send({ status: true, token, user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports.signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ status: false, message: 'need email and password' });
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
      res
        .status(400)
        .send({ status: false, message: 'wrong email or password' });
    }

    const token = createNewToken(user);
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.log(error.message);
  }
};
