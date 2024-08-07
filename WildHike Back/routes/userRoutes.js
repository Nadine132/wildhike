const express = require("express");
const passport = require("passport");
const authorize = require("../middlewares/authorize");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");

const router = express.Router();

// Rutas accesibles para todos los usuarios autenticados (solo lectura)
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  getAllUsers
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  getUserById
);

// Rutas para crear, actualizar y eliminar usuarios (solo para admins)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  createUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  updateUser
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("admin"),
  deleteUser
);

module.exports = router;
