const RutasRealizadas = require("../models/RutasRealizadas");
const User = require("../models/User");
const Ruta = require("../models/Ruta");

exports.createRutaRealizada = async (req, res) => {
  try {
    const { usuario_id, ruta_id, fechaRealizacion, tiempoRealizacion } =
      req.body;
    const nuevaRutaRealizada = await RutasRealizadas.create({
      usuario_id,
      ruta_id,
      fechaRealizacion,
      tiempoRealizacion,
    });
    res.status(201).json(nuevaRutaRealizada);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la ruta realizada", error });
  }
};

exports.getRutasRealizadasByUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const rutasRealizadas = await RutasRealizadas.findAll({
      where: { usuario_id },
      include: [Ruta],
    });
    res.status(200).json(rutasRealizadas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las rutas realizadas", error });
  }
};

exports.getAllRutasRealizadas = async (req, res) => {
  try {
    const rutasRealizadas = await RutasRealizadas.findAll({
      include: [User, Ruta],
    });
    res.status(200).json(rutasRealizadas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las rutas realizadas", error });
  }
};

exports.deleteRutaRealizada = async (req, res) => {
  try {
    const { id } = req.params;
    await RutasRealizadas.destroy({ where: { id } });
    res.status(200).json({ message: "Ruta realizada eliminada con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la ruta realizada", error });
  }
};
