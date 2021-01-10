const mongoose = require('mongoose');
const User = require('./user');
const Meal = require('./meal');

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'user id is required',
        validate: {
            validator: async function(id) {
                const count = await User.countDocuments({id})
                return (count > 0);
            },
            message: 'invalid user id'
        }
    },
    meals: [{
        type: Schema.Types.ObjectId,
        ref: 'Meal',
        required: 'array of meal ids is required',
        validate: {
            validator: async function(id) {
                const count = await Meal.countDocuments({id});
                return count > 0
            },
            message: 'Invalid array of meal ids'
        }
    }],
    delivered: {
        type: Boolean,
        default: false,
    }
});

/**
 * save id before saving order
 */
OrderSchema.pre('save',async function(next) {
    let order = this;
    order.id = this._id;
    return next();
})

module.exports = Order = mongoose.model('Order',OrderSchema);