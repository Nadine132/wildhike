const express = require("express");
const router = express.Router();
const FavoritoController = require("../controllers/FavoritoController");

// Rutas para los favoritos
router.get("/", FavoritoController.getAllFavoritos);
router.get("/:id", FavoritoController.getFavoritoById);
router.post("/", FavoritoController.createFavorito);
router.put("/:id", FavoritoController.updateFavorito);
router.delete("/:id", FavoritoController.deleteFavorito);

module.exports = router;
