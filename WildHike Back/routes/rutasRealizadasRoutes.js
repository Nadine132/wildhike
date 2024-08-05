const express = require("express");
const router = express.Router();
const rutasRealizadasController = require("../controllers/rutasRealizadasController");

router.post("/rutas-realizadas", rutasRealizadasController.createRutaRealizada);
router.get(
  "/rutas-realizadas/usuario/:usuario_id",
  rutasRealizadasController.getRutasRealizadasByUsuario
);
router.get(
  "/rutas-realizadas",
  rutasRealizadasController.getAllRutasRealizadas
);
router.delete(
  "/rutas-realizadas/:id",
  rutasRealizadasController.deleteRutaRealizada
);

module.exports = router;
