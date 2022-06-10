const express = require("express");
const router = express.Router();

const productsController = require("../controller/productsController");

router.post("/detail", productsController.detail);
router.post("/add", productsController.add);
router.get("/delete/:id/:title", productsController.delete);

module.exports = router;