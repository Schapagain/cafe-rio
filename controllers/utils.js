require('dotenv').config();
const { v4: uuid } = require('uuid');

function getRandomCode(size) {
    return uuid().slice(0, size);
}

function getServerURL() {
    const production = 'https://cafe-rio.herokuapp.com';
    const development = 'http://localhost:5000';
    return process.env.NODE_ENV ? production : development;
}

module.exports = {getRandomCode,getServerURL};