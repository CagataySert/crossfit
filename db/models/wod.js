const Sequelize = require('sequelize');
const db = require('../db.connection');

const Wod = db.define('wod', {
  title: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [2, 30]
    }
  },
  date: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  capacity: {
    type: Sequelize.INTEGER,
    // allowNull: false,
    validate: {
      isInt: true
    }
  }
});

Wod.associate = models => {
  Wod.belongsToMany(models.user, {
    as: 'Participants',
    through: 'WodParticipants'
  });

  Wod.belongsToMany(models.coach, {
    as: 'Coaches',
    through: 'WodCoaches'
  });

  Wod.belongsToMany(models.section, {
    as: 'Sections',
    through: 'WodSections'
  });
};

module.exports = Wod;
