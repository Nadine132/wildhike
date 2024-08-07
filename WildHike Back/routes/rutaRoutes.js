const express = require("express");
const passport = require("passport");
const {
  getAllRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
} = require("../controllers/RutaController");

const router = express.Router();

router.get("/", getAllRutas);
router.get("/:id", getRutaById);
router.post("/", passport.authenticate("jwt", { session: false }), createRuta);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateRuta
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteRuta
);

module.exports = router;
