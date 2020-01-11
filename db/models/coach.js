const Sequelize = require('sequelize');
const db = require('../db.connection');

const Coach = db.define('coach', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 20]
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [2, 20]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  resume: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  }
});

Coach.associate = models => {
  Coach.belongsToMany(models.wod, {
    as: 'Wods',
    through: 'WodCoaches',
    foreignId: 'wodId'
  });
};

module.exports = Coach;
