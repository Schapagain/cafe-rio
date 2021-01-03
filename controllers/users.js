const { getAuthToken } = require("../utils/authorization");
const { isValidMongooseId } = require('../database');

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { saveFiles, deleteFiles } = require("./files");

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
  let idCard, newUser, token;
  try {

    checkIdCardPresence(user); 

    // save file and replace file with a random fileName
    idCard = await saveFiles(user.idCard);
    user.idCard = idCard;

    // save user to database
    newUser = new User(user);
    await newUser.save();

    // generate JWT and respond
    token = getAuthToken(user.id);
    user = {
      ...user,
      id: newUser.id,
    };
    return { user: makeUser(user), token };
  } catch (err) {

    // delete saved file
    if (idCard) deleteFiles(idCard);
    throw await getError(err);
  }
}

/**
 * Trim the user object to only include the given attributes
 * @param {*} user 
 */
function makeUser(user, attributes = ['id','name','email','organization','employeeId']) {
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

module.exports = { signupUser, deleteUser, getUsers };
