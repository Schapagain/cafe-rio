const { getAuthToken } = require("../utils/authorization");
const { ValidationError, getError, NotAuthorizedError } = require("./errors");
const { checkUserPresence, makeUser } = require("./users");


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

module.exports = { authenticate }