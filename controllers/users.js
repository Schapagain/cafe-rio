const { isValidMongooseId } = require('../database');

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { saveFiles, deleteFiles, getFilePath } = require("./files");
const { sendActivationEmail } = require("./email");
const { getRandomCode, getServerURL, trimPrematureIds, makeItem } = require('./utils');

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
  let idCardFileName, newUser, activationLink;
  try {

    checkIdCardPresence(user); 
    user = trimPrematureIds(user);

    // save file and replace file with a random fileName
    idCardFileName = await saveFiles(user.idCard);
    user.idCard = idCardFileName;

    // save user to database
    newUser = new User(user);
    user = await newUser.save();

    // generate activation link for the user and send email
    activationLink = generateActivationLink(user);
    sendActivationEmail(user.name,user.email,activationLink);

    return { user: makeItem(user,['id','name','email']) };
  } catch (err) {
    deleteFiles(idCardFileName);
    throw await getError(err);
  }
}

/**
 * Generates an activation link for the new user
 * @param {*} user 
 */
function generateActivationLink(user) {
  const activationCode = generateActivationCode(user);
  return getServerURL().concat('/api/auth/activate/',activationCode);;
}

/**
 * Generates a random code and persist it as activationCode
 * @param {*} user 
 */
function generateActivationCode(user) {
  const activationCode = getRandomCode(10);
  user.activationCode = activationCode;
  user.save();
  return activationCode;
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
async function getUsers(id=null,attributes=['id','active','name','email','phone','registrationDate']) {
  let users =[];
  if (!id) {
    users = await User.find();
  }else {
    users = [await checkUserPresence({id})]
  }
  return {count:users.length,data:users.map(user => makeItem(user,attributes))};
}

/**
 * Returns file path for idcard of the user with the given id
 * @param {String} id 
 */
async function getIdCard(id) {
  try{
    let user = await checkUserPresence({id});
    let filePath = await getFilePath(user.idCard);
    return filePath;
  }catch(err) {
    throw await getError(err);
  }
}

module.exports = { signupUser, deleteUser, getUsers, checkUserPresence, getIdCard };
