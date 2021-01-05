const njwt = require('njwt');
require('dotenv').config();
const signingKey = process.env.SECRET_KEY;
const { getError, ValidationError, NotAuthorizedError } = require('../controllers/errors');
const { getValidAuthMethods } = require('../controllers/auth');

const { ADMIN } = require('../controllers/roles');

/**
 * Verify that the role and id associated with the token 
 * is allowed to access the attempted route
 * @param {String[]} allowedRoles 
 */
function auth(allowedRoles) {
    return async function (req,res,next) {
        
        try{
            // Get token from the header
            const [authMethod,userToken] = req.header('authorization') 
            ? req.header('authorization').split(' ') 
            : ['',''];

            // ensure existence of auth method and token in correct format
            if (!userToken && !authMethod) throw new ValidationError('token')
            const methodIsValid = getValidAuthMethods().includes(authMethod.toLowerCase());
            if (!authMethod || !methodIsValid) throw new ValidationError('token','auth format not supported');
            if (!userToken) throw new ValidationError('token');

            // Verify token and extract user id
            const token = njwt.verify(userToken,signingKey);
            const tokenId = token.body.sub;
            const tokenRole = token.body.scope;

            if (!allowedRoles.includes(tokenRole))
                throw new NotAuthorizedError('No access');

            // Restrict cross user access
            if (tokenRole != ADMIN && req.params.id && (tokenId != req.params.id))
                throw new NotAuthorizedError('Private route');

            // Inject userId into req before proceeding
            req.auth = {
                id: tokenId,
                role: tokenRole
            }
            next();
        }catch(err){
            next(await getError(err))
        }
    }
}

module.exports = auth;