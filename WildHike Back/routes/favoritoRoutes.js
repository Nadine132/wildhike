const express = require("express");
const router = express.Router();
const favoritoController = require("../controllers/favoritoController");

router.post("/favoritos", favoritoController.createFavorito);
router.get("/favoritos", favoritoController.getAllFavoritos);
router.get("/favoritos/:id", favoritoController.getFavoritoById);
router.put("/favoritos/:id", favoritoController.updateFavorito);
router.delete("/favoritos/:id", favoritoController.deleteFavorito);

module.exports = router;
