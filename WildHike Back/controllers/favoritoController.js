const { Favorito, Ruta } = require("../models");

// Obtener todos los favoritos
exports.getAllFavoritos = async (req, res) => {
  try {
    const whereClause = req.query.usuario_id
      ? { where: { usuario_id: req.query.usuario_id } }
      : {};
    const favoritos = await Favorito.findAll(whereClause);
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los favoritos de un usuario específico
exports.getFavoritosByUserId = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const favoritos = await Favorito.findAll({
      where: { usuario_id },
      include: {
        model: Ruta,
        as: "ruta",
      },
    });
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.createFavorito = async (req, res) => {
  try {
    const { usuario_id, ruta_id } = req.body;

    const existingFavorito = await Favorito.findOne({
      where: { usuario_id, ruta_id },
    });
    if (existingFavorito) {
      return res.status(409).json({ message: "Este favorito ya existe." });
    }

    const newFavorito = await Favorito.create({ usuario_id, ruta_id });
    res.status(201).json(newFavorito);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

exports.getFavoritoByUserAndRuta = async (req, res) => {
  try {
    const { usuario_id, ruta_id } = req.query;
    const favorito = await Favorito.findOne({ where: { usuario_id, ruta_id } });

    if (favorito) {
      res.status(200).json(favorito);
    } else {
      res.status(404).json({ message: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
