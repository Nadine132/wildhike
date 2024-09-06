const { RutasRealizadas, User, Ruta } = require("../models");
exports.getAllRutasRealizadas = async (req, res) => {
  try {
    const rutasRealizadas = await RutasRealizadas.findAll({
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nombreDeUsuario", "email"],
        },
        {
          model: Ruta,
          as: "ruta",
          attributes: ["nombre", "provincia", "dificultad"],
        },
      ],
    });
    res.status(200).json(rutasRealizadas);
  } catch (error) {
    console.error("Error al obtener las rutas realizadas:", error);
    res.status(500).json({
      message: "Error al obtener las rutas realizadas",
      error: error.message,
    });
  }
};

// Obtiene una ruta realizada por ID
exports.getRutasRealizadasById = async (req, res) => {
  const { id } = req.params;

  try {
    const rutaRealizada = await RutasRealizadas.findByPk(id, {
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["nombreDeUsuario", "email"],
        },
        {
          model: Ruta,
          as: "ruta",
          attributes: ["nombre", "provincia", "dificultad"],
        },
      ],
    });

    if (!rutaRealizada) {
      return res.status(404).json({ message: "Ruta realizada no encontrada" });
    }

    res.status(200).json(rutaRealizada);
  } catch (error) {
    console.error("Error al obtener la ruta realizada:", error);
    res.status(500).json({
      message: "Error al obtener la ruta realizada",
      error: error.message,
    });
  }
};

// Crear una nueva ruta realizada
exports.createRutasRealizadas = async (req, res) => {
  const { usuario_id, ruta_id, fechaRealizacion, tiempoRealizacion } = req.body;

  try {
    const nuevaRutaRealizada = await RutasRealizadas.create({
      usuario_id,
      ruta_id,
      fechaRealizacion: fechaRealizacion || new Date(),
      tiempoRealizacion,
    });

    res.status(201).json(nuevaRutaRealizada);
  } catch (error) {
    console.error("Error al crear la ruta realizada:", error);
    res.status(500).json({
      message: "Error al crear la ruta realizada",
      error: error.message,
    });
  }
};

// Actualizar una ruta realizada por ID
exports.updateRutasRealizadas = async (req, res) => {
  const { id } = req.params;
  const { usuario_id, ruta_id, fechaRealizacion, tiempoRealizacion } = req.body;

  try {
    const [updated] = await RutasRealizadas.update(
      { usuario_id, ruta_id, fechaRealizacion, tiempoRealizacion },
      { where: { id } }
    );

    if (updated) {
      const updatedRutaRealizada = await RutasRealizadas.findByPk(id);
      return res.status(200).json(updatedRutaRealizada);
    }

    throw new Error("Ruta realizada no encontrada");
  } catch (error) {
    console.error("Error al actualizar la ruta realizada:", error);
    res.status(500).json({
      message: "Error al actualizar la ruta realizada",
      error: error.message,
    });
  }
};

// Eliminar una ruta realizada
exports.deleteRutasRealizadas = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await RutasRealizadas.destroy({ where: { id } });

    if (deleted) {
      return res.status(204).json({ message: "Ruta realizada eliminada" });
    }

    throw new Error("Ruta realizada no encontrada");
  } catch (error) {
    console.error("Error al eliminar la ruta realizada:", error);
    res.status(500).json({
      message: "Error al eliminar la ruta realizada",
      error: error.message,
    });
  }
};
