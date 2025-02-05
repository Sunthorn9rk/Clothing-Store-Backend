const express = require("express");
const router = express.Router();

const {
  register,
  login,
  currentUser,
  loginLine,
  loginFacebook,
} = require("../Controllers/auth");

const {auth, adminCheck} = require("../Middleware/auth");

// http://localhost:5000/register
router.post("/register", register);

router.post("/login", login);

router.post("/login-line", loginLine);

router.post("/login-facebook", loginFacebook);

// check role user
// ใส่ middleware auth ในการนำtoken มาเช็คก่อนผ่านเข้าไป
router.post("/current-user", auth, currentUser);

// check role admin
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;
