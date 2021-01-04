const axios = require('axios');
const { getError } = require('./errors');
require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendActivationEmail(name,email,activationLink) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service:"Gmail",
    auth: {
      user: "activation.cafe.rio@gmail.com", // generated ethereal user
      pass: "Ambrosia77", // generated ethereal password
    },
  });

  let mailBody = {
    from: `"Cafe Rio" <${process.env.EMAILUSER}>`,
    to: email, 
    subject: "Activate account",
    text: `Hello ${name}, welcome to Cafe Rio. Please click on the following link to activate your account: ${activationLink}`, // plain text body
    html: 
    `<h2>Hello ${name}</h2>
    <p>Welcome to Cafe Rio. 
    Please click on the following link to activate your account: <p>
    <a href = ${activationLink} >Activate account</a>
    `
  }
 
  try {
    transporter.sendMail(mailBody);
  }catch(err) {
    throw await getError(err);
  }

}

module.exports = { sendActivationEmail }