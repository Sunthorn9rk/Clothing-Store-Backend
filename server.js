const express = require("express");
require("dotenv").config();
// middleware
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");

// connect Database
const connectDB = require("./Config/db");

// Sync directory
const {readdirSync} = require("fs");

// เรียก express
const app = express();

// เรียกใช้การ connect to MongoDB
connectDB();

// middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({limit: "10mb"}));

// ทำ folder uploads ให้เป็น static folder เพื่อให้หน้าบ้าน ดึงรูปภาพไปใช้
app.use("/uploads", express.static("./uploads"));
app.use("/public", express.static("./public"));

// // เขียนลูปให้เข้าไปอ่าน route แต่ละอัน
readdirSync("./Routes").map((r) => app.use("", require("./Routes/" + r)));

app.listen(5000, () => console.log("Server Running on port 5000"));
