const express = require("express");
const router = express.Router();

const auth = require('../../middlewares/auth');
const formParser = require("../../middlewares/formParser");
const { getMeals, addMeal, getPicture, deleteMeal } = require("../../controllers/meals");
const { ADMIN } = require("../../controllers/roles");

/**
 * Route to fetch all meals
 * @name api/meals
 * @method GET
 * @access Public 
 * @inner
 * @param {string} path
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/", async (req, res) => {
 
  try{
    const result = await getMeals();
    res.status(200).json(result);
  }catch(err) {
    res.status(err.httpCode || 500).json({
      error: {
        msg: err.message
      }
    })
  }
});

/**
 * Route to add a new meal
 * @name api/meals
 * @method POST
 * @access Admin 
 * @inner
 * @param {string} path
 * @param   {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/",auth([ADMIN]), formParser, async (req, res) => {
 
    try{
      const result = await addMeal(req.body);
      res.status(201).json(result);
    }catch(err) {
      res.status(err.httpCode || 500).json({
        error: {
            field:err.field,
            msg: err.message
        }
      })
    }
  });

/**
 * Route to fetch meal details
 * @name api/meals/:id
 * @method GET
 * @access Public
 * @inner
 * @param {string} path
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id", async (req, res) => {
  try{
    let result = await getMeals(req.params.id);
    res.status(200).json(result);
  }catch(err){
    return res.status(err.httpCode || 500).json({
      error: {msg:err.message}
    })
  }
});

/**
 * Route to fetch meal picture
 * @name api/meals/:id/picture
 * @method Get
 * @access Public
 * @param {string} path
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/:id/picture", async (req,res) => {
  try{
    const idPath = await getPicture(req.params.id);
    res.status(200).sendFile(idPath,{root:'.'});
  }catch(err) {
    return res.status(err.httpCode ||500).json({
      error: {msg:err.message}
    })
  }
})

/**
 * Route to delete a meal
 * @name    api/meals/:id
 * @method  DELETE
 * @access  Admin
 * @inner
 * @param   {string} path
 * @param   {callback} middleware - Authenticate
 * @param   {callback} middleware - Handle HTTP response
 */
router.delete("/:id", auth([ADMIN]), async (req, res) => {
  try {
    const result = await deleteMeal(req.params.id);
    res.status(200).json(result);
  } catch (err) {
    return res.status(err.httpCode || 500 ).json({
      error: {msg:err.message}
    });
  }
});

module.exports = router;
