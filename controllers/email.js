const axios = require('axios');
const { getError } = require('./errors');
require('dotenv').config();

async function sendActivationEmail(name,emailAddress,activationLink) {
    const endPoint = process.env.TRUSTIFI_URL.concat('/api/i/v1/email');


    const emailBody = `
    Hi ${name}, \n
    Welcome to Café Río. 
    Please click on the folowing link to activate your account:\n
    ${activationLink}`;

    const config = {
        headers: {
            'x-trustifi-key': process.env.TRUSTIFI_KEY,
            'x-trustifi-secret': process.env.TRUSTIFI_SECRET,
            'Content-type': 'application/json'
         }
    }
    const body = {
        "title": "Verify email for Cafe Rio",
        "html": emailBody,
        "recipients": [{"email": emailAddress, "name": name}],
        "methods": { 
          "postmark": false,
          "secureSend": false,
          "encryptContent": false,
          "secureReply": false 
        }
      }
      try{
        axios.post(endPoint,body,config);
      }catch(err) {
          throw await getError(err);
      }
}

module.exports = { sendActivationEmail }