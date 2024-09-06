const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", authenticateToken, authorizeAdmin, getAllUsers); // Solo los admin pueden ver todos los usuarios
router.get("/:id", authenticateToken, getUserById); // Cualquier usuario autenticado puede ver su propio perfil
router.post("/", createUser); // Crear usuario no requiere autenticación
router.put("/:id", authenticateToken, updateUser); // Solo un admin puede cambiar el rol de un usuario
router.delete("/:id", authenticateToken, authorizeAdmin, deleteUser); // Solo un admin puede eliminar un usuario

module.exports = router;
