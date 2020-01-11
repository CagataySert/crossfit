const Sequelize = require('sequelize');
const db = require('../db.connection');

const Movement = db.define('movement', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isNumeric: [2, 30]
    }
  },
  url: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
});

Movement.associate = models => {
  Movement.belongsToMany(models.section, {
    as: 'Sections',
    through: 'SectionMovements'
  });
};

module.exports = Movement;
