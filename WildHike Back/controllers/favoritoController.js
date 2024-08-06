const { Favorito } = require("../models");

// Obtener todos los favoritos
exports.getAllFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un favorito por ID
exports.getFavoritoById = async (req, res) => {
  try {
    const favorito = await Favorito.findByPk(req.params.id);
    if (favorito) {
      res.status(200).json(favorito);
    } else {
      res.status(404).json({ message: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo favorito
exports.createFavorito = async (req, res) => {
  try {
    const { usuario_id, ruta_id } = req.body;
    const newFavorito = await Favorito.create({ usuario_id, ruta_id });
    res.status(201).json(newFavorito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un favorito por ID
exports.updateFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Favorito.update(req.body, { where: { id } });
    if (updated) {
      const updatedFavorito = await Favorito.findByPk(id);
      res.status(200).json(updatedFavorito);
    } else {
      res.status(404).json({ message: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un favorito por ID
exports.deleteFavorito = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Favorito.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
