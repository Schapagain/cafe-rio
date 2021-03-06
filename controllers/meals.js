const { Meal } = require("../database/models");
const { isValidMongooseId } = require("../database");
const { getError, ValidationError, NotFoundError } = require("./errors");
const { trimPrematureIds, makeItem } = require("./utils");
const { saveFiles, deleteFiles, updateFile } = require("./files");

/**
 * Add a new meal to the database
 * @param {*} meal
 */
async function addMeal(meal) {
  try {
    if (!meal) throw new ValidationError("meal");
    meal = trimPrematureIds(meal);
    meal = await saveMealPicture(meal);
    newMeal = new Meal(meal);
    meal = await newMeal.save();
    return { meal: makeItem(meal, ["id", "name", "price", "category","picture"]) };
  } catch (err) {
    deleteFiles(meal.picture);
    throw await getError(err);
  }
}

/**
 * Update given properties for the meal
 * @param {*} meal
 */
async function updateMeal(meal) {
  try {
    if (!meal) throw new ValidationError("meal");
    const oldMeal = await checkMealPresence({ id: meal.id });
    meal = trimPrematureIds(meal);
    meal.picture = await updateMealPicture(oldMeal.picture,meal.picture); 

    // update key values
    const keysToUpdate = Object.keys(meal);
    keysToUpdate.forEach((key) => {
      oldMeal[key] = meal[key];
    });
    meal = await oldMeal.save();
    return {
      meal: makeItem(meal, [
        "id",
        "name",
        "price",
        "category",
        ...keysToUpdate,
      ]),
    };
  } catch (err) {
    deleteFiles(meal.picture);
    throw await getError(err);
  }
}

/**
 * If a picture is provided, move it to storage
 * @param {*} meal
 */
async function saveMealPicture(meal) {
  if (meal.picture && typeof meal.picture == "object") {
    const pictureFileName = await saveFiles(meal.picture);
    meal.picture = pictureFileName;
  }
  return meal;
}

/**
 * replace the file at oldPictureUrl with the newPicture
 * return url to the updated picture 
 * @param {String} oldPictureUrl 
 * @param {File} newPicture 
 */
async function updateMealPicture(oldPictureUrl,newPicture) {
  if (newPicture && typeof newPicture == "object") {
    oldPictureUrl = updateFile(newPicture,oldPictureUrl);
  }
  return oldPictureUrl;
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
  attributes = ["id", "name", "category", "price","picture"]
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

module.exports = { getMeals, addMeal, updateMeal, deleteMeal };
