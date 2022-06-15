const express = require("express");
const router = express.Router();

const productsController = require("../controller/productsController");

router.post("/detail", productsController.detail);
router.post("/add", productsController.add);
router.get("/delete/:id/:title", productsController.delete);
router.get("/edit/:id/:title", productsController.edit);
router.post("/edit", productsController.update);

module.exports = router;