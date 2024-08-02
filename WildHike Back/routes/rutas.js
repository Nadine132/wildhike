const express = require("express");
const router = express.Router();
const Ruta = require("../models/ruta");

/* Crear una nueva ruta */
router.post("/rutas", async (req, res) => {
  try {
    const ruta = await Ruta.create(req.body);
    res.status(201).json(ruta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Obtener todas las rutas */
router.get("/rutas", async (req, res) => {
  try {
    const rutas = await Ruta.findAll();
    res.json(rutas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Obtener una ruta por ID */
router.get("/rutas/:id", async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (ruta) {
      res.json(ruta);
    } else {
      res.status(404).json({ error: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Actualizar una ruta */
router.put("/rutas/:id", async (req, res) => {
  try {
    const [updated] = await Ruta.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRuta = await Ruta.findByPk(req.params.id);
      res.json(updatedRuta);
    } else {
      res.status(404).json({ error: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* Eliminar una ruta */
router.delete("/rutas/:id", async (req, res) => {
  try {
    const deleted = await Ruta.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
