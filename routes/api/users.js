
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { getAuthToken } = require('../../utils/authorization');

// Import the user model
const User = require('../../models/user');
const { getCleanUsers } = require('../../utils/users');

// @route   POST api/users
// @desc    Add a new user
// @access  Public
router.post('/', async (req,res) => {

    let {name,email,password} = req.body;

    // Check if all fields are given
    if (!name || !email || !password){
        return res.status(400).json({
            error: "Please provide all required user properties"
        })
    }

    try{
        // Check if the user already exists
        let oldUser = await User.findOne({ email })
        if (oldUser) {
            return res.status(400).json({
                error: "Email has already been registered"
            })
        }

        // Save user with a hashed password
        password = await generatePasswordHash(password);
        let newUser = new User({name,email,password});
        let user = await newUser.save();

        // Clean up User and assign token before sending the user back
        const token = getAuthToken(user.id);
        user = getCleanUsers(user).pop();
        res.status(200).json({
            user,
            token,
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error: 'Could not add a new user. Try again later.'
        })
    }
})

const generatePasswordHash = async passwordPlain => {
    try{
        const saltRounds = 5;
        const passwordHash = await bcrypt.hash(passwordPlain, saltRounds);
        return passwordHash;
    }
    catch(err){
        throw err;
    }
}
module.exports = router;