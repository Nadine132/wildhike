const express = require("express");
const {
  getAllFavoritos,
  createFavorito,
  updateFavorito,
  deleteFavorito,
  getFavoritoByUserAndRuta,
  getFavoritosByUserId,
} = require("../controllers/favoritoController");

const router = express.Router();

// Obtener todos los favoritos
router.get("/", getAllFavoritos);

// Obtener todos los favoritos de un usuario específico
router.get("/usuario/:usuario_id", getFavoritosByUserId); // Nueva ruta

// Crear un nuevo favorito
router.post("/", createFavorito);

// Actualizar un favorito por ID
router.put("/:id", updateFavorito);

// Eliminar un favorito por ID
router.delete("/:id", deleteFavorito);

// Obtener favorito por usuario y ruta específicos
router.get("/buscar", getFavoritoByUserAndRuta);

module.exports = router;
