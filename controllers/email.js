const axios = require("axios");
const { getError } = require("./errors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

/**
 * Use google client info in the environment 
 * to creaet nodemailer transporter
 */
async function getGoogleMailTransporter() {

  const clientId = process.env.CLIENTID
  const clientSecret = process.env.CLIENTSECRET
  const refreshToken = process.env.REFRESHTOKEN
  const user = process.env.EMAILUSER;

  const authClient = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  authClient.setCredentials({
    refresh_token: refreshToken,
  });
  let accessToken,transporter;
  try{
    accessToken = authClient.getAccessToken();
    transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken,
        accessToken,
      }
    });
  }catch(err) {
    throw await getError(err);
  }
  return transporter;
}

/**
 * Send activationLink to the user using gmail server
 * @param {String} name 
 * @param {String} email 
 * @param {String} activationLink 
 */
async function sendActivationEmail(name,email,activationLink) {
  try {
    let transporter = await getGoogleMailTransporter();
    const mailBody = getEmailBody(process.env.EMAILUSER,email,name,activationLink);
    transporter.sendMail(mailBody);
  }catch(err) {
    throw await getError(err);
  }
}

/**
 * Make an email body (for activation email) given sender and receiver info
 * @param {String} senderEmail 
 * @param {String} receiverEmail 
 * @param {String} receiverName 
 * @param {String} activationLink 
 */
function getEmailBody(senderEmail,receiverEmail,receiverName,activationLink) {
  let mailBody = {
    from: `"Cafe Rio" <${senderEmail}>`,
    to: receiverEmail, 
    subject: "Activate account",
    text: `Hello ${receiverName}, welcome to Cafe Rio. Please click on the following link to activate your account: ${activationLink}`, // plain text body
    html: 
    `<h2>Hello ${receiverName}</h2>
    <p>Welcome to Cafe Rio. 
    Please click on the following link to activate your account: <p>
    <a href = ${activationLink} >Activate account</a>
    `
  }
  return mailBody;
}

module.exports = { sendActivationEmail };
