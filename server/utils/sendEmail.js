const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'prasanthpkp191196@gmail.com',
      pass: 'demo@123',
    },
  });

  const mailOptions = {
    from: 'prasanthpkp191196@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
