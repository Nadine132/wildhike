const express = require("express");
const router = express.Router();

const rutaController = require("../controllers/rutaController");

router.post("/rutas", rutaController.createRuta);
router.get("/rutas", rutaController.getAllRutas);
router.get("/rutas/:id", rutaController.getRutaById);
router.put("/rutas/:id", rutaController.updateRuta);
router.delete("/rutas/:id", rutaController.deleteRuta);

module.exports = router;
