const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config({path:"./Config/config.env"});

let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, //true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // ADMIN GMAIL ID 
        pass: process.env.EMAIL_PASS, // ADMIN GAMIL PASSWORD
    },
})


module.exports = transporter; 