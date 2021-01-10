const {
  ValidationError,
  getError,
  NotAuthorizedError,
  NotActiveError,
} = require("./errors");
const { checkUserPresence, makeUser } = require("./users");
const njwt = require("njwt");
require("dotenv").config();
const signingKey = process.env.SECRET_KEY;
const { CUSTOMER, ADMIN } = require("./roles");
const { makeItem } = require("./utils");

/**
 * Generate a JWT for the given id
 * @param {String} id
 */
function getAuthToken(id, role) {
  const claims = {
    sub: id,
    scope: role,
  };
  const token = njwt.create(claims, signingKey);
  token.setExpiration(new Date().getTime() + 24 * 60 * 60 * 1000);
  return token.compact();
}

/**
 * Validates the given admin password against the environment
 * @param {*} Credentials.password
 */
async function authenticateAdmin({ password }) {
  const correctPassword = process.env.ADMINPASSWORD;
  try {
    if (!password || correctPassword != password)
      throw new NotAuthorizedError();
    return {
      token: getAuthToken(ADMIN, ADMIN),
    };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Validate given user credentials
 * @param {*} user
 */
async function authenticate(user) {
  try {
    if (!user || !user.email) throw new ValidationError("email");
    if (!user.password) throw new ValidationError("password");

    const givenPassword = user.password;
    user = await checkUserPresence({ email: user.email });
    let isMatch = await user.validatePassword(givenPassword);

    if (!isMatch) throw new NotAuthorizedError();
    if (!user.active) throw new NotActiveError("account");

    return {
      token: getAuthToken(user.id, CUSTOMER),
      user: makeItem(user, ["id", "name", "email"]),
    };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Activate the associated user account given valid activation code
 * @param {String} activationCode
 */
async function activateAccount(activationCode) {
  try {
    if (!activationCode) throw new Error();
    let user = await checkUserPresence({ activationCode });
    if (!user) throw new Error();
    user.activationCode = null;
    user.save();
  } catch (err) {
    throw new ValidationError("activation codd", "code has expired");
  }
}

/**
 * Return accepted token authorization methods
 */
function getValidAuthMethods() {
  return ["bearer"];
}

module.exports = {
  authenticate,
  authenticateAdmin,
  activateAccount,
  getAuthToken,
  getValidAuthMethods,
};
