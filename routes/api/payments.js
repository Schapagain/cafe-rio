
const express = require("express");
const router = express.Router();

const auth = require('../../middlewares/auth');
const formParser = require("../../middlewares/formParser");
const { getOrders, addOrder, deleteOrder, confirmOrder} = require("../../controllers/orders");
const { ADMIN, CUSTOMER } = require("../../controllers/roles");


/**
 * Route to add a new order
 * @name api/orders
 * @method POST
 * @access Public 
 * @inner
 * @param {string} path
 * @param   {callback} middleware - Form Parser
 * @param   {callback} middleware - Handle HTTP response
 */
router.post("/confirm", async (req, res) => {
 
    try{
      const result = await confirmOrder(req.body);
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