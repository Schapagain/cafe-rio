const express = require("express");
const router = express.Router();

const formParser = require("../../middlewares/formParser");
const { authenticate } = require('../../controllers/auth');


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
