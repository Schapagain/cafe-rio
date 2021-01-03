const express = require("express");
const router = express.Router();


// Import the user model
const { User } = require("../../database/models");
const formParser = require("../../middlewares/formParser");
const { signupUser, deleteUser, getUsers } = require("../../controllers/users");

/**
 * Route to fetch all users
 * @name api/users
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/", formParser, async (req, res) => {
 
  try{
    const result = await getUsers();
    res.status(200).json(result);
  }catch(err) {
    res.status(httpCode || 500).json({
      error: {
        msg: err.message
      }
    })
  }
  
});

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
router.post("/signup", formParser, async (req, res) => {
  try {
    const result = await signupUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    return res.status(err.httpCode || 500).json({
      error: {
        field: err.field,
        msg: err.message
      }
    });
  }
});

/**
 * Route to fetch user details
 * @name api/users/:id
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id", formParser, async (req, res) => {
  try{
    const result = await getUsers(req.params.id);
    res.status(200).json(result);
  }catch(err){
    return res.status(err.httpCode || 500).json({
      error: err.message
    })
  }
});

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
router.delete("/:id", formParser, async (req, res) => {
  try {
    const result = await deleteUser(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    return res.status(err.httpCode || 500 ).json({
      error: err.message
    });
  }
});

module.exports = router;
