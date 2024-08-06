const { Galeria } = require("../models");

// Obtener todas las imágenes de la galería
exports.getAllGalerias = async (req, res) => {
  try {
    const galerias = await Galeria.findAll();
    res.status(200).json(galerias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una imagen de la galería por ID
exports.getGaleriaById = async (req, res) => {
  try {
    const galeria = await Galeria.findByPk(req.params.id);
    if (galeria) {
      res.status(200).json(galeria);
    } else {
      res.status(404).json({ message: "Galería no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva imagen en la galería
exports.createGaleria = async (req, res) => {
  try {
    const { ruta_id, url_imagen, fechaSubida } = req.body;
    const newGaleria = await Galeria.create({
      ruta_id,
      url_imagen,
      fechaSubida,
    });
    res.status(201).json(newGaleria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una imagen de la galería por ID
exports.updateGaleria = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Galeria.update(req.body, { where: { id } });
    if (updated) {
      const updatedGaleria = await Galeria.findByPk(id);
      res.status(200).json(updatedGaleria);
    } else {
      res.status(404).json({ message: "Galería no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una imagen de la galería por ID
exports.deleteGaleria = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Galeria.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Galería no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
