const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/DB_Clothing_Store");
    console.log("DB_Clothing_Store Connected");
  } catch (err) {
    // Error
    console.log(err);
  }
};

module.exports = connectDB;
