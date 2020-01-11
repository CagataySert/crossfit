const Sequelize = require('sequelize');
const db = require('../db.connection');

const Section = db.define('section', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [0, 30]
    }
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: [0, 500]
    }
  }
});

Section.associate = models => {
  Section.belongsToMany(models.movement, {
    as: 'Movements',
    through: 'SectionMovements'
  });

  Section.belongsToMany(models.wod, {
    as: 'Wods',
    through: 'WodSections'
  });
};

module.exports = Section;
