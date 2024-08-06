const { RutasRealizadas } = require("../models");

// Obtener todas las rutas realizadas
exports.getAllRutasRealizadas = async (req, res) => {
  try {
    const rutasRealizadas = await RutasRealizadas.findAll();
    res.status(200).json(rutasRealizadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una ruta realizada por ID
exports.getRutasRealizadasById = async (req, res) => {
  try {
    const rutasRealizadas = await RutasRealizadas.findByPk(req.params.id);
    if (rutasRealizadas) {
      res.status(200).json(rutasRealizadas);
    } else {
      res.status(404).json({ message: "Ruta realizada no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva ruta realizada
exports.createRutasRealizadas = async (req, res) => {
  try {
    const { usuario_id, ruta_id, fechaRealizacion, tiempoRealizacion } =
      req.body;
    const newRutasRealizadas = await RutasRealizadas.create({
      usuario_id,
      ruta_id,
      fechaRealizacion,
      tiempoRealizacion,
    });
    res.status(201).json(newRutasRealizadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una ruta realizada por ID
exports.updateRutasRealizadas = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await RutasRealizadas.update(req.body, { where: { id } });
    if (updated) {
      const updatedRutasRealizadas = await RutasRealizadas.findByPk(id);
      res.status(200).json(updatedRutasRealizadas);
    } else {
      res.status(404).json({ message: "Ruta realizada no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una ruta realizada por ID
exports.deleteRutasRealizadas = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await RutasRealizadas.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Ruta realizada no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
