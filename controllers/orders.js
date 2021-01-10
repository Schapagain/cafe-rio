const { Order } = require("../database/models");
const { isValidMongooseId } = require('../database');
const { getError, ValidationError, NotFoundError } = require("./errors");
const { trimPrematureIds, makeItem } = require('./utils');
const { saveFiles, deleteFiles, getFilePath } = require("./files");

/**
 * Add a new order to the database
 * @param {*} order 
 */
async function addOrder(order) {
    try{

        if (!order) throw new ValidationError('order');
        order = trimPrematureIds(order);
        newOrder = new Order(order);
        order = await (await newOrder.save()).populate('user');
        
        return {order};
    }catch(err) {
        throw await getError(err);
    }
}

/**
 * Check if the order with the given parameters exists in the database
 * @param {object} query
 */
async function checkOrderPresence(query) {
    try{
        if (!query || (query.id && !isValidMongooseId(query.id))){
        throw new NotFoundError('order');
        }
        const exists = await Order.find(query).populate('user').populate('meals') ;
        if (!exists) throw new NotFoundError('order');
        return exists
    }catch(err){
        throw await getError(err);
    }
}

/**
 * Get orders info from database
 * @param {String} id
 */
async function getOrders({id=null,attributes=['id','user','meals','delivered'],queries={}}) {
    try{
        let orders =[];
        if (!id) {
            orders = 
            await 
            Order
            .find(queries)
            .populate('meals')
            .populate('user');
        }else {
            orders = await checkOrderPresence({id})
        }
        return {count:orders.length,data:cleanOrders(orders).map(order=>makeItem(order,attributes))};
    }catch(err) {
        throw await getError(err);
    }
    
}

/**
 * Remove extraneous keys from order, user, and each meals
 * @param {object[]} orders
 */
function cleanOrders(orders) {
    if (!orders) return [];
    return orders.map(order => {
        order = order.toObject();
        if (order.user) {
            order.user = makeItem(order.user,['id','name','phone','email']);
        }
        if (order.meals) {
            order.meals = order.meals.map(meal => makeItem(meal,['id','name','price','category']))
        }
        return order;
    })
}

/**
 * Remove order from the database
 * and order pictures from the disk
 * @param {String} id
 */
async function deleteOrder(id) {
    try {
      const order = await checkOrderPresence({id});
      await Order.deleteOne({id});
      deleteFiles(order.picture);
      return {id};
    } catch (err) {
      throw await getError(err);
    }
  }

module.exports = { getOrders, addOrder, deleteOrder}