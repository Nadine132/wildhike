const { Ruta } = require("../models");

// Obtener todas las rutas
const getAllRutas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo las rutas" });
  }
};

// Crear una nueva ruta
const createRuta = async (req, res) => {
  try {
    const { nombre, provincia, dificultad, distancia } = req.body;
    const nuevaRuta = await Ruta.create({
      nombre,
      provincia,
      dificultad,
      distancia,
    });
    res.status(201).json(nuevaRuta);
  } catch (error) {
    res.status(500).json({ message: "Error creando la ruta", error });
  }
};

// Modificar una ruta existente
const updateRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, provincia, dificultad, distancia } = req.body;
    const ruta = await Ruta.findByPk(id);
    if (!ruta) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }
    await ruta.update({ nombre, provincia, dificultad, distancia });
    res.status(200).json(ruta);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando la ruta", error });
  }
};

// Eliminar una ruta
const deleteRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const ruta = await Ruta.findByPk(id);
    if (!ruta) {
      return res.status(404).json({ message: "Ruta no encontrada" });
    }
    await ruta.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error eliminando la ruta", error });
  }
};

module.exports = {
  getAllRutas,
  createRuta,
  updateRuta,
  deleteRuta,
};
