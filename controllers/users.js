const { getAuthToken } = require("../utils/authorization");

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
    user.idCard = await saveFiles(user.idCard);
   
    // save user to database
    newUser = new User(user);
    await newUser.save();

    // generate JWT and respond
    token = getAuthToken(user.id);
    user = {
      ...user,
      id: newUser._id,
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
    const user = await checkUserPresence(id);
    await User.deleteOne({ _id:id });
    deleteFiles(user.idCard);
    return { id };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Check if the user with the given id exists in the database
 * @param {*} id 
 */
async function checkUserPresence(id) {
  try{
    const exists = await User.findOne({_id:id}) 
    if (!exists) throw new NotFoundError('user');
    return exists
  }catch(err){
    throw await getError(err);
  }
  
}

module.exports = { signupUser, deleteUser };
