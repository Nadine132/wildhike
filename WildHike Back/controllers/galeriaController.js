const Galeria = require("../models/Galeria");
const Ruta = require("../models/Ruta");

exports.createImage = async (req, res) => {
  try {
    const { ruta_id, url_imagen } = req.body;
    const nuevaImagen = await Galeria.create({ ruta_id, url_imagen });
    res.status(201).json(nuevaImagen);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la imagen", error });
  }
};

exports.getImagesByRuta = async (req, res) => {
  try {
    const { ruta_id } = req.params;
    const imagenes = await Galeria.findAll({ where: { ruta_id } });
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las imágenes", error });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const imagenes = await Galeria.findAll();
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las imágenes", error });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    await Galeria.destroy({ where: { id } });
    res.status(200).json({ message: "Imagen eliminada con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen", error });
  }
};
