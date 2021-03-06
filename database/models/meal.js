const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MealSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: 'Name of the meal is required',
        trim: true,
    },
    price: {
        type: Number,
        required: "Price of the meal is required",
    },
    category: {
        type: String,
        default: 'miscellaneous'
    },
    available: {
        type: Boolean,
        default: true,
    },
    picture: {
        type: String,
        default: "http://res.cloudinary.com/skyimages/image/upload/v1611431049/cafe-rio/default_meal.jpg" 
    }
});

/**
 * save id before saving meal
 */
MealSchema.pre('save',async function(next) {
    let meal = this;
    meal.id = this._id;
    return next();
})

module.exports = Meal = mongoose.model('Meal',MealSchema);