const { Comentario } = require("../config/database");

exports.createComentario = async (req, res) => {
  try {
    const comentario = await Comentario.create(req.body);
    res.status(201).json(comentario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComentarioById = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (comentario) {
      res.status(200).json(comentario);
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateComentario = async (req, res) => {
  try {
    const [updated] = await Comentario.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedComentario = await Comentario.findByPk(req.params.id);
      res.status(200).json(updatedComentario);
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteComentario = async (req, res) => {
  try {
    const deleted = await Comentario.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
