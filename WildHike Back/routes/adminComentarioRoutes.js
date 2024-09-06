const express = require("express");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  getAllComentarios,
  deleteComentarioById,
} = require("../controllers/adminComentarioController");
const router = express.Router();

// Obtener todos los comentarios
router.get("/", authenticateToken, authorizeAdmin, getAllComentarios);

// Eliminar un comentario
router.delete("/:id", authenticateToken, authorizeAdmin, deleteComentarioById);

module.exports = router;
