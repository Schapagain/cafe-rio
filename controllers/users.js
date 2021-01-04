const { isValidMongooseId } = require('../database');

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { saveFiles, deleteFiles, getFilePath } = require("./files");
const { sendActivationEmail } = require("./email");
const { getRandomCode, getServerURL } = require('./utils');

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
  let idCard, newUser, activationCode, activationLink;
  try {

    checkIdCardPresence(user); 

    // save file and replace file with a random fileName
    idCard = await saveFiles(user.idCard);
    user.idCard = idCard;

    // save user to database
    newUser = new User(user);
    user = await newUser.save();

    // generate activation link
    activationCode = generateActivationCode(user);
    activationLink = getServerURL().concat('/api/auth/activate',activationCode);

    // generate activation code for the user and send email
    sendActivationEmail(user.name,user.email,activationLink);

    return { user: makeUser(user) };
  } catch (err) {

    // delete saved file
    if (idCard) deleteFiles(idCard);
    throw await getError(err);
  }
}

/**
 * Generates a random code and persist it as activationCode
 * @param {*} user 
 */
function generateActivationCode(user) {
  const activationCode = gerRandomCode(10);
  user.activationCode = activationCode;
  user.save();
}

/**
 * Trim the user object to only include the given attributes
 * @param {*} user 
 */
function makeUser(user, attributes = ['active','id','name','email','organization','employeeId','registrationDate']) {
  return attributes.reduce((obj,attr) => ({...obj,[attr]:user[attr]}),{})
}

/**
 * Check if idCard property exists on user
 * @param {Object} user 
 */
function checkIdCardPresence(user) {
  if (!user.idCard || !(typeof user.idCard == "object"))
      throw new ValidationError("idCard", "Upload a picture of an Id card");
}

/**
 * Remove user from the database
 * and user files from the disk
 * @param {*} user
 */
async function deleteUser(id) {
  try {
    const user = await checkUserPresence({id});
    await User.deleteOne({id});
    deleteFiles(user.idCard);
    return {id};
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Check if the user with the given parameters exists in the database
 * @param {object} query
 */
async function checkUserPresence(query) {
  try{
    if (!query || (query.id && !isValidMongooseId(query.id))){
      throw new NotFoundError('user');
    }
    const exists = await User.findOne(query) 
    if (!exists) throw new NotFoundError('user');
    return exists
  }catch(err){
    throw await getError(err);
  }
  
}
/**
 * Get users info from database
 * @param {String} id
 */
async function getUsers(id=null) {
  let users =[];
  if (!id) {
    users = await User.find();
  }else {
    users = [await checkUserPresence({id})]
  }
  return {count:users.length,data:users.map(user => makeUser(user))};
}

async function getIdCard(id) {
  try{
    let user = await checkUserPresence({id});
    let filePath = await getFilePath(user.idCard);
    return filePath;
  }catch(err) {
    throw await getError(err);
  }
}

module.exports = { signupUser, deleteUser, getUsers, checkUserPresence, makeUser, getIdCard };
