const express = require("express");
const router = express.Router();
const RutasRealizadasController = require("../controllers/RutasRealizadasController");

// Rutas para las rutas realizadas
router.get("/", RutasRealizadasController.getAllRutasRealizadas);
router.get("/:id", RutasRealizadasController.getRutasRealizadasById);
router.post("/", RutasRealizadasController.createRutasRealizadas);
router.put("/:id", RutasRealizadasController.updateRutasRealizadas);
router.delete("/:id", RutasRealizadasController.deleteRutasRealizadas);

module.exports = router;
