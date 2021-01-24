const { Order, Meal } = require("../database/models");
const { isValidMongooseId, queryDatabase } = require("../database");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { trimPrematureIds, makeItem } = require("./utils");
const { saveFiles, deleteFiles, getFilePath } = require("./files");
const meal = require("../database/models/meal");

/**
 * Add a new order to the database
 * @param {{meals: String[], amount: Number, user: String, paymentId: String}} order
 */
async function addOrder(order) {
  try {
    if (!order) throw new ValidationError("order");
    order = trimPrematureIds(order);
    const newOrder = await validateOrder(order,true);
    order = await newOrder.save();
    return { order: makeItem(order, ["id", "user", "meals", "amount"]) };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Validate the given order
 * @param {*} order
 */
async function validateOrder(order,final=false) {
  try {
    if (final) {
      if (!order.payment) throw new ValidationError("payment");
      if (!order.amount) throw new ValidationError("amount");
      if (!order.deliveryTime) throw new ValidationError("deliveryTime");
      if (!order.type) throw new ValidationError("type");
    }
    const newOrder = new Order(order);
    await newOrder.validate();
    return newOrder;
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Calculate gross total price for the meals with given ids
 * @param {String[]} mealIds
 */
async function calculateTotalAmount(mealIds) {
  if (!mealIds || !mealIds.length) throw new ValidationError("meals");
  const meals = await Meal.find({ id: mealIds });
  let mealPrices = {};
  meals.forEach((meal) => {
    mealPrices[meal.id] = meal.price;
  });
  return mealIds.reduce((s, id) => s + mealPrices[id], 0);
}

/**
 * Check if the order with the given parameters exists in the database
 * @param {object} query
 */
async function checkOrderPresence({ query, attributes = ["id"] }) {
  try {
    const exists = await queryDatabase({ model: Order, query, attributes });
    if (!exists || !exists.length) throw new NotFoundError("order");
    return exists;
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Get orders info from database
 * @param {String} id
 */
async function getOrders({
  attributes = ["id", "user", "meals", "delivered"],
  query = {},
}) {
  try {
    orders = await checkOrderPresence({ query, attributes });
    return {
      count: orders.length,
      data: orders.map((order) => makeItem(order, attributes)),
    };
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Remove order from the database
 * and order pictures from the disk
 * @param {String} id
 */
async function deleteOrder(id) {
  try {
    const order = await checkOrderPresence({ query: { id } });
    await Order.deleteOne({ id });
    deleteFiles(order.picture);
    return { id };
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = {
  getOrders,
  addOrder,
  deleteOrder,
  validateOrder,
  calculateTotalAmount,
};
