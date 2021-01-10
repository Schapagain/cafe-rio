const axios = require("axios");
const { getError } = require("./errors");
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

async function getGoogleMailInfo() {
  const clientId = process.env.CLIENTID;
  const clientSecret = process.env.CLIENTSECRET;
  const refreshToken = process.env.REFRESHTOKEN;
  const user = process.env.EMAILUSER;

  const authClient = new OAuth2(
    clientId,
    clientSecret,
    "https://developers.google.com/oauthplayground"
  );

  authClient.setCredentials({
    refresh_token: refreshToken,
  });
  let accessToken;
  try {
    accessToken = authClient.getAccessToken();
  } catch (err) {
    throw await getError(err);
  }

  return { user, clientId, clientSecret, refreshToken, accessToken };
}

async function sendActivationEmail(name, email, activationLink) {
  const {
    user,
    clientId,
    clientSecret,
    refreshToken,
    accessToken,
  } = await getGoogleMailInfo();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken,
      accessToken,
    },
  });

  let mailBody = {
    from: `"Cafe Rio" <${process.env.EMAILUSER}>`,
    to: email,
    subject: "Activate account",
    text: `Hello ${name}, welcome to Cafe Rio. Please click on the following link to activate your account: ${activationLink}`, // plain text body
    html: `<h2>Hello ${name}</h2>
    <p>Welcome to Cafe Rio. 
    Please click on the following link to activate your account: <p>
    <a href = ${activationLink} >Activate account</a>
    `,
  };

  try {
    transporter.sendMail(mailBody);
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = { sendActivationEmail };
