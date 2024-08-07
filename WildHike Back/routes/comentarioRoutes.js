const express = require("express");
const passport = require("passport");
const {
  getAllComentarios,
  getComentarioById,
  createComentario,
  updateComentario,
  deleteComentario,
} = require("../controllers/ComentarioController");

const router = express.Router();

router.get("/", getAllComentarios); // Se debe usar getAllComentarios aquí
router.get("/:id", getComentarioById); // Ruta para obtener comentario por ID
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createComentario
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateComentario
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteComentario
);

module.exports = router;
