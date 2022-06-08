const { Router } = require("express");
const router = Router();

const indexRouter = require("./index.routes.js");
const productsRouter = require("./products.routes.js");

// Routes__________________________________________________
router.get("/", indexRouter);
router.get("/products", productsRouter);

module.exports = router;