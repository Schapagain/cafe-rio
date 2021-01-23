const mongoose = require("mongoose");
const User = require("./user");
const Meal = require("./meal");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "user id is required",
    validate: {
      validator: async function (id) {
        const count = await User.countDocuments({ id });
        return count > 0;
      },
      message: "invalid user id",
    },
  },
  meals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Meal",
      required: "array of meal ids is required",
      validate: {
        validator: async function (id) {
          const count = await Meal.countDocuments({ id });
          return count > 0;
        },
        message: "Invalid array of meal ids",
      },
    },
  ],
  amount: {
    type: Number,
  },
  payment: {
    type: String,
    validate: {
      validator: verifyStripePaymentMethod,
      message: "Payment could not be verified",
    },
  },
  delivered: {
    type: Boolean,
    default: false,
  },
});

/**
 * save id before saving order
 */
OrderSchema.pre("save", async function (next) {
  let order = this;
  order.id = this._id;
  return next();
});

/**
 * Verify the given paymentId (payment method id)
 * @param {String} paymentId
 */
async function verifyStripePaymentMethod(paymentId) {
  try {
    if (!paymentId) return false;
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentId);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = Order = mongoose.model("Order", OrderSchema);
