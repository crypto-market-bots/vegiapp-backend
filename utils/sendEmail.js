const nodemailer =require("nodemailer");
const { options } = require("../Config/email");

const sendEmail =async (options) =>{

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER, // ADMIN GMAIL ID 
        pass: process.env.EMAIL_PASS, // ADMIN GAMIL PASSWORD
        },
    });

    const mailOptions = {
        from :process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text: options.html
    };
    console.log("hello");
   await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;