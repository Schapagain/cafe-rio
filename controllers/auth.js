const { ValidationError, getError, NotAuthorizedError } = require("./errors");
const { checkUserPresence, makeUser } = require("./users");
const njwt = require('njwt');
require('dotenv').config();
const signingKey = process.env.SECRET_KEY;

/**
 * Generate a JWT for the given id
 * @param {String} id 
 */
function getAuthToken (id) {
    const claims = {
      sub: id,
    }
    const token = njwt.create(claims,signingKey);
    token.setExpiration(new Date().getTime() + (60*60*1000));
    return token.compact();
}

/**
 * Validate given user credentials
 * @param {*} user 
 */
async function authenticate(user) {

    try{
        if (!user || !user.email) throw new ValidationError('email');
        if (!user.password) throw new ValidationError('password');

        const givenPassword = user.password;
        user = await checkUserPresence({email:user.email});
        let isMatch = await user.validatePassword(givenPassword)

        if (!isMatch)
            throw new Error();
        
        return {
            token: getAuthToken(user.id),
            user: makeUser(user)
        }
    }catch(err) {
        throw new NotAuthorizedError()
    }
    
}

async function activateAccount(activationCode){
    try{
        if (!activationCode) throw new ValidationError('activation code');
        let user = checkUserPresence({activationCode});
        if (!user) throw new ValidationError('activation code','code has expired');
        user.activationCode = null;
        user.save();

    }catch(err){
        throw await getError(err);
    }
}

module.exports = { authenticate, activateAccount, getAuthToken}