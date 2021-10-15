const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

exports.sendEmail = async ({
  to = process.env.EMAIL_TO,
  from,
  subject,
  message,
}) => {
  const msg = { from, to, subject, text: message };
  await transport.sendMail(msg);
};
