const express = require("express");
const router = express.Router();

const formParser = require("../../middlewares/formParser");
const { signupUser, deleteUser, getUsers, getIdCard } = require("../../controllers/users");

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
    res.status(201).json(result);
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
 * @method GET
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id", formParser, async (req, res) => {
  try{
    let result = await getUsers(req.params.id);
    res.status(200).json(result);
  }catch(err){
    return res.status(err.httpCode || 500).json({
      error: err.message
    })
  }
});

/**
 * Route to fetch user idCard
 * @name api/users/:id/id_card
 * @method Get
 * @access Public
 * @param {string} path
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id/id_card", async (req,res) => {
  try{
    const idPath = await getIdCard(req.params.id);
    res.status(200).sendFile(idPath,{root:'.'});
  }catch(err) {
    return res.status(err.httpCode ||500).json({
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
