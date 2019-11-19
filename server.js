/**
 * Script to send email via Nodemailer
 * 
 * Need to implement KOA framework instead of Express
 * Need to  change receiver email to inputed user email
 * 
 */

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const PORT = 8080;

const app = express();

// View app engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware Body Parser from https://github.com/expressjs/body-parser.git
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//Public folder setup
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('contact', {layout: false});
});

app.post('/send', (req, res) => {
    const output = `
    <p>A file link has been shared with you via the Green Night Dwellers!</p>
    <h3>From</h3>
    <ul>
      <li>Name: ${req.body.name}</li> 
      <li>URL: ${req.body.url}</li>
      <li>Email: ${req.body.email}</li>
    <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    // Defining transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'greennightdwellers@gmail.com', // Team email from which email will be sent
            pass: 'WeDwelling123' // Password
        }
    });

    // send mail with defined transport object
    let mailOptions = {
        from: 'greennightdwellers@gmail.com', // sender address
        to: 'mohitpanchal01996@gmail.com', // receivers needs to change to inputted email
        subject: 'Testing Nodemailer', // subject line
        text: 'Its ALIVE!', // plain text body
        html: output // Html body
    };

   transporter.sendMail(mailOptions, function(err, data){
       if (err) {
           console.log('Error Occured :(');
       } else {
           console.log('Email Sent!');
       }
       res.render('contact', {msg: 'Email has been sent!'})
   });
});



app.listen(PORT, () => console.log('Server started...'));