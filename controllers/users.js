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
    return { user, token };
  } catch (err) {

    // delete saved file
    if (idCard) deleteFiles(idCard);
    throw await getError(err);
  }
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
async function deleteUser(user) {
  try {
    await checkUserPresence(user);
    await User.deleteOne({ _id:user.id });
    deleteFiles(result.idCard);
    return { id: user.id };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Check if the user exists in the database
 * @param {*} user 
 */
async function checkUserPresence(user) {
  try{
    const exists = await User.findOne({_id:user.id}) 
    if (!exists) throw new NotFoundError('user');
  }catch(err){
    throw await getError(err);
  }
  
}

module.exports = { signupUser, deleteUser };
