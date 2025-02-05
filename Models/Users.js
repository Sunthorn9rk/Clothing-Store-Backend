const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    id: {
      type: Number,
    },
    name: String,
    email: String,
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    picture: {
      type: String,
      default: "no-profile.jpg",
    },
    ip: {
      type: String,
      default: "-",
    },
  },
  {timestamps: true}
);

module.exports = mongoose.model("Users", userSchema);
