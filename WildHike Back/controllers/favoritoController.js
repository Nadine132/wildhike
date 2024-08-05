const { Favorito } = require("../config/database");

exports.createFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.create(req.body);
    res.status(201).json(favorito);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFavoritoById = async (req, res) => {
  try {
    const favorito = await Favorito.findByPk(req.params.id);
    if (favorito) {
      res.status(200).json(favorito);
    } else {
      res.status(404).json({ error: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFavorito = async (req, res) => {
  try {
    const [updated] = await Favorito.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedFavorito = await Favorito.findByPk(req.params.id);
      res.status(200).json(updatedFavorito);
    } else {
      res.status(404).json({ error: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteFavorito = async (req, res) => {
  try {
    const deleted = await Favorito.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Favorito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
