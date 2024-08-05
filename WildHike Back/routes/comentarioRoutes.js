const express = require("express");
const router = express.Router();
const comentarioController = require("../controllers/comentarioController");

router.post("/comentarios", comentarioController.createComentario);
router.get("/comentarios", comentarioController.getAllComentarios);
router.get("/comentarios/:id", comentarioController.getComentarioById);
router.put("/comentarios/:id", comentarioController.updateComentario);
router.delete("/comentarios/:id", comentarioController.deleteComentario);

module.exports = router;
