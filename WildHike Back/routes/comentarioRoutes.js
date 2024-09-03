const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

// Obtener comentarios por ruta con paginación
router.get(
  "/rutas/:ruta_id/comentarios",
  comentarioController.getComentariosByRuta
);

// Crear un nuevo comentario
router.post("/comentarios", comentarioController.createComentario);

// Eliminar un comentario
router.delete("/comentarios/:id", comentarioController.deleteComentario);

module.exports = router;
