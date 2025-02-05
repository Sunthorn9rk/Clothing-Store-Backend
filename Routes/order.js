const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Product = require("../Models/Products");
const Order = require("../Models/Order");

router.post("/orders", async (req, res) => {
  const {products, userId} = req.body;
  try {
    const lineItems = await Promise.all(
      products.map(async (product) => {
        const item = await Product.findOne({id: product.id});

        if (!item) {
          throw new Error(`Product with id ${product.id} not found`);
        }

        return {
          price_data: {
            currency: "thb",
            product_data: {
              name: item.name,
              metadata: {
                color: product.selectedColor,
                size: product.selectedSize,
              },
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: product.quantity,
        };
      })
    );

    const totalAmount = await Promise.all(
      products.map(async (product) => {
        const item = await Product.findOne({id: product.id});
        if (!item) {
          throw new Error(`Product with id ${product.id} not found`);
        }
        return item.price * product.quantity;
      })
    ).then((amounts) => amounts.reduce((total, amount) => total + amount, 0));

    const session = await stripe.checkout.sessions.create({
      shipping_address_collection: {allowed_countries: ["TH"]},
      payment_method_types: ["card"],
      mode: "payment",
      success_url: process.env.CLIENT_URL + `/success`,
      cancel_url: process.env.CLIENT_URL + "/failed",
      line_items: lineItems,
    });

    await Order.create({
      products: products.map((product) => ({
        product: product.id,
        color: product.selectedColor,
        size: product.selectedSize,
        quantity: product.quantity,
      })),
      stripeId: session.id,
      totalAmount,
      user: userId,
    });

    res.json({stripeSession: session});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
});

module.exports = router;
