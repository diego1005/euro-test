const express = require("express");
const router = express.Router();

const productsController = require("../controller/productsController");

router.get("/detail", productsController.detail);

module.exports = router;