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

    // Hashear la contraseña antes de guardar
    console.log("Contraseña antes de hashear:", password);
    const hashedPassword = await hashPassword(password);
    console.log("Contraseña hasheada:", hashedPassword);

    const newUser = await User.create({
      nombreDeUsuario,
      email,
      password: hashedPassword, // Guardamos la contraseña hasheada
      fechaRegistro,
      rol,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creando usuario:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un usuario por ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, ...restOfBody } = req.body;

    // Si hay una contraseña en el cuerpo de la solicitud, hashearla
    if (password) {
      console.log("Contraseña antes de actualizar:", password);
      restOfBody.password = await hashPassword(password);
      console.log("Contraseña hasheada para actualizar:", restOfBody.password);
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
