const express = require("express");
const {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
  getRutasByProvincia,
} = require("../controllers/rutaController");

const router = express.Router();

// Rutas específicas
router.get("/provincia/:provincia", getRutasByProvincia);
router.get("/:id", getRutaById);

// Rutas generales
router.get("/", getAllRutas);
router.post("/", createRuta);
router.put("/:id", updateRuta);
router.delete("/:id", deleteRuta);

module.exports = router;
