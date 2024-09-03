const { Comentario, User } = require("../models");

exports.getComentariosByRuta = async (req, res) => {
  const { ruta_id } = req.params;
  const { limit = 6, offset = 0 } = req.query;

  try {
    const comentarios = await Comentario.findAndCountAll({
      where: { ruta_id },
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nombreDeUsuario"],
        },
      ],
      order: [["fecha", "DESC"]],
    });

    res.status(200).json(comentarios);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comentarios", error });
  }
};

exports.createComentario = async (req, res) => {
  console.log("Solicitud recibida en createComentario:", req.body);

  const { comentario, ruta_id, usuario_id } = req.body;

  try {
    const nuevoComentario = await Comentario.create({
      comentario,
      ruta_id,
      usuario_id: usuario_id || null,
      fecha: new Date(),
    });

    res.status(201).json(nuevoComentario);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error al crear el comentario", error });
  }
};

// Eliminar un comentario
exports.deleteComentario = async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.user ? req.user.id : null;

  try {
    const comentario = await Comentario.findByPk(id);

    if (!comentario) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    if (comentario.usuario_id === usuario_id || !comentario.usuario_id) {
      // El usuario puede eliminar su comentario o un comentario anónimo
      await comentario.destroy();
      res.status(204).send();
    } else {
      res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este comentario" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};
