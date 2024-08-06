const { Comentario } = require("../models");

// Obtener todos los comentarios
exports.getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll();
    res.status(200).json(comentarios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un comentario por ID
exports.getComentarioById = async (req, res) => {
  try {
    const comentario = await Comentario.findByPk(req.params.id);
    if (comentario) {
      res.status(200).json(comentario);
    } else {
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo comentario
exports.createComentario = async (req, res) => {
  try {
    const { RutasRealizadas_id, comentario, fecha, rating } = req.body;
    const newComentario = await Comentario.create({
      RutasRealizadas_id,
      comentario,
      fecha,
      rating,
    });
    res.status(201).json(newComentario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un comentario por ID
exports.updateComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Comentario.update(req.body, { where: { id } });
    if (updated) {
      const updatedComentario = await Comentario.findByPk(id);
      res.status(200).json(updatedComentario);
    } else {
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un comentario por ID
exports.deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comentario.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
