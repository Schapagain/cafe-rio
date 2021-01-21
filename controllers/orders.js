const { Order, Meal } = require("../database/models");
const { isValidMongooseId, queryDatabase } = require("../database");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { trimPrematureIds, makeItem } = require("./utils");
const { saveFiles, deleteFiles, getFilePath } = require("./files");
const { makePayment } = require("./payments");
const meal = require("../database/models/meal");

/**
 * Add a new order to the database
 * @param {*} order
 */
async function addOrder({ meals, user, cardId }) {
  try {
    let order = { meals, user };
    if (!order) throw new ValidationError("order");
    order = trimPrematureIds(order);
    console.log("before new order");
    newOrder = new Order(order);
    await newOrder.validate();

    const amount = await calculateTotalAmount(newOrder.meals);
    console.log("after new order");
    console.log("meals:", order.meals);
    console.log("total:", amount);
    const payment = await makePayment({ amount, cardId, currency: "usd" });
    console.log(payment);
    // order = await (await newOrder.save());

    return { order };
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
  return meals.reduce((s, meal) => s + meal.price, 0);
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

module.exports = { getOrders, addOrder, deleteOrder };
