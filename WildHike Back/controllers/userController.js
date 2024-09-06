const { User } = require("../models");
const { hashPassword } = require("../config/auth");

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo usuario
exports.createUser = async (req, res) => {
  try {
    const { nombreDeUsuario, email, password, fechaRegistro, rol } = req.body;

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      nombreDeUsuario,
      email,
      password: hashedPassword,
      fechaRegistro,
      rol,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creando usuario:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Modificar usuario
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, rol, ...restOfBody } = req.body;

    if (rol && req.user.rol !== "admin") {
      return res.status(403).json({
        message: "No tienes permiso para actualizar el rol de usuario.",
      });
    }

    if (password) {
      restOfBody.password = await hashPassword(password);
    }

    const [updated] = await User.update(restOfBody, { where: { id } });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error actualizando usuario:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario por ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
