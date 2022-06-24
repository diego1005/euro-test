const express = require("express");
const router = express.Router();

const productsController = require("../controller/productsController");

// Routes /products/...

//Mostrar lista de movimientos filtrada
router.post("/detail", productsController.detail);
//Agregar nuevo movimiento
router.post("/add", productsController.add);
//Cargar la vista de edicion
router.get("/edit/:id", productsController.edit);
//Actualizar el movimiento
router.put("/edit", productsController.update);
//Eliminar un movimiento
router.delete("/delete/:id", productsController.delete);

module.exports = router;