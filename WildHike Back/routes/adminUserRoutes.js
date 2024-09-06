const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const {
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/adminUserController");
const router = express.Router();

// Obtener todos los usuarios
router.get("/", authenticateToken, authorizeAdmin, getAllUsers);

// Modificar un usuario
router.put("/:id", authenticateToken, authorizeAdmin, updateUser);

// Eliminar un usuario
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser);

module.exports = router;
