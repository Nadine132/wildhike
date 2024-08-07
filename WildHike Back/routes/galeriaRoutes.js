const express = require("express");
const passport = require("passport");
const {
  getAllGalerias,
  getGaleriaById,
  createGaleria,
  updateGaleria,
  deleteGaleria,
} = require("../controllers/GaleriaController");

const router = express.Router();

router.get("/", getAllGalerias);
router.get("/:id", getGaleriaById);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  createGaleria
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  updateGaleria
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  deleteGaleria
);

module.exports = router;
