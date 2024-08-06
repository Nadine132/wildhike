const express = require("express");
const router = express.Router();
const GaleriaController = require("../controllers/GaleriaController");

// Rutas para la galería
router.get("/", GaleriaController.getAllGalerias);
router.get("/:id", GaleriaController.getGaleriaById);
router.post("/", GaleriaController.createGaleria);
router.put("/:id", GaleriaController.updateGaleria);
router.delete("/:id", GaleriaController.deleteGaleria);

module.exports = router;
