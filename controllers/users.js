const { getAuthToken } = require("../utils/authorization");

// Import the user model
const { User } = require("../database/models");
const { getError, ValidationError } = require("./errors");
const { saveFiles, deleteFiles } = require("./files");

/**
 * Save user info to the database
 * and user files into the disk
 * @param {*} user
 */
async function signupUser(user) {
  let idCard, newUser, token;
  try {
    // check if idCard is sent
    if (!user.idCard || !(typeof user.idCard == "object"))
      throw new ValidationError("idCard", "Upload a picture of an Id card");

    // save file and replace file with a random fileName
    idCard = (await saveFiles([user.idCard]))[0];
    user.idCard = idCard;
    newUser = new User(user);
    await newUser.save();

    token = getAuthToken(user.id);
    user = {
      ...user,
      id: newUser._id,
    };
    return { user, token };
  } catch (err) {
    // delete saved file in case of error
    idCard ? deleteFiles([idCard]) : null;
    throw await getError(err);
  }
}

/**
 * Remove user from the database
 * and user files from the disk
 * @param {*} user
 */
async function deleteUser(user) {
  try {
    const _id = user.id;
    const result = await User.findOne({ _id });
    if (!result) return new Error("User not found");
    await User.deleteOne({ _id });
    deleteFiles([result.idCard]);
    return { id: user.id };
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = { signupUser, deleteUser };
