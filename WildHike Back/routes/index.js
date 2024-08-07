const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const comentariosRoutes = require("./comentariosRoutes");
const favoritosRoutes = require("./favoritosRoutes");
const galeriaRoutes = require("./galeriaRoutes");
const rutasRoutes = require("./rutasRoutes");
const rutasRealizadasRoutes = require("./rutasRealizadasRoutes");
const usuariosRoutes = require("./usuariosRoutes");
const authRoutes = require("./authRoutes");

router.use("/auth", authRoutes);

router.use("/comentarios", authMiddleware, comentariosRoutes);
router.use("/favoritos", authMiddleware, favoritosRoutes);
router.use("/galeria", authMiddleware, galeriaRoutes);
router.use("/rutas", authMiddleware, rutasRoutes);
router.use("/rutas-realizadas", authMiddleware, rutasRealizadasRoutes);
router.use("/usuarios", authMiddleware, usuariosRoutes);

module.exports = router;
