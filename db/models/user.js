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
    type: Sequelize.STRING(20),
    allowNull: false
  },
  startOfSubs: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  endOfSubs: {
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

User.associate = models => {
  User.belongsToMany(models.wod, {
    as: 'Wods',
    through: 'WodParticipants'
  });
};

module.exports = User;
