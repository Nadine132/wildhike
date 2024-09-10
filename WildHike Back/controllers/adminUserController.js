const { User } = require("../models");
const { Favorito } = require("../models");

// Obtener todos los usuarios
const getAllUsers = async (req, res) => {
  try {
    const usuarios = await User.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo los usuarios" });
  }
};

// Modificar un usuario
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombreDeUsuario, email, rol } = req.body;
    const usuario = await User.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await usuario.update({ nombreDeUsuario, email, rol });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando el usuario", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    await Favorito.destroy({ where: { usuario_id: id } });

    await usuario.destroy();

    res.status(204).send();
  } catch (error) {
    console.error("Error eliminando el usuario:", error);
    res.status(500).json({ message: "Error eliminando el usuario", error });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
};
