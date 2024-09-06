const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const {
  getAllRutas,
  createRuta,
  updateRuta,
  deleteRuta,
} = require("../controllers/adminRutaController");
const router = express.Router();

// Obtener todas las rutas
router.get("/", authenticateToken, authorizeAdmin, getAllRutas);

// Crear una nueva ruta
router.post("/", authenticateToken, authorizeAdmin, createRuta);

// Modificar una ruta existente
router.put("/:id", authenticateToken, authorizeAdmin, updateRuta);

// Eliminar una ruta
router.delete("/:id", authenticateToken, authorizeAdmin, deleteRuta);

module.exports = router;
