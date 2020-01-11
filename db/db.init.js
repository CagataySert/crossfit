const Coach = require('./models/coach');
const Wod = require('./models/wod');
const User = require('./models/user');
const Movement = require('./models/movement');
const Section = require('./models/section');

const connection = require('./db.connection');

module.exports = (async () => {
  Wod.associate(connection.models);
  Coach.associate(connection.models);
  Movement.associate(connection.models);
  Section.associate(connection.models);
  User.associate(connection.models);

  await connection.sync({ force: false });
})();
