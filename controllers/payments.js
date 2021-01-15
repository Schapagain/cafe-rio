const stripe = require('stripe')(process.env.STRIPE_SECRET);

const { ValidationError } = require('./errors');
const public_key = "pk_test_51I8QurI5qzReycR9FSYytJ8iPoxfXFQwYObAZC0x8jXsHY6K6XOCZ8AtF6N8NDiDpPC58I090d88Q0i0Y4PudyZo00AFJEaifB";

async function createPaymentIntent({amount,currency = 'usd',customer}) {

    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer,
        payment_method_types: ['card'],
    });

    return paymentIntent;
}

async function makePayment({amount,currency='usd'}) {

    try {
        // Create new PaymentIntent with a PaymentMethod ID from the client.
        const intent = await stripe.paymentIntents.create({
          amount,
          currency,
          payment_method: paymentMethodId,
          error_on_requires_action: true,
          confirm: true
        });
        console.log("💰 Payment received!");
        return intent;
        // The payment is complete and the money has been moved
        // You can add any post-payment code here (e.g. shipping, fulfillment, etc)
    
        // Send the client secret to the client to use in the demo
      } catch (err) {
        // Handle "hard declines" e.g. insufficient funds, expired card, card authentication etc
        // See https://stripe.com/docs/declines/codes for more
        throw new ValidationError('card');
      }

}

module.exports = {
    createPaymentIntent,
    makePayment,
}