const express = require("express");
const router = express.Router();
const RutaController = require("../controllers/RutaController");

// Rutas para las rutas
router.get("/", RutaController.getAllRutas);
router.get("/:id", RutaController.getRutaById);
router.post("/", RutaController.createRuta);
router.put("/:id", RutaController.updateRuta);
router.delete("/:id", RutaController.deleteRuta);

module.exports = router;
