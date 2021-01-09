const { Meal } = require("../database/models");
const { isValidMongooseId } = require("../database");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { trimPrematureIds, makeItem } = require("./utils");
const { saveFiles, deleteFiles, getFilePath } = require("./files");

/**
 * Add new meal to the database
 * @param {*} meal
 */
async function addMeal(meal) {
  try {
    if (!meal) throw new ValidationError("meal");
    meal = trimPrematureIds(meal);
    meal = await saveMealPicture(meal);
    newMeal = new Meal(meal);
    meal = await newMeal.save();
    return { meal: makeItem(meal, ["id", "name", "price", "category"]) };
  } catch (err) {
    deleteFiles(meal.picture);
    throw await getError(err);
  }
}

async function saveMealPicture(meal) {
  if (meal.picture && typeof meal.picture == "object") {
    const pictureFileName = await saveFiles(meal.picture);
    meal.picture = pictureFileName;
  }
  return meal;
}

/**
 * Check if the meal with the given parameters exists in the database
 * @param {object} query
 */
async function checkMealPresence(query) {
  try {
    if (!query || (query.id && !isValidMongooseId(query.id))) {
      throw new NotFoundError("meal");
    }
    const exists = await Meal.findOne(query);
    if (!exists) throw new NotFoundError("meal");
    return exists;
  } catch (err) {
    throw await getError(err);
  }
}
/**
 * Get meals info from database
 * @param {String} id
 */
async function getMeals(
  id = null,
  attributes = ["id", "name", "category", "price"]
) {
  let meals = [];
  if (!id) {
    meals = await Meal.find();
  } else {
    meals = [await checkMealPresence({ id })];
  }
  return {
    count: meals.length,
    data: meals.map((meal) => makeItem(meal, attributes)),
  };
}

/**
 * Returns file path for the meal's picture
 * @param {String} id
 */
async function getPicture(id) {
  try {
    let meal = await checkMealPresence({ id });
    let filePath = await getFilePath(meal.picture);
    return filePath;
  } catch (err) {
    throw await getError(err);
  }
}

/**
 * Remove meal from the database
 * and meal pictures from the disk
 * @param {String} id
 */
async function deleteMeal(id) {
  try {
    const meal = await checkMealPresence({ id });
    await Meal.deleteOne({ id });
    deleteFiles(meal.picture);
    return { id };
  } catch (err) {
    throw await getError(err);
  }
}

module.exports = { getMeals, addMeal, getPicture, deleteMeal };
