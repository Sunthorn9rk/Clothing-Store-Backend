const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Order = require("../Models/Order");

router.post(
  "/webhook",
  express.raw({type: "application/json"}),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        await Order.findOneAndUpdate(
          {stripeId: session.id},
          {status: "success"}
        );
      } catch (err) {
        console.error(`Failed to update order status: ${err.message}`);
        return res.status(500).send(`Server Error: ${err.message}`);
      }
    } else if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object;

      try {
        await Order.findOneAndUpdate(
          {stripeId: session.id},
          {status: "failed"}
        );
      } catch (err) {
        console.error(`Failed to update order status: ${err.message}`);
        return res.status(500).send(`Server Error: ${err.message}`);
      }
    }

    res.status(200).json({received: true});
  }
);

module.exports = router;
