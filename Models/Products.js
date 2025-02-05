const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: String,
    category: String,
    detail: {
      type: String,
    },
    originalPrice: {
      type: Number,
    },
    price: {
      type: Number,
    },
    colors: [
      {
        color: {type: String, required: true},
        enabled: {type: Boolean, required: true},
      },
    ],
    sizes: [
      {
        size: {type: String, required: true},
        enabled: {type: Boolean, required: true},
      },
    ],
    files: {
      type: [String],
      default: ["no-image.jpg"],
    },
    sale_amount: {
      type: Number,
      default: 0,
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("products", productSchema);
