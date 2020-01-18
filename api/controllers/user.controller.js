const crudControllers = require('./crud.controller');
const User = require('../../db/models/user');
const bcrypt = require('bcrypt');
const passwordGenerator = require('generate-password');
const emailSender = require('../../utils/email.sender');

const createUser = async (req, res) => {
  try {
    //check user if is admin
    if (!req.user.isAdmin)
      return res.status(403).json({
        status: false,
        message: 'you do not have permission to create user!'
      });

    const {
      firstName,
      lastName,
      email,
      startOfMembership,
      endOfMembership,
      isAdmin
    } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).send({
        status: false,
        message: 'need email,first name and last name.'
      });
    }

    var password = passwordGenerator.generate({
      length: 10,
      numbers: true
    });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      startOfMembership,
      endOfMembership,
      isAdmin
    });

    //send email to user to introduce his/her email is available.
    if (newUser) {
      emailSender(
        email,
        'Crossfit Membership',
        `Hoşgeldiniz\nUygulama şifreniz: ${password}\nBuradan giriş yapabilirsiniz.`
      );
    }

    return res.status(201).json({ status: true, user: newUser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = {
  ...crudControllers(User),
  createOne: createUser
};
