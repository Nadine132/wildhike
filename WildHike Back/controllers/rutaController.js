const { Ruta } = require("../models");

// Obtener todas las rutas
exports.getAllRutas = async (req, res) => {
  try {
    const rutas = await Ruta.findAll();
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una ruta por ID
exports.getRutaById = async (req, res) => {
  try {
    const ruta = await Ruta.findByPk(req.params.id);
    if (ruta) {
      res.status(200).json(ruta);
    } else {
      res.status(404).json({ message: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva ruta
exports.createRuta = async (req, res) => {
  try {
    const {
      nombre,
      provincia,
      comarca,
      descripcion,
      tipo,
      zona_natural,
      estacion,
      duracion,
      dificultad,
      distancia,
      desnivel,
      localizacion_url,
      fechaCreacion,
    } = req.body;
    const newRuta = await Ruta.create({
      nombre,
      provincia,
      comarca,
      descripcion,
      tipo,
      zona_natural,
      estacion,
      duracion,
      dificultad,
      distancia,
      desnivel,
      localizacion_url,
      fechaCreacion,
    });
    res.status(201).json(newRuta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una ruta por ID
exports.updateRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Ruta.update(req.body, { where: { id } });
    if (updated) {
      const updatedRuta = await Ruta.findByPk(id);
      res.status(200).json(updatedRuta);
    } else {
      res.status(404).json({ message: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una ruta por ID
exports.deleteRuta = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Ruta.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Ruta no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRutasByProvincia = async (req, res) => {
  try {
    const rutas = await Ruta.findAll({
      where: { provincia: req.params.provincia },
    });

    if (rutas.length > 0) {
      res.status(200).json(rutas);
    } else {
      res
        .status(404)
        .json({ message: "No se encontraron rutas en esta provincia" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
