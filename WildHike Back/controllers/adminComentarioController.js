const { Comentario, User } = require("../models");

// Obtener todos los comentarios
exports.getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.findAll({
      include: [
        { model: User, as: "usuario", attributes: ["nombreDeUsuario"] },
      ],
    });
    res.status(200).json(comentarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

// Eliminar un comentario por ID
exports.deleteComentarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const comentario = await Comentario.findByPk(id);
    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }
    await comentario.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};
