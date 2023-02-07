const nodemailer = require("nodemailer");
const { options } = require("../Config/email");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",

    auth: {
      user: process.env.EMAIL_USER, // ADMIN GMAIL ID
      pass: process.env.EMAIL_PASS, // ADMIN GAMIL PASSWORD
    },
  });
  console.log(transporter.options.auth);
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };
  console.log("hello");
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error in sending email  " + error);
      return true;
    } else {
      console.log("Email sent: " + info.response);
      return false;
    }
  });
};

module.exports = sendEmail;
