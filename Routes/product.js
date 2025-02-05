const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove,
  listby,
} = require("../Controllers/product");

// middleware
const {auth} = require("../Middleware/auth");
const {upload} = require("../Middleware/upload");

router.get("/products", list);

router.get("/product/:id", read);

router.post("/productby", listby);

router.post("/product", upload, create);

router.put("/product/:id", upload, update);

router.delete("/product/:id", remove);

module.exports = router;
