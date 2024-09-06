const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");
const authenticateToken = require("../middlewares/authMiddleware"); // Middleware de autenticación

// Obtener comentarios por ruta con paginación (no requiere autenticación)
router.get(
  "/rutas/:ruta_id/comentarios",
  comentarioController.getComentariosByRuta
);

// Crear un nuevo comentario (recomendable autenticar para usuarios logueados)
router.post(
  "/comentarios",
  authenticateToken,
  comentarioController.createComentario
);

// Eliminar un comentario (requiere autenticación)
router.delete(
  "/comentarios/:id",
  authenticateToken,
  comentarioController.deleteComentario
);

module.exports = router;
