const Sequelize = require('sequelize');
const db = require('../db.connection');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 30]
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 30]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING(),
    allowNull: false
  },
  startOfMembership: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  endOfMembership: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.associate = models => {
  User.belongsToMany(models.wod, {
    as: 'Wods',
    through: 'WodParticipants'
  });
};

module.exports = User;
