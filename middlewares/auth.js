const njwt = require('njwt');
require('dotenv').config();
const { ValidationError } = require('../controllers/errors')
const signingKey = process.env.SECRET_KEY;

const auth = async (req,res,next) => {
    try{
        // Get token from the header
        const userToken = req.header('authorization');
        if (!userToken) throw new NotFoundError('token')

        // Verify token and extract user id
        const token = njwt.verify(userToken,signingKey);
        const tokenId = token.body.sub;

        // Inject userId into req before proceeding
        req.auth = {
            id: tokenId
        }
        next();
    }catch(err){
        throw new ValidationError('token');
    }
}

module.exports = auth;