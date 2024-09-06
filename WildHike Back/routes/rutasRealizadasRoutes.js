// routes/rutasRealizadasRoutes.js
const express = require("express");
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
router.post("/", createRutasRealizadas);
router.put("/:id", updateRutasRealizadas);
router.delete("/:id", deleteRutasRealizadas);

module.exports = router;
