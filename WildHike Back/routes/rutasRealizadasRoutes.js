const express = require("express");
const passport = require("passport");
const {
  getAllRutasRealizadas,
  getRutasRealizadasById,
  createRutasRealizadas,
  updateRutasRealizadas,
  deleteRutasRealizadas,
} = require("../controllers/RutasRealizadasController");

const router = express.Router();

router.get("/", getAllRutasRealizadas);
router.get("/:id", getRutasRealizadasById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createRutasRealizadas
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRutasRealizadas
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRutasRealizadas
);

module.exports = router;
