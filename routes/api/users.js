
const express = require('express');
const router = express.Router();
const { getAuthToken } = require('../../utils/authorization');

// Import the user model
const { User } = require('../../database/models');
const formParser = require('../../middlewares/formParser');
const { signupUser, deleteUser } = require('../../controllers/users');

/**
 * Route to sigup a user
 * @name    api/users/signup
 * @method  POST
 * @access  Public
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Form Parser  
 * @param   {callback} middleware - Handle HTTP response
*/
router.post('/signup', formParser, async (req,res) => {
    try{
        const result = await signupUser(req.body);
        res.status(200).json(result);
    }
    catch(err){
        return res.status(err.httpCode || 500).json({
            field: err.field,
            error: err.message
        })
    }
})

/**
 * Route to delete a user
 * @name    api/users
 * @method  DELETE
 * @access  Public
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Form Parser  
 * @param   {callback} middleware - Handle HTTP response
*/
router.delete('/', formParser, async (req,res) => {
    try{
        const result = await deleteUser(req.body);
        res.status(200).json(result);
    }
    catch(err){
        return res.status(500).json({
            error: 'Could not delete user. Try again later.'
        })
    }
})

module.exports = router;