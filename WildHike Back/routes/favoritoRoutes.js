const express = require("express");
const passport = require("passport");
const {
  getAllFavoritos,
  getFavoritoById,
  createFavorito,
  updateFavorito,
  deleteFavorito,
} = require("../controllers/FavoritoController");

const router = express.Router();

router.get("/", getAllFavoritos);
router.get("/:id", getFavoritoById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createFavorito
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateFavorito
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteFavorito
);

module.exports = router;
