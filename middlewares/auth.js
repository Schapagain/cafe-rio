const njwt = require('njwt');
require('dotenv').config();
const signingKey = process.env.SECRET_KEY;

const auth = (req,res,next) => {
    try{
        // Get token from the header
        const userToken = req.header('authorization');
        if (!userToken) throw new Error("No token found");

        // Verify token and extract user id
        const token = njwt.verify(userToken,signingKey);
        const tokenId = token.body.sub;

        // Inject userId into req before proceeding
        req.id = tokenId;
        next();
    }catch(err){
        return res.status(401).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = auth;