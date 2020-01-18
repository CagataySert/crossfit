const cron = require('node-cron');
const nodemailer = require('nodemailer');
require('dotenv').config();

const { EMAIL, EMAIL_PASSWORD } = process.env;

const messageConfig = (sendTo, subject, text) => ({
  from: 'cagatay.sert5@gmail.com',
  to: sendTo,
  subject,
  text
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD
  }
});

const emailSender = (sendTo, subject, text) => {
  const message = messageConfig(sendTo, subject, text);

  transporter.sendMail(message, mailData => {
    console.log('mail data: ', mailData);
  });
};

// const emailSenderWithCron = (sendTo, subject, text) => {
//   cron.schedule('*/15 * * * * *', () => {
//     transporter.sendMail(messageConfig, mailData => {
//       console.log('mail data: ', mailData);
//     });
//   });
// };

module.exports = emailSender;
