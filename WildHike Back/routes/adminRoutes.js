const express = require("express");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const router = express.Router();

router.get("/", authorizeAdmin, (req, res) => {
  res.json({ message: "Bienvenido al panel de administración" });
});

module.exports = router;
