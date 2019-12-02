/*
 * Script to send email via Nodemailer
 */

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'greennightdwellers@gmail.com',
    pass: 'WeDwelling123'
  },
  tls: {
    rejectUnauthorized: false
  }
});

let HelperOptions = {
  from: '"Broccoli Share" <greennightdwellers@gmail.com',
  to: 'mohitpanchal01996@gmail.com',
  subject: 'A file has been shared with you via Broccoli Share',
  text: 'Encrypted URL here: '
};



  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("The email was sent!");
    console.log(info);
  });
