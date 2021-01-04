const express = require("express");
const router = express.Router();

const formParser = require("../../middlewares/formParser");
const { authenticate, activateAccount } = require('../../controllers/auth');
const appAddress = 'https://cafe-rio.netlify.app/activate'

/**
 * Route to active account
 * @name api/auth/activate
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param   {callback} middleware - Handle HTTP response
 */
router.get("/activate/:activationCode", async (req, res) => {

  try {
    await activateAccount(req.params.activationCode);
    res.redirect(appAddress);
  } catch (err) {
    res.status(err.httpCode || 500).json({ error: err.message });
  }
});

/**
 * Route to authenticate credentials
 * @name api/auth
 * @method POST
 * @access Public
 * @inner
 * @param {string} path
 * @param {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/", formParser, async (req, res) => {

  try {
    const result = await authenticate(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.httpCode || 500).json({ error: err.message });
  }
});

module.exports = router;
