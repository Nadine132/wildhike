const express = require("express");
const router = express.Router();
const galeriaController = require("../controllers/galeriaController");

router.post("/images", galeriaController.createImage);
router.get("/images/ruta/:ruta_id", galeriaController.getImagesByRuta);
router.get("/images", galeriaController.getAllImages);
router.delete("/images/:id", galeriaController.deleteImage);

module.exports = router;
