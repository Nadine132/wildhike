const express = require("express");
const router = express.Router();
const ComentarioController = require("../controllers/ComentarioController");

// Rutas para los comentarios
router.get("/", ComentarioController.getAllComentarios);
router.get("/:id", ComentarioController.getComentarioById);
router.post("/", ComentarioController.createComentario);
router.put("/:id", ComentarioController.updateComentario);
router.delete("/:id", ComentarioController.deleteComentario);

module.exports = router;
