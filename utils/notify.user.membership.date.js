const cron = require('node-cron');
const emailSender = require('./email.sender');
const User = require('../db/models/user');

const checkUserMembershipIfLastWeek = endOfMembership => {
  if (endOfMembership) {
    const currentDate = new Date();
    const userEndOfMembershipDate = endOfMembership * 1000; //conver miliseconds

    if (userEndOfMembershipDate - currentDate <= 0) return false;

    const differenceBetweenDates = Math.ceil(
      (userEndOfMembershipDate - currentDate) / (1000 * 60 * 60 * 24) //find diff as days
    );

    if (differenceBetweenDates === 10) {
      return true;
    }
    return false;
  } else {
    return false;
  }
};

const notifyUserEndOfMembership = async () => {
  const users = await User.findAll({
    attributes: ['email', 'endOfMembership']
  });

  if (users) {
    const mailSubject = 'Crossfit Aspera - Üyelik Hatırlatma';
    const mailText = 'Üyeliğinizin Bitmesin son 10 gün!';
    users.map(userData => {
      const { endOfMembership, email } = userData;
      const isLastWeek = checkUserMembershipIfLastWeek(endOfMembership);

      if (isLastWeek) {
        cron.schedule('00 22 * * *', () => {
          emailSender(email, mailSubject, mailText);
        });
      }
    });
  }
};

module.exports = notifyUserEndOfMembership;
